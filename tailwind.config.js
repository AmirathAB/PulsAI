/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3590E3',
          dark: '#2678c7',
          light: '#5ba8e9',
        },
        secondary: {
          DEFAULT: '#BAF09D',
          dark: '#a3d684',
        },
        background: {
          DEFAULT: '#1F2937',
          card: '#2d3748',
          hover: '#374151',
        },
        text: {
          DEFAULT: '#f9fafb',
          secondary: '#d1d5db',
          muted: '#9ca3af',
        },
        border: {
          DEFAULT: '#4b5563',
          light: '#6b7280',
        },
        status: {
          success: '#BAF09D',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#3590E3',
        },
        dark: {
          DEFAULT: '#1F2937',
          light: '#374151',
          card: '#2d3748',
        },
        danger: '#ef4444',
        warning: '#f59e0b',
        success: '#BAF09D',
      },
      fontFamily: {
        unbounded: ['Unbounded', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}