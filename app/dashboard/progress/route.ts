import { NextRequest } from 'next/server';
import connectDB from '@/lib/db/mongodb';
import UserProgress from '@/lib/models/UserProgress';
import { verifyToken } from '@/lib/utils/auth';
import { successResponse, errorResponse } from '@/lib/utils/api';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse('No token provided', 401);
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return errorResponse('Invalid token', 401);
    }

    let progress = await UserProgress.findOne({ user: decoded.userId })
      .populate('readArticles.article', 'title slug image category')
      .populate('bookmarkedArticles', 'title slug image category excerpt');

    // Create progress if doesn't exist
    if (!progress) {
      progress = await UserProgress.create({
        user: decoded.userId,
        readArticles: [],
        bookmarkedArticles: [],
        quizResults: [],
      });
    }

    return successResponse({ progress });
  } catch (error: unknown) {
    console.error('Get progress error:', error);
    return errorResponse(error instanceof Error ? error.message : 'Failed to fetch progress', 500);
  }
}