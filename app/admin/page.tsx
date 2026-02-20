'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { 
  FileText, 
  Brain, 
  MessageCircle, 
  Users, 
  Plus,
  TrendingUp,
  Eye,
  Calendar
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalQuizzes: 0,
    totalQuestions: 0,
    totalUsers: 1,
  });

  useEffect(() => {
    if (!token) {
      router.push('/');
    }
  }, [token, router]);

  const quickActions = [
    {
      title: 'Create Article',
      description: 'Write a new article',
      icon: FileText,
      color: 'bg-blue-500',
      href: '/admin/articles/create',
    },
    {
      title: 'Create Quiz',
      description: 'Add a new quiz',
      icon: Brain,
      color: 'bg-green-500',
      href: '/admin/quizzes/create',
    },
    {
      title: 'Manage Users',
      description: 'View all users',
      icon: Users,
      color: 'bg-purple-500',
      href: '/admin/users',
    },
    {
      title: 'View Questions',
      description: 'Moderate Q&A',
      icon: MessageCircle,
      color: 'bg-orange-500',
      href: '/admin/questions',
    },
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back, {user.name}</p>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-4 py-2 text-blue-600 hover:text-blue-700"
            >
              Back to Site
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FileText className="text-blue-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalArticles}</h3>
            <p className="text-gray-600 text-sm">Total Articles</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Brain className="text-green-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalQuizzes}</h3>
            <p className="text-gray-600 text-sm">Total Quizzes</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <MessageCircle className="text-orange-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalQuestions}</h3>
            <p className="text-gray-600 text-sm">Q&A Questions</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
              <TrendingUp className="text-green-500" size={20} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
            <p className="text-gray-600 text-sm">Total Users</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <button
                key={action.title}
                onClick={() => router.push(action.href)}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-left group"
              >
                <div className={`${action.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <action.icon className="text-white" size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 pb-4 border-b">
              <div className="bg-blue-100 p-2 rounded">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">System initialized</p>
                <p className="text-gray-500 text-sm">Just now</p>
              </div>
            </div>
            <div className="text-center py-8 text-gray-500">
              <p>No recent activity yet. Start creating content!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}