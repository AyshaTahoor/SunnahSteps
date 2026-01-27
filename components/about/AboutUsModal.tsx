'use client';

import React from 'react';
import { X, Target, Heart, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/lib/context/AuthContext';

export default function AboutModal() {
  const { showAboutModal, setShowAboutModal } = useAuth();

  if (!showAboutModal) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">About Sunnah Steps</h2>
          <button onClick={() => setShowAboutModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6 text-gray-700">
          <p className="text-lg font-medium text-gray-900 italic">
            "Every step taken with intention brings us closer to living the Sunnah as it was meant to be lived."
          </p>
          
          <p>
            Sunnah Steps is an educational and community-focused initiative committed to reviving the 
            Sunnah of the Prophet Muhammad ﷺ in daily life through practical application, 
            authentic knowledge, and consistent action.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-2"><Target size={18}/> Our Vision</h3>
              <p className="text-sm">Homes and communities shaped by the character, ethics, and mercy of the Sunnah.</p>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <h3 className="flex items-center gap-2 font-bold text-teal-800 mb-2"><Heart size={18}/> Our Mission</h3>
              <p className="text-sm">Reviving the Sunnah through small, consistent steps that lead to lasting transformation.</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-900 border-l-4 border-blue-600 pl-3">Our Methodology</h3>
          <ul className="space-y-3">
            {[
              "Promote authentic Sunnah practices rooted in the Qur’an and sound Hadith",
              "Design structured daily actions that encourage practical implementation",
              "Support families and communities in developing Sunnah-centered habits",
              "Deliver educational content through digital platforms and programs"
            ].map((item, i) => (
              <li key={i} className="flex gap-3 items-start text-sm">
                <CheckCircle2 className="text-blue-600 mt-1 flex-shrink-0" size={18} />
                {item}
              </li>
            ))}
          </ul>

          <button 
            onClick={() => setShowAboutModal(false)}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Start My Journey
          </button>
        </div>
      </div>
    </div>
  );
}