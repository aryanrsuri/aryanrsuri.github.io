/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["*.html", "./src/**/*.js", "./src/**/*.css"],
  theme: {
    fontFamily: {
      'sans': ['SF Pro Text', 'sans-serif'],
      'mono': ['SF Pro Display', 'sans-serif'],
    },
    extend: {
      animation: {
        'spin': 'spin 4s linear infinite',
        'bounce': 'bounce 2s ease-in-out infinite',
      },
      colors : {
        'faded-blue': '#eff7fa',
        'faded-green': '#e4ffee',
      'faded-purple': '#eff2ff',
      'faded-yellow': '#fdf9d3',
      }
    },
  },
  plugins: [],
}

