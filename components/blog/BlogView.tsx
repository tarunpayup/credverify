'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { BookOpen, User, Calendar, Clock, Tag, ArrowLeft, ShieldCheck, ChevronRight } from 'lucide-react';
import { BlogPost } from '@/lib/types';

export default function BlogView() {
  const { blogs, setActivePanel } = useApp();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Regulatory & Law', 'Chartered Accountant', 'Software Engineer'];

  const filteredBlogs = filterCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === filterCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
      
      {/* If reading a single post */}
      {selectedPost ? (
        <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-sm">
          <button
            onClick={() => setSelectedPost(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Knowledge Hub</span>
          </button>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-semibold font-mono">
              {selectedPost.category}
            </span>
            <span className="text-xs text-slate-400">·</span>
            <span className="text-xs text-slate-400">{selectedPost.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4 leading-tight">
            {selectedPost.title}
          </h1>

          <div className="flex items-center gap-3 pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-700 dark:text-slate-200">
              {selectedPost.authorName.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm text-slate-900 dark:text-white">{selectedPost.authorName}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              </div>
              <p className="text-xs text-slate-500">{selectedPost.authorRole} · {selectedPost.date}</p>
            </div>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            {selectedPost.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
            {selectedPost.tags.map(tag => (
              <span key={tag} className="text-xs px-2.5 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      ) : (
        /* Blog List */
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full mb-3">
              <BookOpen className="w-4 h-4" />
              <span>Peer-Reviewed Practice Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              CredVerify Knowledge Hub & Regulatory Gazette
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Articles and advisory briefs authored by verified Chartered Accountants, High Court Advocates, Cardiologists, and Principal Software Architects.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white dark:bg-indigo-600'
                    : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredBlogs.map(blog => (
              <div 
                key={blog.id}
                onClick={() => setSelectedPost(blog)}
                className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-3 font-mono">
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{blog.category}</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-3 mb-4 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                      {blog.authorName.charAt(0)}
                    </div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{blog.authorName}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}
