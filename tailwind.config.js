const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import("@types/tailwindcss/tailwind-config").TailwindConfig } */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        riotGray: {
          darkest: "#141212",
          DEFAULT: "#1C1C1C",
          light: "#272727",   // Button
          lightest: "#4A4A4A"
        },
        semiWhite: "#F9F9F9"
      },
      fontFamily: {
        sans: ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
      keyframes: {
        gameItemHover_scale: {
          '0%, 100%': {transform: 'scale(1.00,1.00)'},
          '50%': {transform: 'scale(1.05,1.05)'},
        },
        rotate: {
          '100%': {transform: 'rotate(1turn)'}
        }
      },
      animation: {
        gameItemHover_scale: 'gameItemHover_scale 0.25s ease-in',
        rotate: 'rotate 4s linear infinite'
      },
    },
  },
  variants: {
    animation: ['hover', 'group-hover']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
