"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
 
// Import all session components
import Session1 from "@/sections/Session1-BasicForm";
import Session2 from "@/sections/Session2-CoreLogic";
import Session3 from "@/sections/Session3-EnhancedUX";
import Session4 from "@/sections/Session4-Advanced";
 
export default function TeachingPage() {
  const [activeSession, setActiveSession] = useState(1);
 
  const sessions = [
    {
      id: 1,
      title: "Session 1: Basic Form",
      duration: "45 minutes",
      description: "React fundamentals, useState, controlled inputs, and Tailwind CSS",
      component: Session1,
      concepts: ["React functional components", "useState hook", "Event handling", "Controlled inputs", "Basic styling"]
    },
    {
      id: 2,
      title: "Session 2: Core Logic",
      duration: "45 minutes",
      description: "Business logic, calculations, data formatting, and results display",
      component: Session2,
      concepts: ["Mathematical calculations", "Data formatting", "Conditional rendering", "Component lifecycle", "Separation of concerns"]
    },
    {
      id: 3,
      title: "Session 3: Enhanced UX",
      duration: "45 minutes",
      description: "Loading states, validation, error handling, and user feedback",
      component: Session3,
      concepts: ["Form validation", "Loading states", "Error handling", "Component composition", "User feedback"]
    },
    {
      id: 4,
      title: "Session 4: Advanced Features",
      duration: "45 minutes",
      description: "Framer Motion animations, modal system, and advanced interactions",
      component: Session4,
      concepts: ["Animation libraries", "Modal patterns", "Advanced interactions", "Accessibility", "Performance optimization"]
    }
  ];
 
  const currentSession = sessions.find(s => s.id === activeSession);
  const CurrentComponent = currentSession.component;
 
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Solar Calculator - Teaching Curriculum
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              A 3-hour interactive React development course
            </p>
          </div>
 
          {/* Session Navigation */}
          <div className="flex flex-wrap justify-center gap-2">
            {sessions.map((session) => (
              <motion.button
                key={session.id}
                onClick={() => setActiveSession(session.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeSession === session.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {session.title}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
 
      {/* Session Info Bar */}
      <motion.div
        className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-800"
        key={activeSession}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-1">
                {currentSession.title}
              </h2>
              <p className="text-blue-700 dark:text-blue-200 text-sm">
                Duration: {currentSession.duration} • {currentSession.description}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Key Concepts:
              </h3>
              <div className="flex flex-wrap gap-1">
                {currentSession.concepts.map((concept, index) => (
                  <span
                    key={index}
                    className="text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
 
      {/* Session Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSession}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
          >
            <CurrentComponent />
          </motion.div>
        </AnimatePresence>
      </div>
 
      {/* Progress Indicator */}
      <div className="fixed bottom-6 right-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Progress: Session {activeSession} of {sessions.length}
        </div>
        <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(activeSession / sessions.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setActiveSession(Math.max(1, activeSession - 1))}
            disabled={activeSession === 1}
            className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            ← Previous
          </button>
          <button
            onClick={() => setActiveSession(Math.min(sessions.length, activeSession + 1))}
            disabled={activeSession === sessions.length}
            className="px-3 py-1 text-xs bg-blue-600 text-white rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700"
          >
            Next →
          </button>
        </div>
      </div>
 
      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              🎓 Learning Objectives Completed
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm max-w-2xl mx-auto">
              By completing all four sessions, students will have built a production-ready React application
              with modern UI patterns, animations, and deployment capabilities. This project serves as an
              excellent portfolio piece demonstrating full-stack development skills.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}