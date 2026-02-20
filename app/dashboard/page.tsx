'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import {
  User,
  BookOpen,
  Clock,
  Bookmark,
  TrendingUp,
  Calendar,
  Award,
  Settings,
  Edit,
  Loader2,
  ChevronRight,
  Target
} from 'lucide-react';

interface Progress {
  readArticles: Array<{
    article: {
      _id: string;
      title: string;
      slug: string;
      image: string;
      category: string;
    };
    readAt: string;
    timeSpent: number;
  }>;
  bookmarkedArticles: Array<{
    _id: string;
    title: string;
    slug: string;
    image: string;
    category: string;
    excerpt: string;
  }>;
  totalReadingTime: number;
  streak: number;
  lastActive: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout } = useAuth();
  const [progress, setProgress] = useState<Progress | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'reading' | 'bookmarks' | 'settings'>('overview');

  useEffect(() => {
    if (!token) {
      router.push('/');
      return;
    }
    fetchProgress();
  }, [token]);

  const fetchProgress = async () => {
    try {
      const response = await fetch('/api/dashboard/progress', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setProgress(data.data.progress);
      }
    } catch (error) {
      console.error('Failed to fetch progress:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const handleRemoveBookmark = async (articleId: string) => {
    try {
      await fetch('/api/dashboard/bookmark', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ articleId }),
      });
      fetchProgress(); // Refresh
    } catch (error) {
      console.error('Remove bookmark error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={64} />
      </div>
    );
  }

  if (!user || !progress) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.push('/')}
              className="text-white/80 hover:text-white"
            >
              ← Back to Home
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              Logout
            </button>
          </div>

          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-4xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">As-salamu alaykum, {user.name}!</h1>
              <p className="text-blue-100">Continue your journey towards knowledge</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <BookOpen className="text-white" size={24} />
                <div>
                  <div className="text-2xl font-bold">{progress.readArticles.length}</div>
                  <div className="text-sm text-blue-100">Articles Read</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Clock className="text-white" size={24} />
                <div>
                  <div className="text-2xl font-bold">{progress.totalReadingTime}</div>
                  <div className="text-sm text-blue-100">Minutes Reading</div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <Bookmark className="text-white" size={24} />
                <div>
                  <div className="text-2xl font-bold">{progress.bookmarkedArticles.length}</div>
                  <div className="text-sm text-blue-100">Bookmarked</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-6 overflow-hidden">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'reading'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Reading History
            </button>
            <button
              onClick={() => setActiveTab('bookmarks')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'bookmarks'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Bookmarks
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex-1 px-6 py-4 font-medium transition ${
                activeTab === 'settings'
                  ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Settings
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              {progress.readArticles.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                  <p className="text-gray-500">No articles read yet</p>
                  <button
                    onClick={() => router.push('/articles')}
                    className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Start Reading
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {progress.readArticles.slice(0, 5).map((item) => (
                    <div
                      key={item.article._id}
                      onClick={() => router.push(`/articles/${item.article.slug}`)}
                      className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg cursor-pointer transition"
                    >
                      <img
                        src={item.article.image}
                        alt={item.article.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{item.article.title}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs">
                            {item.article.category}
                          </span>
                          <span>{formatDate(item.readAt)}</span>
                        </div>
                      </div>
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Goals & Achievements */}
            <div className="space-y-6">
              {/* Streak */}
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Reading Streak</h3>
                  <Award size={24} />
                </div>
                <div className="text-4xl font-bold mb-2">{progress.streak} Days</div>
                <p className="text-orange-100 text-sm">Keep up the great work!</p>
              </div>

              {/* Goals */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Target className="mr-2 text-blue-600" size={20} />
                  Weekly Goals
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Read 5 articles</span>
                      <span className="text-blue-600 font-medium">
                        {Math.min(progress.readArticles.length, 5)}/5
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{
                          width: `${Math.min((progress.readArticles.length / 5) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">30 min reading time</span>
                      <span className="text-blue-600 font-medium">
                        {Math.min(progress.totalReadingTime, 30)}/30
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{
                          width: `${Math.min((progress.totalReadingTime / 30) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'reading' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reading History</h2>
            {progress.readArticles.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 mb-4">You haven't read any articles yet</p>
                <button
                  onClick={() => router.push('/articles')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Browse Articles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {progress.readArticles.map((item) => (
                  <div
                    key={item.article._id}
                    onClick={() => router.push(`/articles/${item.article.slug}`)}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                  >
                    <img
                      src={item.article.image}
                      alt={item.article.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                        {item.article.category}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-2 mb-2 line-clamp-2">
                        {item.article.title}
                      </h3>
                      <p className="text-sm text-gray-500">Read on {formatDate(item.readAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'bookmarks' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookmarked Articles</h2>
            {progress.bookmarkedArticles.length === 0 ? (
              <div className="text-center py-12">
                <Bookmark className="mx-auto text-gray-300 mb-4" size={64} />
                <p className="text-gray-500 mb-4">No bookmarked articles yet</p>
                <button
                  onClick={() => router.push('/articles')}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Find Articles
                </button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {progress.bookmarkedArticles.map((article) => (
                  <div
                    key={article._id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                  >
                    <div
                      onClick={() => router.push(`/articles/${article.slug}`)}
                      className="cursor-pointer"
                    >
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-xs font-medium">
                          {article.category}
                        </span>
                        <h3 className="font-bold text-gray-900 mt-2 mb-2">{article.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2">{article.excerpt}</p>
                      </div>
                    </div>
                    <div className="px-4 pb-4">
                      <button
                        onClick={() => handleRemoveBookmark(article._id)}
                        className="w-full px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition"
                      >
                        Remove Bookmark
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
            <div className="space-y-6 max-w-2xl">
              {/* Profile Info */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  defaultValue={user.name}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue={user.email}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50"
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  defaultValue={user.role}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 capitalize"
                  disabled
                />
              </div>

              <div className="pt-6 border-t">
                <p className="text-gray-600 text-sm mb-4">Profile editing coming soon...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}