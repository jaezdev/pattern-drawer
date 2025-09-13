# Pattern Drawer Library# Pattern Drawer Library



A configurable, themeable pattern drawing component for web applications. Perfect for creating lock screen patterns, gesture authentication, and interactive drawings.A configurable, themeable pattern drawing component for web applications. Perfect for creating lock screen patterns, gesture authentication, and interactive drawings.



## ✨ Features## Features



- 🎨 **Multiple Themes**: Dark, Light, Blue, and Green themes with CSS custom properties- ✨ **Multiple Themes**: Dark, Light, Blue, and Green themes with CSS custom properties

- 🔧 **Fully Customizable**: Configurable grid sizes, dot sizes, colors, and animations- 🎨 **Fully Customizable**: Configurable grid sizes, dot sizes, colors, and animations

- 📱 **Touch & Mouse Support**: Works seamlessly on desktop and mobile devices- 📱 **Touch & Mouse Support**: Works on desktop and mobile devices

- 🎯 **Event System**: Complete event system for pattern interactions- 🎯 **Event System**: Complete event system for pattern interactions

- 🧮 **Pattern Analysis**: Built-in complexity analysis and validation- 🧮 **Pattern Analysis**: Built-in complexity analysis and validation

- ♿ **Accessible**: Keyboard navigation and screen reader support- ♿ **Accessible**: Keyboard navigation and screen reader support

- 📦 **Multiple Import Methods**: ES6 modules, CommonJS, UMD, and browser globals- 📦 **Multiple Import Methods**: ES6 modules, UMD, and browser globals

- 🎲 **Preset Configurations**: Pre-built configurations for common use cases- 🎲 **Preset Configurations**: Pre-built configurations for common use cases

- 🏗️ **Modern Build System**: TypeScript definitions, tree-shaking support, and optimized bundles

## Quick Start

## 📁 Project Structure

### HTML

``````html

pattern-drawer/<!DOCTYPE html>

├── src/                          # Source files<html>

│   ├── core/                     # Core library classes<head>

│   │   ├── PatternDrawer.js      # Main PatternDrawer class    <link rel="stylesheet" href="pattern-drawer.css">

│   │   └── EventEmitter.js       # Event system</head>

│   ├── utils/                    # Utility functions<body>

│   │   └── index.js              # Pattern utilities    <div id="pattern-container"></div>

│   ├── styles/                   # CSS modules    

│   │   ├── base.css              # Base styles and variables    <script type="module">

│   │   ├── components.css        # Component styles        import { createPatternDrawer } from './pattern-drawer.js';

│   │   ├── responsive.css        # Responsive and accessibility        

│   │   ├── themes/               # Theme files        const drawer = createPatternDrawer('#pattern-container', 'MOBILE_LOCK');

│   │   │   ├── dark.css          # Dark theme (default)        

│   │   │   ├── light.css         # Light theme        drawer.on('patternComplete', (data) => {

│   │   │   ├── blue.css          # Blue theme            console.log('Pattern completed:', data.pattern);

│   │   │   └── green.css         # Green theme        });

│   │   └── index.css             # Main CSS entry point    </script>

│   └── index.js                  # Main JavaScript entry point</body>

├── dist/                         # Built/compiled files</html>

├── examples/                     # Example implementations```

│   ├── simple-example.html       # Basic usage example

│   ├── basic-example.html        # Advanced modal example## Installation & Usage

│   └── modal-example.html        # Custom implementation example

├── docs/                         # Documentation### ES6 Modules

├── pattern-drawer.js             # Backward compatibility entry point```javascript

├── pattern-drawer.css            # Backward compatibility CSSimport { PatternDrawer, PatternUtils, THEMES, PRESETS } from './pattern-drawer.js';

├── package.json                  # Package configuration

└── README.md                     # This file// Create with custom configuration

```const drawer = new PatternDrawer('#container', {

    theme: THEMES.DARK,

## 🚀 Quick Start    minPoints: 4,

    maxPoints: 9,

### 1. HTML Setup    gridSize: 3,

```html    showComplexity: true

<!DOCTYPE html>});

<html>

<head>// Or use a preset

    <!-- Include the CSS -->import { createPatternDrawer } from './pattern-drawer.js';

    <link rel="stylesheet" href="dist/pattern-drawer.css">const drawer = createPatternDrawer('#container', 'MOBILE_LOCK');

    <!-- Or use individual modules -->```

    <link rel="stylesheet" href="src/styles/index.css">

</head>### Browser Globals (No Module System)

<body>```html

    <div id="pattern-container"></div><script src="pattern-drawer.js"></script>

