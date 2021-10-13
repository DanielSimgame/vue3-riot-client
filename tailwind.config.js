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
        gameItemHover_bgcolor: {
          '0%': {
            background: 'transparent',
            backdropFilter: 'blur(5px)',
            backdropBrightness: 'brightness(0.5)'
          },
          '50%': {
            background: 'linear-gradient(to right, rgba(255,0,0,0) 0%,' +
              'rgba(255,0,0,0.7) 30%,rgba(255,0,0,0.3) 68%,rgba(255,0,0,0) 100%)',
            backdropFilter: 'blur(5px)',
            backdropBrightness: 'brightness(3)'
          },
          '100%': {
            background: 'linear-gradient(to right, rgba(255,0,0,0) 0%,' +
              'rgba(255,0,0,0.3) 30%,rgba(255,0,0,0.3) 68%,rgba(255,0,0,0) 100%)',
            backdropFilter: 'blur(5px)',
            backdropBrightness: 'brightness(0.5)'
          }
        },
        bgcolor: {
          '0%': {backgroundColor: 'transparent'},
          '100%': {backgroundColor: 'red'}
        }
      },
      animation: {
        gameItemHover_scale: 'gameItemHover_scale 0.25s ease-in',
        gameItemHover_bgcolor: 'gameItemHover_bgcolor 1s forwards'
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
