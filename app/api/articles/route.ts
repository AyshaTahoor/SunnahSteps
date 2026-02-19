import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Article from '@/lib/models/Articles';
import { successResponse, errorResponse } from '@/lib/utils/api';

// GET all articles
export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const featured = searchParams.get('featured');
    const limit = Number(searchParams.get('limit')) || 10;
    const page = Number(searchParams.get('page')) || 1;

    // Avoid `any` by using a plain object for the query
    const query: { [key: string]: unknown } = { published: true };

    if (category) {
      query.category = category;
    }

    if (featured === 'true') {
      query.featured = true;
    }

    const skip = (page - 1) * limit;

    const articles = await Article.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .select('-content');

    const total = await Article.countDocuments(query);

    return successResponse({
      articles,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get articles error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to fetch articles',
      500
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse('No token provided', 401);
    }

    const body = await req.json();
    const { title, excerpt, content, category, image, tags, readTime, featured } = body;

    if (!title || !excerpt || !content || !category || !image) {
      return errorResponse('Please provide all required fields', 400);
    }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    // Get user ID from token
    const { verifyToken } = await import('@/lib/utils/auth');
    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded || typeof decoded !== 'object' || !('userId' in decoded)) {
      return errorResponse('Invalid token', 401);
    }

    const article = await Article.create({
      title,
      slug: `${slug}-${Date.now()}`,
      excerpt,
      content,
      category,
      image,
      tags: Array.isArray(tags) ? tags : [],
      readTime: typeof readTime === 'number' && readTime > 0 ? readTime : 5,
      featured: !!featured,
      author: (decoded as { userId: string }).userId,
      published: true,
    });

    return successResponse({ article }, 201);
  } catch (error) {
    console.error('Create article error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to create article',
      500
    );
  }
}