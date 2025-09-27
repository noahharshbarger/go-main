/**
 * ANIMATION CONFIGURATIONS
 * 
 * This file contains all Framer Motion animation variants.
 * Separating animations makes them:
 * - Reusable across components
 * - Easier to maintain and modify
 * - Testable independently
 */

export const containerVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      staggerChildren: 0.1,  // Stagger child animations
      ease: "easeOut"
    }
  }
};

export const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -20 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      duration: 0.4,
      ease: "easeOut"
    }
  }
};

export const resultVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      duration: 0.5,
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export const modalVariants = {
  backdrop: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  },
  modal: {
    hidden: { 
      opacity: 0, 
      scale: 0.7,
      y: -50
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { 
        duration: 0.4,
        type: "spring",
        stiffness: 120,
        damping: 20
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.7,
      y: -50,
      transition: { duration: 0.3 }
    }
  }
};

export const buttonVariants = {
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  },
  tap: { 
    scale: 0.98,
    transition: { duration: 0.1 }
  }
};

export const cardHoverVariants = {
  hover: { 
    scale: 1.02,
    y: -2,
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export const loadingSpinnerVariants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const sunIconVariants = {
  animate: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut"
    }
  }
};
