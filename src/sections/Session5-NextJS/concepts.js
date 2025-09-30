/**
 * NEXT.JS TEACHING CONCEPTS
 * 
 * This file contains structured learning modules for teaching Next.js
 * alongside React fundamentals in your solar calculator curriculum.
 */

export const nextjsLearningPath = {
  
  // Beginner Level - Integrate with Session 1 & 2
  basics: {
    title: "Next.js Basics (Sessions 1-2)",
    concepts: [
      {
        name: "File-based Routing",
        description: "How Next.js creates routes from file structure",
        practical: "Show how /teaching page maps to app/(site)/teaching/page.jsx",
        codeExample: `
// app/page.js → /
// app/about/page.js → /about  
// app/blog/[slug]/page.js → /blog/my-post
        `
      },
      {
        name: "use client Directive",
        description: "When and why to use client-side rendering",
        practical: "Session components need 'use client' for useState and events",
        codeExample: `
"use client"; // Required for interactive components
import { useState } from "react";

export default function InteractiveForm() {
  const [value, setValue] = useState("");
  return <input onChange={(e) => setValue(e.target.value)} />;
}
        `
      }
    ]
  },

  // Intermediate Level - Integrate with Session 3 & 4  
  intermediate: {
    title: "Next.js Optimization (Sessions 3-4)",
    concepts: [
      {
        name: "Next.js Link Component",
        description: "Client-side navigation with prefetching",
        practical: "Navigation between teaching sessions",
        codeExample: `
import Link from "next/link";

// Good: Client-side navigation
<Link href="/solar-calculator">Calculate Solar</Link>

// Avoid: Full page reload  
<a href="/solar-calculator">Calculate Solar</a>
        `
      },
      {
        name: "Image Optimization",
        description: "Automatic image optimization and lazy loading",
        practical: "Optimize solar panel images in the calculator",
        codeExample: `
import Image from "next/image";

<Image
  src="/solar-panel.jpg"
  alt="Solar Panel"
  width={800}
  height={600}
  className="rounded-lg"
  priority // for above-the-fold images
/>
        `
      }
    ]
  },

  // Advanced Level - Session 5
  advanced: {
    title: "Next.js Architecture (Session 5)",
    concepts: [
      {
        name: "Server vs Client Components",
        description: "Understanding rendering strategies",
        practical: "Layout components vs interactive forms",
        codeExample: `
// Server Component (default) - runs on server
export default async function ServerComponent() {
  const data = await fetch('https://api.example.com/data');
  return <div>{data.title}</div>;
}

// Client Component - runs in browser
"use client";
export default function ClientComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
        `
      },
      {
        name: "App Router Layouts",
        description: "Nested layouts and route groups",
        practical: "How the teaching app is structured",
        codeExample: `
app/
├── layout.js              # Root layout (all pages)
├── page.js               # Home page
├── (site)/               # Route group
│   ├── layout.js         # Site layout  
│   ├── teaching/
│   │   └── page.js       # /teaching
│   └── solar-calculator/
│       └── page.js       # /solar-calculator
        `
      }
    ]
  }
};

export const teachingTips = {
  session1: {
    nextjsIntegration: [
      "Explain why 'use client' is needed for interactive components",
      "Show how the file structure creates the /teaching route",
      "Compare Next.js routing to traditional React Router"
    ]
  },
  
  session2: {
    nextjsIntegration: [
      "Demonstrate how calculations could be moved to API routes",
      "Show Server Components for data fetching",
      "Explain the benefits of server-side rendering for SEO"
    ]
  },
  
  session3: {
    nextjsIntegration: [
      "Use Next.js Link for navigation between validation states",
      "Show loading.js files for automatic loading states", 
      "Demonstrate error.js for error boundaries"
    ]
  },
  
  session4: {
    nextjsIntegration: [
      "Optimize animations with Next.js dynamic imports",
      "Use Next.js Image for modal background images",
      "Show how to code-split large animation libraries"
    ]
  },
  
  session5: {
    focus: [
      "Deep dive into App Router concepts",
      "Practice Server vs Client component decisions",
      "Build understanding of Next.js optimizations",
      "Connect all previous concepts to Next.js patterns"
    ]
  }
};

export const practicalExercises = {
  beginnerExercises: [
    "Convert a regular React component to Next.js with proper 'use client' usage",
    "Create a new route by adding a file to the app directory",
    "Replace anchor tags with Next.js Link components"
  ],
  
  intermediateExercises: [
    "Optimize images in the solar calculator with Next.js Image component", 
    "Create a loading state using Next.js loading.js files",
    "Implement client-side navigation between calculator steps"
  ],
  
  advancedExercises: [
    "Refactor calculation logic to API routes for server-side processing",
    "Create a nested layout for the calculator section",
    "Implement dynamic routing for different calculator types [type]/page.js"
  ]
};
