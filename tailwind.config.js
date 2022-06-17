/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/static/*.html", "./src/**/*.js", "./src/**/*.css"],
  theme: {
    fontFamily: {
      'sans': ['SF Pro Text', 'sans-serif'],
      'mono': ['SF Pro Display', 'sans-serif'],
    },
    extend: {
      animation: {
        'spin': 'spin 4s linear infinite',
        'bounce': 'bounce 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
