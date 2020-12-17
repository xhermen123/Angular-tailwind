const systemFontStack = [
  'system-ui',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  '"Noto Sans"',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
  '"Noto Color Emoji"',
];

module.exports = {
  theme: {
    fontFamily: {
      body: [
        '"Open Sans"',
      ].concat(systemFontStack),
      display: [
        'Montserrat',
      ].concat(systemFontStack),
      mono: [
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace'
      ],
    },
    extend: {
      colors: {
        transparent: 'transparent',
        inherit: 'inherit',
      },
      minWidth: {
        40: '10rem',
        56: '14rem',
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'focus-within', 'group-hover'],
    borderColor: ['responsive', 'hover', 'focus', 'focus-within', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'focus-within', 'group-hover'],
    borderRadius: ['responsive', 'first', 'last'],
    borderWidth: ['responsive', 'first', 'last'],
    display: ['responsive', 'hover', 'group-hover'],
    margin: ['responsive', 'first', 'last'],
    padding: ['responsive', 'first', 'last'],
  },
  plugins: [
    require('./theme.config'),
    require('@tailwindcss/custom-forms'),
  ],
};
