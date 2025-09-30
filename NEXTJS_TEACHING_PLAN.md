# Next.js + React Teaching Curriculum Integration

## 📚 **5-Session Structure with Next.js Fundamentals**

### **Session 1: React + Next.js Foundations (45 min)**
**React Focus:** useState, controlled inputs, event handling
**Next.js Integration:**
- Why we need `"use client"` for interactive components
- File-based routing: How `/teaching` maps to `app/(site)/teaching/page.jsx`
- Next.js vs Create React App differences

**Teaching Points:**
```jsx
// Show students the file structure
app/(site)/teaching/page.jsx → /teaching route
src/sections/Session1-BasicForm/index.jsx → Component file

// Explain the "use client" directive
"use client"; // Required for useState and event handlers
import { useState } from "react";
```

---

### **Session 2: Business Logic + Server Concepts (45 min)**
**React Focus:** Data calculations, state management, component composition
**Next.js Integration:**
- Server Components vs Client Components
- When calculations could be moved to API routes
- Performance benefits of server-side processing

**Teaching Enhancement Ideas:**
```jsx
// Current: Client-side calculations
const calculateSolar = () => {
  const results = performSolarCalculations(inputs);
  setResults(results);
};

// Next.js Alternative: API route (future lesson)
const calculateSolar = async () => {
  const response = await fetch('/api/solar-calculate', {
    method: 'POST',
    body: JSON.stringify(inputs)
  });
  const results = await response.json();
  setResults(results);
};
```

---

### **Session 3: UX + Next.js Optimizations (45 min)**
**React Focus:** Loading states, validation, error handling
**Next.js Integration:**
- Next.js Link for navigation
- Loading.js files for automatic loading states
- Error.js for error boundaries
- Image optimization for better UX

**Practical Examples:**
```jsx
import Link from "next/link";

// Replace regular links with Next.js Link
<Link href="/solar-calculator" className="btn">
  Try Full Calculator
</Link>

// Show automatic loading states with loading.js
// app/solar-calculator/loading.js
export default function Loading() {
  return <div>Calculating solar savings...</div>;
}
```

---

### **Session 4: Advanced Features + Performance (45 min)**
**React Focus:** Framer Motion, modals, advanced interactions
**Next.js Integration:**
- Dynamic imports for code splitting
- Image optimization in modals
- Performance optimization strategies

```jsx
// Dynamic import for heavy components
import dynamic from 'next/dynamic';

const AnimatedModal = dynamic(() => import('./AnimatedModal'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Client-side only for animations
});
```

---

### **Session 5: Next.js Deep Dive (45 min)**
**Full Next.js Focus:**
- App Router architecture
- Server vs Client component decisions
- Route groups and layouts
- API routes and full-stack development

---

## 🛠 **Implementation Strategy**

### **Immediate Steps:**

1. **Add Next.js Teaching Notes to Existing Sessions**
2. **Create Session 5 for Next.js Deep Dive**
3. **Update Teaching Navigation**
4. **Add Practical Exercises**

### **Progressive Enhancement:**

**Week 1: Foundation**
- Add Next.js explanations to Sessions 1-2
- Create comparison slides (React vs Next.js)

**Week 2: Integration**  
- Enhance Sessions 3-4 with Next.js optimization concepts
- Add practical exercises

**Week 3: Advanced**
- Build Session 5 with hands-on Next.js projects
- Create API route examples

---

## 📋 **Teaching Checklist**

### **Student Learning Outcomes:**
- [ ] Understand when to use "use client" directive
- [ ] Know the difference between Server and Client Components
- [ ] Can navigate using Next.js Link component
- [ ] Understand file-based routing
- [ ] Can optimize images with Next.js Image
- [ ] Know when to use dynamic imports
- [ ] Understand layout patterns
- [ ] Can create API routes

### **Practical Skills:**
- [ ] Convert React app to Next.js
- [ ] Optimize performance with Next.js features
- [ ] Build full-stack applications
- [ ] Deploy to Vercel with proper configuration

---

## 🎯 **Next Steps for Your Curriculum:**

1. **Keep your current React-focused structure** - it's excellent!
2. **Add Next.js context gradually** - don't overwhelm students
3. **Use the solar calculator as a practical example** throughout
4. **Build towards a full-stack version** in advanced sessions

Would you like me to implement any of these specific enhancements to your existing sessions?
