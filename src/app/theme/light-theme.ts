/* Light theme variables */
import { Theme } from './symbols';

export const lightTheme: Theme = {
  name: 'light',
  properties: {
    '--primary': '#58C1B8',
    '--primary-text': 'white',

    '--grey-bg': 'white',
    '--grey-text': '#2D3436',
    '--grey-border': '#D4D4D4',

    '--dark-green': 'white',
    '--dark-green-text': '#8EA2AB',

    '--text-color-lv1': '#222',

    '--logo-url': 'url("assets/community-sift-logo-light-bg.svg")',
    // Core
    '--page-bg': 'white',

    '--page-header-bg': 'white',
    '--text-color': '#0c0c0c',

    '--sub-navigation-bg': '#292C35',
    '--sub-navigation-txt': '#f4f4f4',

    // Accents
    '--accent-brand': '#3FB8AF',
    '--accent-highlight': '#F17105',

    // Link styles
    '--link-color': '#222',
    '--link-hover-color': '#222',
    '--link-breadcrumb-inactive': '#CECECE',
    '--link-breadcrumb-active': '#222',

    // Section styles
    '--section-bg': '#1B1F21',
    '--section-fg': '#DDDDDD',
    '--section-highlight-bg': '#212329',
    '--section-highlight-fg': '#909192',
    '--section-separator': '#1b1f20',

    // Dashboard
    '--dashboard-item-bg': '#0F0F0F',
    '--dashboard-item-fg': '#222',
    '--dashboard-item-focus-bg': '#2F2F2F',

    // Button styles
    '--button-bg': 'white',
    '--button-fg': '#8EA2AB',
    '--button-subtle-bg': '#111212',
    '--button-subtle-fg': '#8B9EA7',
    '--button-primary-bg': '#04E762',
    '--button-primary-fg': '#1F1F1F',
    '--button-active-bg': '#58C1B8',
    '--button-active-fg': '#1F1F1F',
    '--button-focus-ring': '0 0 1px 2px white',
    '--button-border-color': '#D4D4D4',
    '--button-border-left': '#D4D4D4',

    '--close-btn-border': '#D4D4D4',
    '--close-btn-txt': '#8EA2AB',

    '--radio-border': '#D4D4D4',

    // Horizontal rule
    '--hr-color': 'rgba(255, 255, 255, 0.25)',

    // Accent colours
    '--accent-1': '#3fb8af',

    // Pass/fail indicators
    '--test-pass': '#4bd585',
    '--test-fail': '#e4604d',

    // Text inputs
    '--input-border': 'solid 2px #666666',
    '--input-focus-border-color': 'rgba(255, 255, 255, 0.3)',
    '--input-focus-border': 'solid 2px var(--input-focus-border-color)',
    '--input-text-fg': '#DDDDDD',
    '--input-text-placeholder': 'rgba(255, 255, 255, 0.5)',

    // Select inputs
    '--input-select-bg': '#3f3f48',
    '--input-select-fg': '#DDDDDD',
    '--input-select-placeholder': '#DDDDDD',

    // Topic Chips
    '--topic-chip-bg': '#0F0F0F',
    '--topic-chip-fg': '#F0F0F0',
    '--topic-chip-indicator': 'solid 3px #F0F0F0',
  },
};
