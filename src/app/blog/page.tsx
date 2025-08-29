'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { CalendarIcon, UserIcon, TagIcon, EyeIcon } from '@heroicons/react/24/outline';
import { analytics } from '@/lib/analytics';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  featured: boolean;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Track page view
    analytics.trackPageView('/blog', 'Beauty Blog');
    
    // Load blog data
    loadBlogData();
  }, []);

  const loadBlogData = async () => {
    // Mock data - replace with actual API calls
    const mockPosts: BlogPost[] = [
      {
        id: '1',
        title: 'The Science Behind Long-Lasting Lip Color',
        slug: 'science-long-lasting-lip-color',
        excerpt: 'Discover the innovative formulation techniques that make Veloura lip glosses stay vibrant for hours without compromising comfort.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1583001931096-959e55a7c860?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Dr. Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Lead Cosmetic Chemist at Veloura',
        },
        category: 'Science & Innovation',
        tags: ['formulation', 'longevity', 'innovation'],
        publishedAt: '2024-01-15',
        readTime: 5,
        views: 1250,
        featured: true,
      },
      {
        id: '2',
        title: 'Finding Your Perfect Lip Shade: A Complete Guide',
        slug: 'finding-perfect-lip-shade-guide',
        excerpt: 'Learn how to choose the perfect lip shade based on your skin tone, undertones, and personal style preferences.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Isabella Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Beauty Consultant & Makeup Artist',
        },
        category: 'Beauty Tips',
        tags: ['color matching', 'skin tone', 'beauty tips'],
        publishedAt: '2024-01-12',
        readTime: 7,
        views: 2100,
        featured: true,
      },
      {
        id: '3',
        title: 'Sustainable Beauty: Our Commitment to the Planet',
        slug: 'sustainable-beauty-commitment',
        excerpt: 'Explore Veloura\'s journey towards more sustainable beauty practices and how you can make eco-conscious choices.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Emma Thompson',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Sustainability Director',
        },
        category: 'Sustainability',
        tags: ['sustainability', 'eco-friendly', 'environment'],
        publishedAt: '2024-01-10',
        readTime: 6,
        views: 890,
        featured: false,
      },
      {
        id: '4',
        title: 'From Day to Night: Lip Looks for Every Occasion',
        slug: 'day-to-night-lip-looks',
        excerpt: 'Master the art of transitioning your lip look from office-appropriate to evening glamour with simple techniques.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Zoe Williams',
          avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Celebrity Makeup Artist',
        },
        category: 'Tutorials',
        tags: ['makeup', 'tutorials', 'styling'],
        publishedAt: '2024-01-08',
        readTime: 4,
        views: 1650,
        featured: false,
      },
      {
        id: '5',
        title: 'The History of Lip Beauty: From Ancient Times to Modern Glamour',
        slug: 'history-of-lip-beauty',
        excerpt: 'Take a fascinating journey through the evolution of lip beauty trends and how they\'ve shaped modern cosmetics.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Prof. Alexandra Mitchell',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Beauty Historian & Culture Expert',
        },
        category: 'Culture & History',
        tags: ['history', 'culture', 'trends'],
        publishedAt: '2024-01-05',
        readTime: 8,
        views: 756,
        featured: false,
      },
      {
        id: '6',
        title: 'Ingredient Spotlight: The Power of Hyaluronic Acid',
        slug: 'ingredient-spotlight-hyaluronic-acid',
        excerpt: 'Discover how hyaluronic acid in our formulations provides intense hydration and plumping effects for your lips.',
        content: '',
        featuredImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        author: {
          name: 'Dr. Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
          bio: 'Lead Cosmetic Chemist at Veloura',
        },
        category: 'Science & Innovation',
        tags: ['ingredients', 'skincare', 'hydration'],
        publishedAt: '2024-01-03',
        readTime: 5,
        views: 1340,
        featured: false,
      },
    ];

    const mockCategories: BlogCategory[] = [
      { id: 'all', name: 'All Posts', slug: 'all', description: 'All blog posts', postCount: 6 },
      { id: '1', name: 'Beauty Tips', slug: 'beauty-tips', description: 'Tips and tricks for beauty', postCount: 1 },
      { id: '2', name: 'Science & Innovation', slug: 'science-innovation', description: 'The science behind our products', postCount: 2 },
      { id: '3', name: 'Tutorials', slug: 'tutorials', description: 'Step-by-step beauty tutorials', postCount: 1 },
      { id: '4', name: 'Sustainability', slug: 'sustainability', description: 'Our commitment to sustainability', postCount: 1 },
      { id: '5', name: 'Culture & History', slug: 'culture-history', description: 'Beauty through the ages', postCount: 1 },
    ];

    setPosts(mockPosts);
    setCategories(mockCategories);
    setIsLoading(false);
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === categories.find(c => c.id === selectedCategory)?.name;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    analytics.trackSearch(query, filteredPosts.length);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-veloura-burgundy"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-veloura-burgundy to-veloura-gold py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white font-playfair mb-6"
          >
            The Veloura Edit
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/90 max-w-3xl mx-auto mb-8"
          >
            Discover the latest in beauty innovation, expert tips, and the stories behind our luxury formulations
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-veloura-burgundy text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
              <span className="ml-2 text-sm opacity-75">({category.postCount})</span>
            </button>
          ))}
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'all' && featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 font-playfair mb-8 text-center">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  <Link href={`/blog/${post.slug}`}>
                    <div className="relative h-64">
                      <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-veloura-burgundy text-white px-3 py-1 rounded-full text-sm font-semibold">
                          Featured
                        </span>
                      </div>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <CalendarIcon className="w-4 h-4" />
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <EyeIcon className="w-4 h-4" />
                          {post.views.toLocaleString()} views
                        </span>
                        <span>{post.readTime} min read</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 font-playfair mb-3 group-hover:text-veloura-burgundy transition-colors">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {post.author.name}
                          </span>
                        </div>
                        
                        <span className="text-sm text-veloura-burgundy font-semibold">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative h-48">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 text-veloura-burgundy px-3 py-1 rounded-full text-sm font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(post.publishedAt).toLocaleDateString()}
                    </span>
                    <span>{post.readTime} min read</span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 font-playfair mb-3 group-hover:text-veloura-burgundy transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        width={24}
                        height={24}
                        className="rounded-full"
                      />
                      <span className="text-sm font-medium text-gray-900">
                        {post.author.name}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <h3 className="text-2xl font-bold text-gray-900 font-playfair mb-4">
              No articles found
            </h3>
            <p className="text-gray-600 mb-8">
              Try adjusting your search or category filter to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="bg-veloura-burgundy text-white px-6 py-3 rounded-lg hover:bg-veloura-burgundy/90 transition-colors"
            >
              View All Articles
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-veloura-burgundy to-veloura-gold rounded-2xl p-8 md:p-12 mt-16 text-center">
          <h3 className="text-3xl font-bold text-white font-playfair mb-4">
            Stay in the Know
          </h3>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest beauty insights, product launches, and exclusive tips from our experts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-veloura-burgundy px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
