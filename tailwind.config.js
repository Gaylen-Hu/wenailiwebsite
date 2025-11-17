export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './views/**/*.html',
    './modules/**/views/**/*.html',
    './modules/**/ui/src/**/*.{js,jsx,ts,tsx,vue,html,scss,css}',
    './app.js',
    './lib/**/*.js'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};

