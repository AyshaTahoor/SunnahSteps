'use client';

import React from 'react';
import { X, Target, Heart } from 'lucide-react';

// Fixed: Defined interface to resolve 'IntrinsicAttributes' error
interface AboutUsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutUsModal({ isOpen, onClose }: AboutUsModalProps) {
  // Logic: Only render if isOpen is true
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in duration-300">
        <div className="sticky top-0 bg-white px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-900">About Sunnah Steps</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-8 space-y-6 text-gray-700">
          <p className="text-lg font-medium text-gray-900 italic">
            &quot;Sunnah Steps is an educational and community-focused initiative committed to reviving the Sunnah...&quot;
          </p>
          
          <div className="grid md:grid-cols-2 gap-4 py-4">
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <h3 className="flex items-center gap-2 font-bold text-blue-800 mb-2">
                <Target size={18}/> Our Vision
              </h3>
              <p className="text-xs">
                Homes and communities shaped by the character, ethics, and mercy of the Sunnah.
              </p>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <h3 className="flex items-center gap-2 font-bold text-teal-800 mb-2">
                <Heart size={18}/> Our Mission
              </h3>
              <p className="text-xs">
                Reviving the Sunnah through small, consistent steps leading to lasting transformation.
              </p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
          >
            Start My Journey
          </button>
        </div>
      </div>
    </div>
  );
}