/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(220 89% 71%)',
          50: 'hsl(220 89% 95%)',
          100: 'hsl(220 89% 90%)',
          200: 'hsl(220 89% 85%)',
          300: 'hsl(220 89% 80%)',
          400: 'hsl(220 89% 75%)',
          500: 'hsl(220 89% 71%)',
          600: 'hsl(220 89% 61%)',
          700: 'hsl(220 89% 51%)',
          800: 'hsl(220 89% 41%)',
          900: 'hsl(220 89% 31%)',
        },
        accent: {
          DEFAULT: 'hsl(190 80% 55%)',
          50: 'hsl(190 80% 95%)',
          100: 'hsl(190 80% 90%)',
          200: 'hsl(190 80% 85%)',
          300: 'hsl(190 80% 75%)',
          400: 'hsl(190 80% 65%)',
          500: 'hsl(190 80% 55%)',
          600: 'hsl(190 80% 45%)',
          700: 'hsl(190 80% 35%)',
          800: 'hsl(190 80% 25%)',
          900: 'hsl(190 80% 15%)',
        },
        bg: 'hsl(230 10% 95%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(220 15% 25%)',
        'text-secondary': 'hsl(220 10% 45%)',
        dark: {
          bg: 'hsl(240 20% 8%)',
          surface: 'hsl(240 15% 12%)',
          card: 'hsl(240 15% 15%)',
        }
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)',
        'lg': 'var(--radius-lg)',
      },
      spacing: {
        'xs': 'var(--spacing-xs)',
        'sm': 'var(--spacing-sm)',
        'md': 'var(--spacing-md)',
        'lg': 'var(--spacing-lg)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'dark-card': '0 4px 20px hsla(240, 20%, 0%, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(220, 15%, 25%)',
            a: {
              color: 'hsl(220, 89%, 71%)',
              '&:hover': {
                color: 'hsl(220, 89%, 61%)',
              },
            },
            h1: {
              color: 'hsl(220, 15%, 25%)',
            },
            h2: {
              color: 'hsl(220, 15%, 25%)',
            },
            h3: {
              color: 'hsl(220, 15%, 25%)',
            },
            h4: {
              color: 'hsl(220, 15%, 25%)',
            },
            h5: {
              color: 'hsl(220, 15%, 25%)',
            },
            h6: {
              color: 'hsl(220, 15%, 25%)',
            },
            strong: {
              color: 'hsl(220, 15%, 25%)',
            },
            code: {
              color: 'hsl(220, 15%, 25%)',
            },
            figcaption: {
              color: 'hsl(220, 10%, 45%)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}
