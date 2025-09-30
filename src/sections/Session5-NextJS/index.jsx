"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

/**
 * SESSION 5: NEXT.JS FUNDAMENTALS (45 minutes)
 * 
 * Learning Objectives:
 * - Understand Next.js App Router
 * - Learn about Client vs Server Components
 * - Master Next.js built-in optimizations
 * - Implement navigation and routing
 * - Work with Next.js Image optimization
 * - Understand file-based routing
 * 
 * Key Next.js Concepts Covered:
 * - "use client" directive
 * - next/link for navigation
 * - next/image for optimization
 * - useRouter hook
 * - App Router file structure
 * - Server vs Client rendering
 */

const NextJSFundamentals = () => {
  const [selectedConcept, setSelectedConcept] = useState("routing");
  const router = useRouter();

  const nextjsConcepts = {
    routing: {
      title: "File-based Routing",
      description: "Next.js uses the file system for routing. Each file in the app directory becomes a route.",
      example: `
// File structure creates routes:
// app/page.js → /
// app/about/page.js → /about
// app/blog/[slug]/page.js → /blog/my-post
// app/(group)/nested/page.js → /nested
      `,
      practical: "You're currently viewing a component that lives in src/sections/Session5-NextJS/"
    },
    components: {
      title: "Client vs Server Components",
      description: "Next.js 13+ uses Server Components by default. Use 'use client' for interactive components.",
      example: `
// Server Component (default)
export default function ServerComponent() {
  return <div>Rendered on server</div>
}

// Client Component (needs interactivity)
"use client";
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>
}
      `,
      practical: "This component uses 'use client' because it has useState and onClick handlers"
    },
    navigation: {
      title: "Next.js Link Component",
      description: "Use next/link for client-side navigation with prefetching and optimization.",
      example: `
import Link from "next/link";

// Good: Next.js Link (client-side navigation)
<Link href="/about">About Us</Link>

// Avoid: Regular anchor (full page reload)
<a href="/about">About Us</a>
      `,
      practical: "Try the navigation buttons below to see client-side routing in action"
    },
    images: {
      title: "Image Optimization",
      description: "Next.js Image component provides automatic optimization, lazy loading, and responsive images.",
      example: `
import Image from "next/image";

// Optimized image with automatic sizing
<Image 
  src="/hero-image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // for above-the-fold images
/>
      `,
      practical: "The logo and images in this app use Next.js Image optimization"
    }
  };

  const handleNavigation = (path) => {
    // Programmatic navigation with Next.js router
    router.push(path);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Next.js Fundamentals - Session 5
        </h1>
        <p className="text-gray-600">
          Modern React framework with full-stack capabilities
        </p>
      </div>

      {/* Concept Selector */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choose a Next.js Concept:</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(nextjsConcepts).map(([key, concept]) => (
            <button
              key={key}
              onClick={() => setSelectedConcept(key)}
              className={`p-3 rounded-lg border-2 transition-all text-sm font-medium ${
                selectedConcept === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300'
              }`}
            >
              {concept.title}
            </button>
          ))}
        </div>
      </div>

      {/* Concept Display */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-2xl font-bold text-blue-900 mb-3">
            {nextjsConcepts[selectedConcept].title}
          </h3>
          <p className="text-blue-800 mb-4 leading-relaxed">
            {nextjsConcepts[selectedConcept].description}
          </p>
          
          {/* Code Example */}
          <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-sm overflow-x-auto mb-4">
            <pre>{nextjsConcepts[selectedConcept].example}</pre>
          </div>

          {/* Practical Example */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
            <h4 className="font-semibold text-yellow-800 mb-2">💡 In Practice:</h4>
            <p className="text-yellow-700">
              {nextjsConcepts[selectedConcept].practical}
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Demo Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">🚀 Interactive Demo</h3>
        
        {selectedConcept === 'navigation' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Navigation Examples:</h4>
            <div className="space-y-3">
              <div className="flex gap-3">
                <Link 
                  href="/"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Home (Link Component)
                </Link>
                <button
                  onClick={() => handleNavigation('/solar-calculator')}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  Solar Calculator (useRouter)
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Both methods provide client-side navigation without page reloads
              </p>
            </div>
          </div>
        )}

        {selectedConcept === 'images' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Image Optimization Demo:</h4>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-lg mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">IMG</span>
                </div>
                <p className="text-xs text-gray-600">Next.js Image</p>
              </div>
              <div className="text-sm text-gray-700">
                <p>✅ Automatic optimization</p>
                <p>✅ Lazy loading</p>
                <p>✅ Responsive sizing</p>
                <p>✅ WebP format when supported</p>
              </div>
            </div>
          </div>
        )}

        {selectedConcept === 'components' && (
          <div className="bg-gray-50 p-6 rounded-lg">
            <h4 className="font-semibold mb-3">Component Type Demo:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-100 p-4 rounded border-l-4 border-green-500">
                <h5 className="font-semibold text-green-800">Server Component</h5>
                <p className="text-sm text-green-700 mt-1">
                  • Rendered on server<br/>
                  • Better performance<br/>
                  • Direct database access<br/>
                  • No JavaScript to client
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded border-l-4 border-blue-500">
                <h5 className="font-semibold text-blue-800">Client Component</h5>
                <p className="text-sm text-blue-700 mt-1">
                  • Runs in browser<br/>
                  • Interactive (useState, events)<br/>
                  • Access to browser APIs<br/>
                  • This component is client-side!
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* File Structure Example */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📁 Next.js App Router Structure</h3>
        <div className="bg-gray-900 text-gray-300 p-4 rounded-lg font-mono text-sm">
          <pre>{`app/
├── layout.js          # Root layout (wraps all pages)
├── page.js           # Home page (/)
├── globals.css       # Global styles
├── about/
│   └── page.js       # About page (/about)
├── blog/
│   ├── page.js       # Blog list (/blog)
│   └── [slug]/
│       └── page.js   # Dynamic blog post (/blog/my-post)
├── (site)/           # Route group (doesn't affect URL)
│   ├── layout.js     # Nested layout
│   └── dashboard/
│       └── page.js   # (/dashboard)
└── api/
    └── users/
        └── route.js  # API endpoint (/api/users)`}</pre>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">🎯 Session 5 Checklist</h3>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2 text-blue-700">
            <input type="checkbox" className="rounded" />
            Understand the difference between Server and Client Components
          </label>
          <label className="flex items-center gap-2 text-blue-700">
            <input type="checkbox" className="rounded" />
            Know when to use "use client" directive
          </label>
          <label className="flex items-center gap-2 text-blue-700">
            <input type="checkbox" className="rounded" />
            Practice using next/link for navigation
          </label>
          <label className="flex items-center gap-2 text-blue-700">
            <input type="checkbox" className="rounded" />
            Understand file-based routing system
          </label>
          <label className="flex items-center gap-2 text-blue-700">
            <input type="checkbox" className="rounded" />
            Learn Next.js Image optimization benefits
          </label>
        </div>
      </div>

      {/* Next Steps */}
      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-4">
          Ready to explore more Next.js features?
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/teaching"
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            Back to Sessions
          </Link>
          <button
            onClick={() => router.push('/solar-calculator')}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            See Full App Implementation
          </button>
        </div>
      </div>
    </div>
  );
};

export default NextJSFundamentals;
