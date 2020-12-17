const { ThemeBuilder, Theme } = require('tailwindcss-theming');

const COLORS = {
  BRIGHT_GREEN: '#04e762',
  GREEN: '#468847',
  RED: '#d42d2a',
  TEAL: '#3fb8af',
  ORANGE: '#f17105',
  BLUE: '#00a6ff',
  WHITE: '#ffffff',
  ALMOST_WHITE: '#f4f4f4',
  LIGHT_SKY_BLUE: 'f0f3f5',
  BLACK: '#000000',
  ALMOST_BLACK: '#0c0c0c',
  GREY_900: '#121214',
  GREY_800: '#222226',
  GREY_700: '#2e2e33',
  GREY_600: '#393940',
  GREY_500: '#44444b',
  GREY_400: '#656565',
  GREY_300: '#858794',
  GREY_200: '#dce0e3',
  GREY_100: '#eaeaec',
  RISK_0: '#35b536',
  RISK_1: '#468847',
  RISK_2: '#999999',
  RISK_3: '#f89406',
  RISK_4: '#1d8dc4',
  RISK_5: '#f74f07',
  RISK_6: '#d42d2a',
  RISK_7: '#b94a48',
};

const darkTheme = new Theme()
  .name('dark')
  .default()
  .assignable()
  .colors({
    'primary': COLORS.BRIGHT_GREEN,
    'on-primary': COLORS.BLACK,
    'secondary': COLORS.TEAL,
    'on-secondary': COLORS.WHITE,
    'neutral': '#24292b',
    'on-neutral': '#8ea2ab',
    'highlight': COLORS.ORANGE,
    'highlight-alt-1': COLORS.RISK_1,
    'highlight-alt-2': COLORS.RISK_2,
    'highlight-alt-3': COLORS.RISK_3,
    'highlight-alt-4': COLORS.RISK_4,
    'highlight-alt-5': COLORS.RISK_5,
    'highlight-alt-6': COLORS.RISK_6,
    'highlight-alt-7': COLORS.RISK_7,
    'on-highlight': COLORS.WHITE,
    'background': COLORS.ALMOST_BLACK,
    'on-background': COLORS.WHITE,
    'surface': '#111212',
    'surface-alt': '#1b1f21',
    'link': COLORS.WHITE,
    'success': COLORS.GREEN,
    'on-success': COLORS.WHITE,
    'danger': COLORS.RED,
    'on-danger': COLORS.WHITE,
    'divider': '#24292b',
    'risk-0': COLORS.RISK_0,
    'risk-1': COLORS.RISK_1,
    'risk-2': COLORS.RISK_2,
    'risk-3': COLORS.RISK_3,
    'risk-4': COLORS.RISK_4,
    'risk-5': COLORS.RISK_5,
    'risk-6': COLORS.RISK_6,
    'risk-7': COLORS.RISK_7,
  })
  .colorVariant('muted', COLORS.GREEN, 'primary')
  .colorVariant('muted', '#111312', 'neutral')
  .colorVariant('muted', '#999999', 'on-background')
  ;

const twilightTheme = new Theme()
  .name('twilight')
  .assignable()
  .colors({
    'neutral': COLORS.GREY_800,
    'on-neutral': COLORS.GREY_300,
    'background': COLORS.GREY_600,
    'on-background': COLORS.WHITE,
    'surface': COLORS.GREY_700,
    'surface-alt': '#46464e',
    'link': COLORS.BLUE,
    'divider': COLORS.GREY_400,
  })
  .colorVariant('muted', COLORS.GREY_500, 'neutral')
  .colorVariant('muted', COLORS.GREY_300, 'on-background')
  ;

const lightTheme = new Theme()
  .name('light')
  .assignable()
  .colors({
    'neutral': COLORS.GREY_200,
    'on-neutral': COLORS.GREY_400,
    'background': COLORS.LIGHT_SKY_BLUE,
    'on-background': COLORS.BLACK,
    'surface': COLORS.WHITE,
    'surface-alt': COLORS.ALMOST_WHITE,
    'link': COLORS.BLUE,
    'divider': COLORS.GREY_100,
  })
  .colorVariant('muted', COLORS.GREY_100, 'neutral')
  .colorVariant('muted', COLORS.GREY_300, 'on-background')
  ;

const highContrastTheme = new Theme()
  .name('high-contrast')
  .assignable()
  .colors({
    'neutral': COLORS.GREY_100,
    'on-neutral': COLORS.BLACK,
    'background': '#fafafa',
    'on-background': COLORS.BLACK,
    'surface': COLORS.WHITE,
    'surface-alt': COLORS.GREY_200,
    'link': COLORS.BLACK,
    'divider': COLORS.BLACK,
  })
  .colorVariant('muted', COLORS.GREY_200, 'neutral')
  .colorVariant('muted', COLORS.GREY_100, 'on-background')
  ;

module.exports = new ThemeBuilder()
  .hexadecimal()
  .asDataThemeAttribute()
  .default(darkTheme)
  .theme(twilightTheme)
  .theme(lightTheme)
  .theme(highContrastTheme)
  ;
