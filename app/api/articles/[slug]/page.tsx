'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Clock, Eye, Calendar, ArrowLeft, Share2, Bookmark, Loader2, User } from 'lucide-react';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  image: string;
  author: {
    _id: string;
    name: string;
  };
  readTime: number;
  views: number;
  createdAt: string;
  tags: string[];
}

export default function ArticleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    fetchArticle();
  }, [params.slug]);

  const fetchArticle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/articles/${params.slug}`);
      const data = await response.json();

      if (data.success) {
        setArticle(data.data.article);
      } else {
        router.push('/articles');
      }
    } catch (error) {
      console.error('Failed to fetch article:', error);
      router.push('/articles');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  const handleShare = async () => {
    if (navigator.share && article) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share failed:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    // TODO: Save to user's bookmarks in database
    alert(bookmarked ? 'Removed from bookmarks' : 'Added to bookmarks');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={64} />
      </div>
    );
  }

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Image */}
      <div className="relative h-96 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        {/* Back Button */}
        <button
          onClick={() => router.push('/articles')}
          className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full hover:bg-white transition flex items-center space-x-2"
        >
          <ArrowLeft size={20} />
          <span>Back to Articles</span>
        </button>

        {/* Category Badge */}
        <div className="absolute bottom-8 left-8">
          <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
            {article.category}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 -mt-20 relative z-10">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Article Header */}
          <div className="p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b">
              <div className="flex items-center space-x-2 text-gray-600">
                <User size={20} />
                <span className="font-medium">{article.author.name}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar size={20} />
                <span>{formatDate(article.createdAt)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Clock size={20} />
                <span>{article.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600">
                <Eye size={20} />
                <span>{article.views} views</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4 py-6 border-b">
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
              >
                <Share2 size={20} />
                <span>Share</span>
              </button>
              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
                  bookmarked
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Bookmark size={20} fill={bookmarked ? 'currentColor' : 'none'} />
                <span>{bookmarked ? 'Bookmarked' : 'Bookmark'}</span>
              </button>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none mt-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>

        {/* Related Articles Placeholder */}
        <div className="mt-12 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </div>
  );
}