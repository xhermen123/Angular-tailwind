# Style Guide and CSS Standards

## Key Decisions

1. We use the [Tailwind](https://tailwindcss.com/) CSS framework
2. Our CSS preprocessor of choice is [LESS](http://lesscss.org)
3. By default, you should be using Tailwind classes on HTML elements to apply styles.  
We have defined a broad set of classes to use and can add more if needed. See [TODO-ALEX-DOC HERE] for details.
4. When you do need to write LESS, ensure you are:
   * Placing styles with their components. Do not put everything into global styles.
   * Nesting your selectors
   * Using `rem` as a unit of measure. Never use `px`.
   * Using variables for colour names instead of hard-coding hex codes
   * Formatting your files to be readable by others
5. Do not import other CSS frameworks like Bootstrap. Our goal is to use pure CSS features like Flexbox and Grid for layouts, and Tailwind for "helper" classes.
6. We are only targeting modern browsers, so polyfills and hacks to support older browsers aren't necessary. We do not support IE.
7. Avoid the use of vendor prefixes. We use PostCSS and it handles that for us.
8. We use the [Material Design Icons](https://materialdesignicons.com) library. Do not import other font libraries into the project as this causes unncessary bloat.

## Philosophy

Start by reading this article:  
https://adamwathan.me/css-utility-classes-and-separation-of-concerns/

The entire app should be consistent.

1. To achieve consistency we want a small number of shared components and styles that are used everywhere.

1. Avoid duplicating component functionality (for example pressing a button that takes you to the next step).  There should be one so users are familiar with it.  Before you make any new element check if it already exists.

1. Be consistent with your colour choices. Use our predefined colour classes or CSS variables, and don't add new colours to the site's palette. We don't need 10 different shades of grey and black. If you are creating a new layout in a design tool such as Adobe XD or Sketch, check our [tailwind.less](src/tailwind.less) file for a list of colours.

1. Colour classes should be named for their purpose, not the colour they represent. For example, do not create a colour class named `button-black`, as this loses meaning when the user switches between dark, light, high contrast, or colourblind themes. This also applies to names like `darker` or `lighter` as these can reverse their meanings depending on the theme.  
  Instead, prefer names like `primary`, `accent`, and subtypes like `primary-muted` for elements that want to draw less attention.

1. Spacing and sizing classes should not have names like `padding-1px` or `margin-2em` as this ties the classes too closely to their implementations. Instead, prefer relative names like `padding-1` to indicate the smallest padding we support, or `padding-9` for a larger pad.  
More importantly, many of these spacing and sizing classes already exist in Tailwind. Check the [Tailwind Docs](https://tailwindcss.com/docs/padding) for a list before defining your own.

1. Writing actual LESS code should be rare. If Tailwind lacks the classes you need to style your elements, consider if the style could be made generic and added to the global styles, or into a shared component. One-off styles and non-reusable components should be avoided where possible.

1. The app should be responsive so it works on desktops, tablets and mobile.

### Order of Priority for When to Build a New style

The following is a guide you can use to help you decide when to build a new style
1. Does a component already exists in [shared-components](./-/tree/master/src/app/shared-components)?  YES.  Use that.
1. NO.  Then does this html block have code logic in it or multiple levels of DOM elements?  YES.  Create a component.  (Part of this will be to use your programming instincts as to when to make a component or not)
1. Look at the rest of the app.  Has anyone else made something similar?  YES.  Convert their code to a shared-component and update their code to use it.  Create a pull-request with just this component for approval.
1. NO. You are the first to work on this component.  Build it as a component inside your module (unless it is clear it should be a shared component).  If it gets re-used someone will refactor it into the shared-components.
1. You are working on your component or simple HTML block.  Now you need to style it.  For each part check if there are other elements in the app that have the same style you need.  YES.  If it's exactly the same don't copy and paste the class.  Follow step 3 but make the pull request to styles.less.  See [Tailwind's example of converting a common button's style to a shared class](https://Tailwindcss.com/docs/utility-first/#maintainability-concerns).  However here we disagree with Tailwind. We would not call it blue (See philosophy above point 5).  Instead focus on the intention, why is it blue? Consider instead btn-primary-action or btn-apply.  If your looking for good names start with bootstrap's naming convention because then new developers to our codebase will familar with it.
1. NO.  You are the first to style something like this.  Okay it is a one-off so use Tailwind's format.

### A code Review of Tailwind's Button example

https://Tailwindcss.com/docs/utility-first/#maintainability-concerns
```html
<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Button
</button>
```
1. "bg-blue-500" Don't name it blue.  Why is it blue?  Is it because it is important.  Bootstap did this well with btn-primary, btn-secondary, btn-success, alert-success (btn-success doesn't however make sense), alert-danger, alert-warning, alert-info  (alert-light, alert-dark are poor however -> what if they switch to light/dark mode now dark is light and light is dark)
1. "bg-blue-500"  Why 500.  That assumes there are 9 shades of blue which Tailwind allows you to name it by gradiants of 100 to 900.  See philosophy #4 we don't want 9 shades we want 2 (maybe 3 if there is a good reason).  We don't want to call it 500 but name it after the intention/the why you want to make it darker/lighter.  bg-primary-not-selected and bg-primary-selected are more clear as to why.
1. "text-white" Same thing on color again.  Try text-primary.  But it's good it's on the text.  Just calling it primary is not clear.  This framework lets us set bg and text seperately to make the effect.
1. "font-bold" (this is debatable)  Why is it bold. [Alex, Shane - thoughts if we should both caring or if we can as it may be hardcoded in framework]
1. "py-2"  That is good, it's part of the framework.  It makes the padding on the y axis the 2nd gradiant.  It would not be okay if it meant 2px (b/c in the future it could mean 4px and that is confusing).  But it does not. The 2 here is a relative number that in the future if we wanted to could update the whole site to have 2x as much padding.  
1. "hover:bg..." That is nice they put that in there, now it makes sense why you have another blue but it can still be called by intention instead of blue.
1. Missing Responsive design.  I imagine if the screen was smaller we should have a smaller version.
1. From an accesibility point of view the button is missing our shared titletip attribute. 
1. From an accessibility point the contrast is only 3.05 to 1 instead of 4.5 to 1.  We can resolve this in the accessible mode but it would be better to build it right first.
    
## Setting up your machine

1. Visual Studio Code.  Use [Tailwind CSS IntelliSense](https://github.com/bradlc/vscode-Tailwindcss) so you can autocomplete your styles
1. In package.json: npm run build:watch. When building for dev you are going to want to disable source maps, otherwise your build times will be sloooooooow.
1. This Chrome Plugin is useful for [checking accesibility](https://chrome.google.com/webstore/detail/siteimprove-accessibility/efcfolpjihicnikpmhnmphjhhpiclljc). 
 
## Reference Documents

- [Tailwind's Core Concepts](https://tailwindcss.com/docs/utility-first)
- http://lesscss.org/features/

## Accessibility Checklist

1. Accessibility is good for everyone not just those who need it.  When they added subtitles to movies even hearing people can use it when they are on a loud airplane.  Likewise pay attention to accessibility from the start as it gives users better experiences
1. Respect users settings.  We have built into our default styles that if they prefer no-animations we turn it off.
1. Reduce animations. 
1. Make sure it works for color-blind people
1. Have an alternate tag explaining what a button or component does.
1. We provide an accessibility view mode.  For this mode ensure your module has no animations, high contrast, large fonts.

### QA should review the following before making a pull request

https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&showtechniques=412 and ensure all parts are met, note all items but specifically check for

 * 1.1.1 Don't make any critical functionality like a button that is an icon only.  Use our shared component for titletips.  This will allow it to show title popup when hover over with mouse or focus with keyboard.  You can have background images that are decorative only however.  However if you have decorative content in the accessible mode it is hidden.  If a button or component is a toggle that's meaning changes via CSS on hover/click/etc make sure you update the alternate text to correspond.
 * 1.3.1 Clearly structure your HTML so screen-readers can understand it.  Use role-heading to identify headings.  Use aria-labelledby to provide name for user interface controls.  Use grouping roles to identify related form controls.  Use the region role to identify a region of the page.
 * 1.3.2 Meaningful sequence.  Build your dom order in the same order that makes sense.  While we can get fancy with re-ordering items with flex and grid layouts the order in the dom should make logical sense.
 * 1.3.3 Don't rely on sensory feedback and shapes, sizes, location on page to communicate meaning.  They can be accents to improve it but the meaning must be clear without it.
 * 1.4.1 Design for the color-blind.  We use colors to indicate risk levels.  Always provide either a full-text description like General Risk 6 or an alt/title tag.
 * 1.4.3 Ensure contract has a minium of 4.5 to 1 from the color of text to background.  This will be true for any text that is important to be read such as buttons, text.  If the text is >=18 points and not bold or >= 14 point and bold it does not apply on the main layout.  Likewise for the main layout you can have dimmed content that is not part of the 80% of used on page (example: delete button which are rarely pressed can be dimmed).  On the accessibility mode however they must also be 4.5 to 1.  
 * 1.4.4 Text can be resized.  We provide a resize option on the top section and users can press CTRL+ on their keyboard.  Your module must respect that and allow up to 200% increase in size without losing functionality (you may switch to mobile like mode)
 * 2.1.1  The app works with a keyboard.  Specifically there are no timed actions where a button only shows for a moment then disappears.  Ensure tab works to get you to all the key actions on the page.  Provide keyboard shortcuts with an alternate text that shows the shortcut for common actions.
 * 2.1.2 No keyboard traps. If you tab into an area you can get out by pressing tab or an arrow key or esc.  For instance if you open the sidepanel you can exit it with a keyboard.
 * 2.3.1 Avoid flashing content.  At most 3 times in a second.  Our design however would avoid this.
 * 2.4.2 When you use your modele (like diagnose rule or bulk edit rules) it will update the page title that describe it's topic and purpose
 * 2.4.3 Focus Order.  For cases like widgets or do content in a sequence of steps when you press tab the tab key takes you to them in the right sequence.
 * 2.4.4 Every link is clear what it's purpose is.  Either it has a good text like "diagnose this rule" or it has an alternate/title text (use our shared library for titletips)
* 2.4.6 Headings and labels describe topic or purpose
* 2.4.7 Any keyboard operable user interface such as pressing tab has a mode of operation where the keyboard focus indicator is visible
* 3.2.1 Likewise when you get into focus it will not make a change.  So if you tab to the languages it will not refresh your page automatically to reset your language.
* 3.2.2 Likewise if you change a component it won't change your context unless it is clear that it will.  So changing the language on the dianose page won't automatically lookup the phrase in the language but wait till you press an apply like button.  Adding search filters in the sidepanel won't refresh the page till you press apply.
* 3.2.4 Consistent Identification.  We will name things the same.  For example we won't call it "Apply" on one section and "Done" on another.  
* 3.3.1 Error Detection.  If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.  If the user has to input a field both indicate beside the field that it was missed and a text description stating it must be filled.
* 3.3.3 Furthermore make a helfpul suggestion of how they can fix it. 
* 4.1.1 If you open a tag in the DOM close it