// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5fbff',
          100: '#e6f6ff',
          200: '#bfeaff',
          300: '#93dbff',
          400: '#5cc8ff',
          500: '#25b3ff',
          600: '#0792e6',
          700: '#066da6',
          800: '#044b6b',
          900: '#012d3a'
        },
        subtle: {
          50: '#fbfdff',
          100: '#f6f9fb',
          200: '#eef3f7',
          300: '#e4eef5'
        }
      },
      borderRadius: {
        'xl-2': '1rem'
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(2,6,23,0.08)',
        'inner-soft': 'inset 0 -8px 20px rgba(2,6,23,0.02)'
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding'
      }
    },
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
    }
  },
  plugins: [],
};
