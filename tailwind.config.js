/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Your existing colors
        "body-color": "#0a151f",
        primary: "#acd4f6",
        secondary: "#224b6d80",
        "nav-bg": "#224b6d",
        "about-bg": "#224b6d80",
        tertiary: "#f0f5fa",
        // Additional color variations
        "primary-light": "#c4e0f9",
        "primary-dark": "#8bb8e0",
        "secondary-solid": "#224b6d",
        "secondary-light": "rgba(34, 75, 109, 0.6)",
        "secondary-dark": "rgba(34, 75, 109, 0.9)",
      },

      boxShadow: {
        card: "0px 35px 120px -15px #04060b40",
        contact: "5px 5px 5px #acd4f6",
        "card-hover": "0px 40px 130px -10px #04060b50",
        "inner-glow": "inset 0 0 20px rgba(172, 212, 246, 0.2)",
      },

      screens: {
        xs: "370px",
        tablet: "771px",
        md: "930px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },

      fontFamily: {
        grotesque: ["Basement Grotesque", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
        helvetica: ["Helvetica Neue", "sans-serif"],
        bosch: ["Bosch", "serif"],
        bebas: ["Bebas Neue", "cursive"],
        merriweather: ["Merriweather", "serif"],
        nunito: ["Nunito", "sans-serif"],
      },

      fontSize: {
        // Responsive font sizes
        hero: ["clamp(2.5rem, 8vw, 6rem)", { lineHeight: "1.1" }],
        "section-title": ["clamp(2rem, 5vw, 4rem)", { lineHeight: "1.2" }],
        "card-title": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.3" }],
      },

      spacing: {
        section: "clamp(3rem, 10vh, 8rem)",
        header: "clamp(2rem, 5vh, 4rem)",
      },

      animation: {
        "slide-up": "slideUp 0.8s ease forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        float: "float 6s ease-in-out infinite",
      },

      keyframes: {
        slideUp: {
          "0%": {
            transform: "translateY(100px)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": {
            transform: "scale(0.9)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
      },

      backdropFilter: {
        "blur-card": "blur(8px)",
      },

      transitionDuration: {
        2000: "2000ms",
      },

      lineHeight: {
        0: "0",
        tight: "1.1",
        relaxed: "1.75",
      },

      zIndex: {
        behind: "-1",
        modal: "100",
        overlay: "90",
        dropdown: "50",
        header: "40",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-card":
          "linear-gradient(180deg, rgba(34, 75, 109, 0.5) 0%, rgba(34, 75, 109, 0.8) 100%)",
      },
    },
  },

  variants: {
    extend: {
      opacity: ["group-hover"],
      transform: ["group-hover"],
      scale: ["group-hover"],
      blur: ["hover"],
      backdropBlur: ["hover"],
    },
  },

  // Performance optimizations
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
  },

  // Disable core plugins that you're not using
  corePlugins: {
    float: false, // If you're not using float layouts
    clear: false, // If you're not using clear
    sepia: false, // If you're not using sepia filters
    container: false, // If you're handling container styles manually
  },
};
