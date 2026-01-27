import React from 'react';
import { Target, Heart, BookOpen, ShieldCheck } from 'lucide-react';

export default function AboutSection() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 bg-white shadow-sm rounded-2xl my-8">
      <h2 className="text-3xl font-bold text-blue-900 mb-6 border-b pb-4">About Sunnah Steps</h2>
      
      <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
        <p>
          Sunnah Steps is an educational and community-focused initiative committed to reviving the 
          Sunnah of the Prophet Muhammad ﷺ in daily life through practical application, 
          authentic knowledge, and consistent action.
        </p>
        
        <p>
          We are founded on the belief that the Sunnah is a complete framework for personal conduct, 
          family life, and social responsibility. When practiced with understanding and sincerity, 
          it nurtures strong character, ethical behavior, and compassionate communities.
        </p>

        <div className="grid md:grid-cols-2 gap-8 py-6">
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-3">
              <Target size={20} /> Our Vision
            </h3>
            <p className="text-sm">To see homes and communities shaped by the character, ethics, and mercy of the Sunnah.</p>
          </div>
          <div className="bg-teal-50 p-6 rounded-xl">
            <h3 className="flex items-center gap-2 font-bold text-teal-800 mb-3">
              <Heart size={20} /> Our Mission
            </h3>
            <p className="text-sm">To revive the Sunnah through small, consistent steps that lead to lasting transformation.</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold text-gray-900">What We Do</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Promote authentic Sunnah practices rooted in the Qur’an and sound Hadith</li>
          <li>Design structured daily actions that encourage practical implementation</li>
          <li>Support families and communities in developing Sunnah-centered habits</li>
          <li>Deliver educational content through digital platforms, workshops, and programs</li>
        </ul>

        <h3 className="text-2xl font-semibold text-gray-900 pt-4">Our Methodology</h3>
        <p>
          Sunnah Steps integrates classical Islamic scholarship with contemporary educational principles. 
          Our content is based on authentic sources, reviewed for clarity, and designed for sustainable practice.
        </p>
      </div>
    </div>
  );
}