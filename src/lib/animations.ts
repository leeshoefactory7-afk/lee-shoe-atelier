// Premium animation variants for Framer Motion
export const premiumAnimations = {
  // Page entrance animations
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Staggered children animations
  containerStagger: {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },

  childStagger: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
  },

  // Image reveal animations
  imageReveal: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.8, ease: "easeOut" },
  },

  // Text animations
  textReveal: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  },

  // Number counter animation
  numberCounter: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.5 },
  },

  // Hover scale effect
  hoverScale: {
    whileHover: { scale: 1.02 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Hover lift effect
  hoverLift: {
    whileHover: { y: -5 },
    transition: { duration: 0.3, ease: "easeOut" },
  },

  // Smooth scroll reveal
  scrollReveal: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
    viewport: { once: true, margin: "0px 0px -200px 0px" },
  },

  // Float animation (subtle up and down)
  float: {
    animate: {
      y: [0, -10, 0],
    },
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Pulse animation (subtle opacity change)
  pulse: {
    animate: {
      opacity: [1, 0.8, 1],
    },
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Rotate animation (360 spin)
  spin: {
    animate: {
      rotate: 360,
    },
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Shimmer loading animation
  shimmer: {
    animate: {
      backgroundPosition: ["0% 0%", "100% 0%"],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },

  // Button hover animation
  buttonHover: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.2 },
  },

  // Card entrance
  cardEntrance: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.5, ease: "easeOut" },
    viewport: { once: true, margin: "0px 0px -100px 0px" },
  },

  // Gradient animation
  gradientShift: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "ease-in-out",
    },
  },

  // Parallax effect (for scroll)
  parallax: {
    initial: { y: 0 },
    style: { willChange: "transform" },
  },
};

// CSS animation utility classes
export const animationClasses = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(139, 92, 246, 0);
    }
    50% {
      box-shadow: 0 0 30px rgba(139, 92, 246, 0.3);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out;
  }

  .animate-slide-in-left {
    animation: slideInLeft 0.6s ease-out;
  }

  .animate-slide-in-right {
    animation: slideInRight 0.6s ease-out;
  }

  .animate-scale-in {
    animation: scaleIn 0.5s ease-out;
  }

  .animate-glow {
    animation: glow 3s ease-in-out infinite;
  }
`;