</body><script>

</html>    const drawer = new PatternDrawerLib.PatternDrawer('#container', {

```        theme: 'dark',

        minPoints: 4

### 2. JavaScript (ES6 Modules)    });

```javascript</script>

import { createPatternDrawer } from './src/index.js';```



const drawer = createPatternDrawer('#pattern-container', 'MOBILE_LOCK');## Configuration Options



drawer.on('patternComplete', (data) => {```javascript

    console.log('Pattern completed:', data.pattern);const config = {

    console.log('Complexity:', data.complexity);    // Pattern constraints

});    minPoints: 4,           // Minimum required points

```    maxPoints: 9,           // Maximum allowed points

    gridSize: 3,            // Grid size (3x3, 4x4, 5x5)

### 3. Backward Compatibility    

```javascript    // Visual settings

// Still works with existing imports    theme: 'dark',          // 'dark', 'light', 'blue', 'green'

import { createPatternDrawer } from './pattern-drawer.js';    size: 'medium',         // 'small', 'medium', 'large'

```    dotSize: 60,           // Dot size in pixels

    lineWidth: 3,          // Line width in pixels

## 📦 Installation Methods    

    // Features

### ES6 Modules (Recommended)    showComplexity: false,  // Show pattern complexity

```javascript    showInfo: false,        // Show pattern info panel

import { PatternDrawer, PatternUtils, THEMES, PRESETS } from './src/index.js';    animations: true,       // Enable animations

    allowRedraw: true       // Allow pattern clearing on error

// Create with custom configuration};

const drawer = new PatternDrawer('#container', {```

    theme: THEMES.DARK,

    minPoints: 4,## Available Presets

    maxPoints: 9,

    gridSize: 3,```javascript

    showComplexity: trueimport { PRESETS, createPatternDrawer } from './pattern-drawer.js';

});

// Mobile lock screen (Android style)

// Or use a presetconst mobile = createPatternDrawer('#container', 'MOBILE_LOCK');

const drawer = createPatternDrawer('#container', 'MOBILE_LOCK');

```// High security pattern

const secure = createPatternDrawer('#container', 'HIGH_SECURITY');

### CommonJS (Node.js)

```javascript// Simple gesture input

const { PatternDrawer, createPatternDrawer } = require('./dist/pattern-drawer.cjs');const gesture = createPatternDrawer('#container', 'GESTURE_INPUT');

```

// Gaming pattern

### Browser Globals (No Module System)const game = createPatternDrawer('#container', 'GAME_PATTERN');

```html```

<script src="dist/pattern-drawer.umd.js"></script>

<script>## API Methods

    const drawer = new PatternDrawer.PatternDrawer('#container', {

        theme: 'dark',### Core Methods

        minPoints: 4```javascript

    });// Mode control

</script>drawer.draw();                    // Enable drawing mode

```drawer.view([0,1,4,7]);          // Show pattern in view mode

drawer.clear();                   // Clear current pattern

## ⚙️ Configuration Options

// Pattern management

```javascriptconst pattern = drawer.getPattern();     // Get current pattern

const config = {drawer.setPattern([0,1,4,7]);           // Set pattern programmatically

    // Pattern constraintsdrawer.loadPattern([0,1,4,7]);          // Load pattern without mode change

    minPoints: 4,           // Minimum required points

    maxPoints: 9,           // Maximum allowed points// Configuration

    gridSize: 3,            // Grid size (3x3, 4x4, 5x5)drawer.setTheme('blue');                 // Change theme

    drawer.setDisabled(true);               // Enable/disable interaction

    // Visual settingsdrawer.updateConfig({ minPoints: 6 });  // Update configuration

    theme: 'dark',          // 'dark', 'light', 'blue', 'green'const config = drawer.getConfig();       // Get current configuration

    size: 'medium',         // 'small', 'medium', 'large'

    dotSize: 60,           // Dot size in pixels// Cleanup

    lineWidth: 3,          // Line width in pixelsdrawer.destroy();                        // Clean up and remove

    ```

    // Features

    showComplexity: false,  // Show pattern complexity### Utility Functions

    showInfo: false,        // Show pattern info panel```javascript

    animations: true,       // Enable animationsimport { PatternUtils } from './pattern-drawer.js';

    allowRedraw: true       // Allow pattern clearing on error

};// Validation

```const isValid = PatternUtils.isPatternSequence('0,1,4,7');

const validation = PatternUtils.isValidPattern([0,1,4,7], 4, 9, 3);

## 🎨 Available Themes

// Conversion

```javascriptconst patternString = PatternUtils.patternToString([0,1,4,7]);

