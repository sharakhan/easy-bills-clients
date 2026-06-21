export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: "class",   // <-- এটি ঠিক আছে
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
      },
    },
  },
  plugins: [require("daisyui")],  // <-- এটি যোগ করুন (DaisyUI প্লাগিন)
};
