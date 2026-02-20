'use client';

import React, { useState } from 'react';
import { 
  Search, 
  BookOpen, 
  Brain, 
  Menu, 
  X, 
  LogIn, 
  Home, 
  MessageCircle, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();

  const recentQuizzes = [
    { id: 1, title: "Pillars of Islam", questions: 15, difficulty: "Beginner" },
    { id: 2, title: "Names of Allah", questions: 20, difficulty: "Intermediate" },
    { id: 3, title: "Prophetic Stories", questions: 10, difficulty: "Beginner" }
  ];

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Navigation */}
        <nav className="bg-white shadow-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/>
                  </svg>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-blue-900">Sunnah Steps</h1>
                  <p className="text-xs text-gray-600">Initiative</p>
                </div>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <Home size={18} />
                  <span>Home</span>
                </a>
                {user && ( 
                  <a href = "/dashboard" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                    <span className="flex items-center space-x-1">
                      <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
                      Dashboard
                    </span>
                  </a>
                )}
                <a href="#about" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <BookOpen size={18} />
                  <span>Our Mission</span>
                </a>
                <a href="/articles" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                <BookOpen size = {18} />
                <span>Articles</span>
                </a>
                <a href="#quizzes" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <Brain size={18} />
                  <span>Quizzes</span>
                </a>
                <a href="#qa" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <MessageCircle size={18} />
                  <span>Q&A</span>
                </a>
              </div>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center space-x-4">
                {user ? (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-gray-700 font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition"
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => setIsSignupOpen(true)}
                      className="text-blue-600 hover:text-blue-700 transition font-medium"
                    >
                      Sign Up
                    </button>
                    <button
                      onClick={() => setIsLoginOpen(true)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2"
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </button>
                  </>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t">
              <div className="px-4 py-3 space-y-3">
                <a href="#" className="block text-gray-700 hover:text-blue-600 py-2">Home</a>
                <a href="#about" className="block text-gray-700 hover:text-blue-600 py-2">Our Mission</a>
                <a href="#quizzes" className="block text-gray-700 hover:text-blue-600 py-2">Quizzes</a>
                <a href="#qa" className="block text-gray-700 hover:text-blue-600 py-2">Q&A</a>
                {user && (
                  <a href = "/dashboard" className="text-gray-700 hover:text-blue-600 py-2">Dashboard</a>
                )}
                {user ? (
                  <div className="pt-3 border-t">
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white font-semibold">
                        {user.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-emerald-800 font-medium">{user.name}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="w-full text-emerald-700 border border-emerald-600 px-4 py-2 rounded-lg hover:bg-emerald-50 transition"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="pt-3 border-t space-y-2">
                    <button onClick={() => setIsSignupOpen(true)} className="w-full text-blue-600 border border-blue-600 px-4 py-2 rounded-lg">
                      Sign Up
                    </button>
                    <button onClick={() => setIsLoginOpen(true)} className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg">
                      Login
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-blue-50">
          <div className="max-w-7xl mx-auto relative text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Walk the Path of <span className="text-blue-600">Authentic Knowledge</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Learn Islam through verified sources, engage with the community, and strengthen your faith one step at a time.
            </p>
            
            <div className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search articles, quizzes, questions..."
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition text-lg font-medium shadow-lg">
                Explore Articles 
              </button>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-50 transition text-lg font-medium border-2 border-blue-600">
                Take a Quiz
              </button>
              <button
              onClick={() => window.location.href = '/articles'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-700 transition text-lg font-medium shadow-lg"
              >
                Explore Articles
              </button>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">250+</div>
                <div className="text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
                <div className="text-gray-600">Questions</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">5,000+</div>
                <div className="text-gray-600">Learners</div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Integration Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-2">Our Initiative</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Reviving the Sunnah, One Step at a Time</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Sunnah Steps is an educational and community-focused initiative committed to reviving the Sunnah of the Prophet Muhammad ﷺ in daily life through practical application, authentic knowledge, and consistent action.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full"><X size={14} className="text-blue-600 rotate-45" /></div>
                    <p className="text-gray-700"><strong>Authentic:</strong> Rooted in the Qur&apos;an and sound Hadith.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full"><X size={14} className="text-blue-600 rotate-45" /></div>
                    <p className="text-gray-700"><strong>Practical:</strong> Designed for gradual and sustainable daily practice.</p>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 bg-blue-600 rounded-3xl p-8 md:p-12 text-white shadow-2xl">
                <h4 className="text-2xl font-bold mb-4">Our Vision</h4>
                <p className="text-blue-100 text-lg italic mb-8">
                  &quot;To see homes and communities shaped by the character, ethics, and mercy of the Sunnah.&quot;
                </p>
                <div className="border-t border-blue-400 pt-8">
                  <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                  <p className="text-blue-100">To revive the Sunnah through small, consistent steps that lead to lasting transformation.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quizzes Section */}
        <section id="quizzes" className="py-16 px-4 bg-blue-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Test Your Knowledge</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer">
                  <div className="flex items-center justify-between mb-4">
                    <Brain className="text-blue-600" size={32} />
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      quiz.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{quiz.title}</h3>
                  <p className="text-gray-600 mb-4">{quiz.questions} Questions</p>
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Q&A Preview */}
        <section id="qa" className="py-16 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Questions</h2>
            <div className="space-y-4">
              {[
                { question: "What is the difference between Fard and Wajib?", answers: 5, votes: 23 },
                { question: "How to perform Salatul Istikhara?", answers: 8, votes: 45 },
                { question: "Is it permissible to read translation during Salah?", answers: 3, votes: 12 }
              ].map((item, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.question}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{item.answers} Answers</span>
                        <span>•</span>
                        <span>{item.votes} Votes</span>
                      </div>
                    </div>
                    <MessageCircle className="text-blue-600" size={24} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-xl font-bold mb-4">Sunnah Steps</h3>
            <p className="text-gray-400 mb-8">Authentic Islamic knowledge for the modern Muslim.</p>
            <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
              <p>&copy; 2026 Sunnah Steps Initiative. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        onSwitchToSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)} 
        onSwitchToLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
      />
    </>
  );
}