import { THEMES, createPatternDrawer } from './src/index.js';const patternArray = PatternUtils.stringToPattern('0,1,4,7');



// Built-in themes// Analysis

const darkDrawer = createPatternDrawer('#dark', { theme: THEMES.DARK });const complexity = PatternUtils.calculateComplexity([0,1,4,7], 3);

const lightDrawer = createPatternDrawer('#light', { theme: THEMES.LIGHT });// Returns: { score: 45, level: 'medium', factors: ['Length: +20', 'Direction changes: +15'] }

const blueDrawer = createPatternDrawer('#blue', { theme: THEMES.BLUE });

const greenDrawer = createPatternDrawer('#green', { theme: THEMES.GREEN });// Generation

```const randomPattern = PatternUtils.generateRandomPattern(4, 8, 3);

```

### Custom Themes

You can create custom themes by extending the CSS variables:## Event System



```css```javascript

.pattern-drawer--custom {// Pattern events

  --pattern-drawer-container-bg: #your-bg-color;drawer.on('patternStart', (data) => {

  --pattern-drawer-dot-bg: #your-dot-color;    console.log('Started drawing at:', data.index);

  --pattern-drawer-line-color: #your-line-color;});

  /* ... other variables */

}drawer.on('patternChange', (data) => {

```    console.log('Pattern updated:', data.pattern);

});

## 🎲 Available Presets

drawer.on('patternComplete', (data) => {

```javascript    console.log('Pattern completed:', data.pattern);

import { PRESETS, createPatternDrawer } from './src/index.js';    console.log('Complexity:', data.complexity);

});

// Mobile lock screen (Android style)

