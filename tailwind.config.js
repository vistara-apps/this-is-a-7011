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
          500: 'hsl(220 89% 71%)',
          600: 'hsl(220 89% 65%)',
          700: 'hsl(220 89% 55%)',
        },
        accent: {
          DEFAULT: 'hsl(190 80% 55%)',
          50: 'hsl(190 80% 95%)',
          500: 'hsl(190 80% 55%)',
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
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(220, 10%, 10%, 0.1)',
        'dark-card': '0 4px 20px hsla(240, 20%, 0%, 0.3)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}