# Solar Calculator - 3-Hour Teaching Curriculum

## 📚 **Session Overview (3 Hours Total)**

### **Session 1: Foundations (45 minutes)**
- Basic React setup and component structure
- State management with useState
- Form handling and controlled inputs
- Basic styling with Tailwind CSS

### **Session 2: Core Logic (45 minutes)**
- Solar calculation algorithms
- JavaScript math and energy formulas
- Data transformation and formatting
- Results display components

### **Session 3: Enhanced UX (45 minutes)**
- Loading states and user feedback
- Conditional rendering
- Component composition
- Error handling and validation

### **Session 4: Advanced Features (45 minutes)**
- Framer Motion animations
- Modal system implementation
- Smooth interactions
- Deployment preparation

---

## 🎯 **Session 1: Foundations (45 minutes)**

### **Learning Objectives:**
- Understand React functional components
- Learn useState hook basics
- Create controlled form inputs
- Apply Tailwind CSS classes

### **What We'll Build:**
A basic form that collects user input

### **Key Concepts:**
- Component structure
- State management
- Event handling
- CSS-in-JS vs utility classes

### **Code Example (Session 1 Result):**
```jsx
"use client";
import { useState } from "react";

const SolarCalculatorBasic = () => {
  const [inputs, setInputs] = useState({
    monthlyBill: 0,
    homeSize: 0,
    electricityRate: 0.12,
  });

  const handleInputChange = (field, value) => {
    setInputs(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Solar Calculator - Basic Form
      </h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Monthly Electric Bill ($)
          </label>
          <input
            type="number"
            value={inputs.monthlyBill}
            onChange={(e) => handleInputChange("monthlyBill", Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your monthly bill"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Home Size (sq ft)
          </label>
          <input
            type="number"
            value={inputs.homeSize}
            onChange={(e) => handleInputChange("homeSize", Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter home size"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Electricity Rate ($/kWh)
          </label>
          <input
            type="number"
            step="0.01"
            value={inputs.electricityRate}
            onChange={(e) => handleInputChange("electricityRate", Number(e.target.value))}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0.12"
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200"
        >
          Calculate Solar Savings
        </button>
      </div>

      {/* Debug: Show current state */}
      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Current Input Values:</h3>
        <pre className="text-sm">{JSON.stringify(inputs, null, 2)}</pre>
      </div>
    </div>
  );
};

export default SolarCalculatorBasic;
```

---

## ⚡ **Session 2: Core Logic (45 minutes)**

### **Learning Objectives:**
- Implement business logic calculations
- Work with mathematical formulas
- Format and display results
- Understand component lifecycle

### **What We'll Build:**
Add calculation functionality and results display

### **Key Concepts:**
- Mathematical calculations in JavaScript
- Data formatting (toLocaleString, Math.round)
- Conditional rendering
- Component state updates

### **Solar Calculation Formulas:**
```javascript
// Annual energy usage calculation
const annualUsage = monthlyBill * 12 / electricityRate;

// System size needed (kW)
const systemSize = (annualUsage / 365) / sunHours / 0.8;

// System cost with tax credits
const totalCost = systemSize * 1000 * 3.50; // $3.50 per watt
const netCost = totalCost * 0.70; // 30% federal tax credit

// Annual savings
const annualProduction = systemSize * sunHours * 365 * 0.8;
const annualSavings = annualProduction * electricityRate;

// Payback period
const paybackPeriod = netCost / annualSavings;
```

---

## 🎨 **Session 3: Enhanced UX (45 minutes)**

### **Learning Objectives:**
- Implement loading states
- Add form validation
- Create better user feedback
- Organize components

### **What We'll Build:**
Loading animations, validation, and improved UX

### **Key Concepts:**
- Async operations simulation
- Form validation patterns
- Loading state management
- User feedback principles

### **Enhanced Features:**
```javascript
const [isCalculating, setIsCalculating] = useState(false);
const [errors, setErrors] = useState({});

const validateInputs = () => {
  const newErrors = {};
  
  if (inputs.monthlyBill <= 0) {
    newErrors.monthlyBill = "Monthly bill must be greater than 0";
  }
  
  if (inputs.homeSize <= 0) {
    newErrors.homeSize = "Home size must be greater than 0";
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const calculateSolar = async () => {
  if (!validateInputs()) return;
  
  setIsCalculating(true);
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Perform calculations...
  
  setIsCalculating(false);
  setShowResults(true);
};
```

---

## 🚀 **Session 4: Advanced Features (45 minutes)**

### **Learning Objectives:**
- Implement Framer Motion animations
- Create modal components
- Add advanced interactions
- Prepare for deployment

### **What We'll Build:**
Full-featured animated calculator with modal

### **Key Concepts:**
- Animation libraries integration
- Modal patterns
- Event handling (click outside, escape key)
- Performance considerations

### **Animation Examples:**
```javascript
import { motion, AnimatePresence } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.4 }
  }
};
```

---

## 📁 **Project Structure for Teaching**

```
src/
├── sections/
│   ├── Session1-BasicForm/
│   │   └── SolarCalculatorBasic.jsx
│   ├── Session2-CoreLogic/
│   │   ├── SolarCalculatorWithLogic.jsx
│   │   └── calculations.js
│   ├── Session3-EnhancedUX/
│   │   ├── SolarCalculatorEnhanced.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ValidationErrors.jsx
│   └── Session4-Advanced/
│       ├── SolarCalculatorFull.jsx
│       ├── Modal.jsx
│       └── animations.js
└── components/
    └── SolarCalculator/
        └── index.jsx (Final version)
```

---

## 🎯 **Teaching Tips for Each Session**

### **Session 1 Tips:**
- Start with explaining React fundamentals
- Show how useState works with simple examples
- Demonstrate controlled vs uncontrolled inputs
- Use browser dev tools to show state changes

### **Session 2 Tips:**
- Explain the solar energy calculations step by step
- Show how to debug calculations with console.log
- Demonstrate number formatting functions
- Discuss real-world energy costs and solar benefits

### **Session 3 Tips:**
- Show the importance of user feedback
- Demonstrate async operations
- Explain validation patterns
- Show how loading states improve perceived performance

### **Session 4 Tips:**
- Start with simple animations before complex ones
- Explain animation performance considerations
- Show how modals work (portal pattern)
- Discuss deployment options and best practices

---

## 🛠 **Hands-On Exercises**

### **Session 1 Exercise:**
"Create a form input for roof type selection (dropdown)"

### **Session 2 Exercise:**
"Add CO₂ reduction calculation to the results"

### **Session 3 Exercise:**
"Add input validation for electricity rate (must be positive)"

### **Session 4 Exercise:**
"Create a hover animation for result cards"

---

## 📊 **Assessment Questions**

1. **Session 1:** "How does the useState hook differ from class component state?"
2. **Session 2:** "Why do we divide by 0.8 in the system size calculation?"
3. **Session 3:** "What's the benefit of showing loading states to users?"
4. **Session 4:** "How do we prevent memory leaks with animations?"

---

## 🎁 **Bonus Topics (If Time Permits)**

- **API Integration:** Connect to real solar data APIs
- **Testing:** Unit tests for calculation functions
- **Performance:** React.memo and useMemo optimization
- **Accessibility:** ARIA labels and keyboard navigation
- **SEO:** Meta tags and structured data

This curriculum provides a structured approach to teaching React development through a practical, real-world project that students can showcase in their portfolio!