const mobileDrawer = createPatternDrawer('#mobile', 'MOBILE_LOCK');drawer.on('patternError', (data) => {

    console.log('Pattern error:', data.error);

// High security pattern});

const securityDrawer = createPatternDrawer('#security', 'SECURITY');

drawer.on('patternClear', () => {

// Gaming pattern    console.log('Pattern cleared');

const gameDrawer = createPatternDrawer('#game', 'GAMING');});



// Simple authentication// Mode and state events

const simpleDrawer = createPatternDrawer('#simple', 'SIMPLE');drawer.on('modeChange', (data) => {

```    console.log('Mode changed to:', data.mode);

});

## 🎯 Event System

drawer.on('themeChange', (data) => {

```javascript    console.log('Theme changed to:', data.theme);

drawer.on('patternStart', () => {});

    console.log('User started drawing');

});// Lifecycle events

drawer.on('ready', (drawer) => {

drawer.on('patternProgress', (data) => {    console.log('Pattern drawer ready');

    console.log('Pattern progress:', data.pattern);});

});

drawer.on('destroyed', () => {

drawer.on('patternComplete', (data) => {    console.log('Pattern drawer destroyed');

    console.log('Pattern completed:', data.pattern);});

    console.log('Pattern string:', data.patternString);```

    console.log('Complexity:', data.complexity);

});## Themes and Customization



drawer.on('patternClear', () => {### Built-in Themes

    console.log('Pattern cleared');- **Dark** (default): Dark background with white patterns

});- **Light**: Light background with blue patterns  

- **Blue**: Dark blue theme with cyan accents

drawer.on('patternError', (error) => {- **Green**: Dark green theme with emerald accents

    console.log('Pattern error:', error.message);

});### Custom Themes with CSS

``````css

.pattern-drawer--custom {

## 🔧 API Methods    --pattern-drawer-bg: #your-bg-color;

    --pattern-drawer-dot-bg: #your-dot-color;

```javascript    --pattern-drawer-dot-active-bg: #your-active-color;

// Pattern manipulation    --pattern-drawer-line-color: #your-line-color;

drawer.clearPattern();                    // Clear current pattern    /* ... other custom properties */

drawer.loadPattern([0, 1, 2, 5, 8]);    // Load specific pattern}

drawer.setPattern('0,1,2,5,8');          // Set pattern from string```



// Mode control## Pattern Complexity Analysis

drawer.setMode('draw');                  // Enable drawing mode

drawer.setMode('view');                  // Set to view-only modeThe library includes sophisticated pattern analysis:

drawer.setDisabled(true);                // Disable interaction

```javascript

// Visual updatesconst complexity = PatternUtils.calculateComplexity([0,1,4,3,6,7,8]);

drawer.setTheme('blue');                 // Change themeconsole.log(complexity);

drawer.setSize('large');                 // Change size// {

drawer.refresh();                        // Refresh display//   score: 85,

//   level: 'very-strong',

// Getters//   factors: [

const pattern = drawer.getPattern();     // Get current pattern array//     'Length: +50',

const patternString = drawer.getPatternString(); // Get pattern as string//     'Direction changes: +15', 

const isValid = drawer.isPatternValid(); // Check if pattern is valid//     'Line crossings: +15',

```//     'Corner usage: +5'

//   ]

## 🧮 Pattern Utilities// }

```

```javascript

import { PatternUtils } from './src/index.js';**Complexity Levels:**

- `very-weak` (0-19): Too simple

// Validation- `weak` (20-39): Basic patterns

const isValid = PatternUtils.isValidPattern([0, 1, 2], 3, 9, 3);- `medium` (40-59): Adequate security

- `strong` (60-79): Good security

// Conversion- `very-strong` (80+): Excellent security

const patternArray = PatternUtils.stringToPattern('0,1,2,5,8');

const patternString = PatternUtils.patternToString([0, 1, 2, 5, 8]);## Browser Support



// Analysis- Modern browsers with ES6+ support

const complexity = PatternUtils.calculateComplexity([0, 1, 2, 5, 8], 3);- Touch events for mobile devices

console.log(complexity.level); // 'weak', 'medium', 'strong', etc.- Keyboard navigation for accessibility

- High DPI display optimization

// Generation

const randomPattern = PatternUtils.generateRandomPattern(4, 9, 3);## File Structure

```

```

## 🏗️ Developmentpattern-drawer/

├── pattern-drawer.js       # Main library entry point

### Building from Source├── pattern-drawer.css      # Complete CSS library

├── PatternDrawer.js        # Core PatternDrawer class

```bash├── EventEmitter.js         # Event system

# Install dependencies├── utils.js               # Utility functions

npm install└── pattern.html           # Example implementation

```

# Build the library

npm run build## License



# Development mode with CSS watchingMIT License - Feel free to use in personal and commercial projects.

npm run dev

## Contributing

# Serve examples locally

npm run serve1. Fork the repository

```2. Create a feature branch

3. Make your changes

### File Structure for Development4. Add tests if applicable

- `src/` - Source files (edit these)5. Submit a pull request

- `dist/` - Built files (generated)

- `examples/` - Example implementations## Examples

- `docs/` - Documentation

Check out `pattern.html` for a complete working example with modal integration and DaisyUI styling.
### Build Scripts
- `npm run build` - Build everything
- `npm run build:js` - Build JavaScript only
- `npm run build:css` - Build CSS only
- `npm run lint` - Run ESLint
- `npm run serve` - Serve examples locally

## 📱 Responsive Design

The library automatically adapts to different screen sizes:

- **Desktop**: Full-size patterns with hover effects
- **Tablet**: Medium-sized patterns optimized for touch
- **Mobile**: Smaller patterns with larger touch targets

## ♿ Accessibility

- **Keyboard Navigation**: Tab through dots and use Enter/Space to select
- **Screen Reader Support**: Proper ARIA labels and announcements
- **High Contrast**: Themes work with system high-contrast modes
- **Reduced Motion**: Respects `prefers-reduced-motion` setting

## 🌟 Examples

Check out the `examples/` directory for:
- **simple-example.html** - Basic usage with all themes
- **basic-example.html** - Advanced modal implementation
- **modal-example.html** - Custom implementation example

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes in the `src/` directory
4. Run `npm run build` to generate dist files
5. Test your changes with the examples
6. Submit a pull request

## 📚 Migration Guide

### From v0.x to v1.0

1. **File Structure**: Import from new locations
   ```javascript
   // Old
   import { PatternDrawer } from './PatternDrawer.js';
   
   // New (recommended)
   import { PatternDrawer } from './src/index.js';
   
   // Or use backward compatibility
   import { PatternDrawer } from './pattern-drawer.js';
   ```

2. **CSS**: Use new modular CSS
   ```html
   <!-- Old -->
   <link rel="stylesheet" href="pattern-drawer.css">
   
   <!-- New (all styles) -->
   <link rel="stylesheet" href="src/styles/index.css">
   
   <!-- Or specific modules -->
   <link rel="stylesheet" href="src/styles/base.css">
   <link rel="stylesheet" href="src/styles/themes/dark.css">
   ```

3. **Build Process**: The library now supports modern build tools and has optimized bundles in the `dist/` directory.

---

**Pattern Drawer Library v1.0.0** - A modern, flexible pattern drawing component for web applications.