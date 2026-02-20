'use client';

import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Clock, Eye, Calendar, Filter, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  author: {
    name: string;
  };
  readTime: number;
  views: number;
  createdAt: string;
  featured: boolean;
}

const categories = [
  'All',
  'Aqeedah',
  'Fiqh',
  'Seerah',
  'Tafseer',
  'Hadith',
  'Islamic History',
  'Contemporary Issues',
  'Spirituality'
];

export default function ArticlesPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, [selectedCategory, page]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const categoryParam = selectedCategory !== 'All' ? `&category=${selectedCategory}` : '';
      const response = await fetch(`/api/articles?page=${page}&limit=9${categoryParam}`);
      const data = await response.json();

      if (data.success) {
        setArticles(data.data.articles);
        setTotalPages(data.data.pagination.pages);
      }
    } catch (error) {
      console.error('Failed to fetch articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Articles</h1>
            <p className="text-xl text-blue-100">Authentic Islamic Knowledge for the Modern Muslim</p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-4 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Filter className="text-gray-600 mr-2" size={20} />
            <h2 className="text-lg font-semibold text-gray-900">Filter by Category</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setPage(1);
                }}
                className={`px-4 py-2 rounded-full font-medium transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={48} />
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            {filteredArticles.length === 0 ? (
              <div className="text-center py-20">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500">Try adjusting your search or filter</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredArticles.map((article) => (
                  <article
                    key={article._id}
                    onClick={() => router.push(`/articles/${article.slug}`)}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {article.category}
                        </span>
                      </div>
                      {article.featured && (
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                            Featured
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            {article.readTime} min
                          </span>
                          <span className="flex items-center">
                            <Eye size={16} className="mr-1" />
                            {article.views}
                          </span>
                        </div>
                        <span className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          {formatDate(article.createdAt)}
                        </span>
                      </div>

                      {/* Author */}
                      <div className="mt-4 pt-4 border-t">
                        <p className="text-sm text-gray-600">
                          By <span className="font-medium text-gray-900">{article.author.name}</span>
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-4">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}