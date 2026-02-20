import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import Article from '@/lib/models/Articles';
import { successResponse, errorResponse } from '@/lib/utils/api';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const article = await Article.findOne({ slug: params.slug, published: true });
    if (!article) {
      return errorResponse('Article not found', 404);
    }

    // Increment views (avoids concurrency issues)
    await Article.updateOne(
      { _id: article._id },
      { $inc: { views: 1 } }
    );

    // Re-fetch article to return updated views count
    const updatedArticle = await Article.findById(article._id);

    return successResponse({ article: updatedArticle });
  } catch (error) {
    console.error('Get article error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to fetch article',
      500
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse('No token provided', 401);
    }

    const article = await Article.findOneAndDelete({ slug: params.slug });
    if (!article) {
      return errorResponse('Article not found', 404);
    }

    return successResponse({ message: 'Article deleted successfully' });
  } catch (error) {
    console.error('Delete article error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to delete article',
      500
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse('No token provided', 401);
    }

    const body = await req.json();

    if ('slug' in body) {
      delete body.slug;
    }

    const article = await Article.findOneAndUpdate(
      { slug: params.slug },
      body,
      { new: true }
    );

    if (!article) {
      return errorResponse('Article not found', 404);
    }

    return successResponse({ article });
  } catch (error) {
    console.error('Update article error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'Failed to update article',
      500
    );
  }
}
