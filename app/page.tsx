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

// Context and Components
import { useAuth } from '@/lib/context/AuthContext';
import LoginModal from '@/components/auth/LoginModal';
import SignupModal from '@/components/auth/SignupModal';
import AboutUsModal from '@/components/about/AboutUsModal';
import Image from 'next/image';

export default function HomePage() {
  // 1. UI State for navigation and local modal controls
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  // 2. Auth Context Hooks - Fixed: Now inside the function body
  const { user, logout, showAboutModal, setShowAboutModal } = useAuth();

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
              
              {/* Logo Section - UPDATED WITH YOUR PATH */}
              <div className="flex items-center space-x-3"> 
                <Image 
                  src="/sunnah-steps-logo.jpeg"  
                  alt="Sunnah Steps Logo"
                  width={80}
                  height={80}
                  className="h-16 w-auto rounded-lg shadow-sm"
                  priority 
                /> 
                <div> 
                  <h1 className="text-2xl font-bold text-blue-900">Sunnah Steps</h1> 
                  <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">One step closer to sunnah</p> 
                </div> 
              </div>  

              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <Home size={18} />
                  <span>Home</span>
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 flex items-center space-x-1 transition">
                  <BookOpen size={18} />
                  <span>Our Mission</span>
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

              {/* Auth Actions */}
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

              {/* Mobile Menu Trigger */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section with Global Search */}
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
                  className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none text-lg bg-white text-gray-900"
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
            </div>
          </div>
        </section>

        {/* Initiative & About Section */}
        <section id="about" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="md:w-1/2">
                <h2 className="text-blue-600 font-semibold tracking-wide uppercase mb-2">Our Initiative</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Reviving the Sunnah, One Step at a Time</h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  Sunnah Steps is an educational and community-focused initiative committed to reviving the Sunnah of the Prophet Muhammad ﷺ in daily life through practical application, authentic knowledge, and consistent action.
                </p>
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full"><div className="w-3.5 h-3.5 bg-blue-600 rounded-full" /></div>
                    <p><strong>Authentic:</strong> Rooted in the Qur&apos;an and sound Hadith.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 bg-blue-100 p-1 rounded-full"><div className="w-3.5 h-3.5 bg-blue-600 rounded-full" /></div>
                    <p><strong>Practical:</strong> Designed for gradual and sustainable daily practice.</p>
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

        {/* Quizzes Grid */}
        <section id="quizzes" className="py-16 px-4 bg-blue-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Test Your Knowledge</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {recentQuizzes.map(quiz => (
                <div key={quiz.id} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition cursor-pointer border border-transparent hover:border-blue-200">
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

        {/* UPDATED FOOTER SECTION */}
        <footer className="bg-gray-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
            <div>
              <div className="flex items-center space-y-4 mb-6 justify-center">
                <Image 
                  src="/sunnah-steps-logo.jpeg" 
                  alt="Sunnah Steps Logo"
                  width={60}
                  height={60} 
                  className="h-12 w-auto rounded-md opacity-90 brightness-0 invert"
                />
                <h3 className="text-xl font-bold">Sunnah Steps</h3>
               <p className="text-gray-400 text-sm">
                One step closer to sunnah
              </p>
              </div>
              <p className="text-gray-400 text-sm mt-2">
                Authentic Islamic knowledge for the modern Muslim.
              </p>
            </div>
            <div className="border-t border-gray-800 mt-8 pt-8 w-full text-center text-gray-500 text-xs">
              <p>&copy; 2026 Sunnah Steps Initiative. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      {/* Authentication & Onboarding Modals */}
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
      
      <AboutUsModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </>
  );
}