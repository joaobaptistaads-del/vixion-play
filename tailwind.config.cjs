module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        vixion: {
          50: '#f6f7ff',
          100: '#ecefff',
          500: '#2b2bff',
          700: '#1b1bd6'
        }
      }
    }
  },
  plugins: []
}
