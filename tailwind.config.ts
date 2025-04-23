import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors here
        primary: '#007AFF',
        secondary: '#6B7280',
      },
      fontFamily: {
        // Add your custom fonts here
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        morabba: ['var(--font-morabba)'],
      },
    },
  },
  plugins: [],
};

export default config;
