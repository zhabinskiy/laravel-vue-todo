module.exports = {
  purge: [],
  theme: {
    extend: {
      cursor: {
        grabbing: '-webkit-grabbing',
      },
    },
  },
  variants: {
    scale: ['responsive', 'hover', 'active', 'focus', 'group-hover'],
    textColor: ['responsive', 'hover', 'active', 'focus', 'group-hover'],
    cursor: ['responsive', 'hover', 'active', 'focus', 'group-hover'],
  },
  plugins: [require('@tailwindcss/custom-forms')],
}
