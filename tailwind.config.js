/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--color-border)", // gray-200
        input: "var(--color-input)", // white
        ring: "var(--color-ring)", // blue-600
        background: "var(--color-background)", // gray-50
        foreground: "var(--color-foreground)", // gray-900
        primary: {
          DEFAULT: "var(--color-primary)", // blue-600
          foreground: "var(--color-primary-foreground)", // white
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", // cyan-600
          foreground: "var(--color-secondary-foreground)", // white
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", // red-500
          foreground: "var(--color-destructive-foreground)", // white
        },
        muted: {
          DEFAULT: "var(--color-muted)", // gray-100
          foreground: "var(--color-muted-foreground)", // gray-500
        },
        accent: {
          DEFAULT: "var(--color-accent)", // emerald-600
          foreground: "var(--color-accent-foreground)", // white
        },
        popover: {
          DEFAULT: "var(--color-popover)", // white
          foreground: "var(--color-popover-foreground)", // gray-900
        },
        card: {
          DEFAULT: "var(--color-card)", // white
          foreground: "var(--color-card-foreground)", // gray-900
        },
        success: {
          DEFAULT: "var(--color-success)", // emerald-500
          foreground: "var(--color-success-foreground)", // white
        },
        warning: {
          DEFAULT: "var(--color-warning)", // amber-500
          foreground: "var(--color-warning-foreground)", // white
        },
        error: {
          DEFAULT: "var(--color-error)", // red-500
          foreground: "var(--color-error-foreground)", // white
        },
        // Brand colors
        brand: {
          primary: "var(--color-brand-primary)", // slate-900
          secondary: "var(--color-brand-secondary)", // turquoise
          accent: "var(--color-brand-accent)", // coral
          trust: "var(--color-brand-trust)", // syntax-green
          canvas: "var(--color-brand-canvas)", // github-dark
          cta: "var(--color-brand-cta)", // orange
          text: {
            primary: "var(--color-brand-text-primary)", // github-light
            secondary: "var(--color-brand-text-secondary)", // github-muted
          },
        },
        // Syntax highlighting colors
        syntax: {
          string: "var(--color-syntax-string)", // green
          function: "var(--color-syntax-function)", // blue
          keyword: "var(--color-syntax-keyword)", // purple
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
        'brand-headline': ['JetBrains Mono', 'monospace'],
        'brand-cta': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading': ['2rem', { lineHeight: '1.3' }],
        'subheading': ['1.5rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.6' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'caption': ['0.75rem', { lineHeight: '1.4' }],
      },
      spacing: {
        'base': 'var(--spacing-base)', // 8px
        '18': '4.5rem', // 72px
        '88': '22rem', // 352px
        '128': '32rem', // 512px
      },
      boxShadow: {
        'subtle': 'var(--shadow-subtle)', // 0 1px 3px rgba(0,0,0,0.1)
        'medium': 'var(--shadow-medium)', // 0 4px 12px rgba(0,0,0,0.15)
        'strong': 'var(--shadow-strong)', // 0 4px 16px rgba(0,0,0,0.4)
        'modal': 'var(--shadow-modal)', // 0 8px 32px rgba(0,0,0,0.6)
        'glow': '0 0 20px rgba(64, 224, 208, 0.4)',
        'glow-strong': '0 0 30px rgba(64, 224, 208, 0.6)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "typing": "typing 2s steps(40, end)",
        "dash": "dash-animation 1s ease-in-out",
        "blink": "blink 1s infinite",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fadeIn": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slideUp": {
          from: {
            opacity: "0",
            transform: "translateY(20px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(64, 224, 208, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(64, 224, 208, 0.6)",
          },
        },
        "typing": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        "dash-animation": {
          from: { strokeDasharray: "0 100" },
          to: { strokeDasharray: "100 0" },
        },
        "blink": {
          "0%, 50%": { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      transitionTimingFunction: {
        'brand': 'var(--animation-timing)', // cubic-bezier(0.4, 0, 0.2, 1)
      },
      transitionDuration: {
        'fast': 'var(--animation-duration-fast)', // 200ms
        'normal': 'var(--animation-duration-normal)', // 300ms
        'slow': 'var(--animation-duration-slow)', // 500ms
      },
      backdropBlur: {
        'glass': '10px',
      },
      zIndex: {
        'header': '50',
        'sidebar': '40',
        'modal': '100',
        'tooltip': '110',
      },
      screens: {
        'xs': '475px',
      },
      gridTemplateColumns: {
        '24': 'repeat(24, minmax(0, 1fr))',
      },
      aspectRatio: {
        'golden': '1.618',
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}