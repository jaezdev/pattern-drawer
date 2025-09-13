# Pattern Drawer Library

A configurable, themeable pattern drawing component for web applications. Perfect for creating lock screen patterns, gesture authentication, and interactive drawings.

## ✨ Features

- 🎨 **Multiple Themes**: Dark, Light, Blue, and Green themes with CSS custom properties
- 🔧 **Fully Customizable**: Configurable grid sizes, dot sizes, colors, and animations
- 📱 **Touch & Mouse Support**: Works seamlessly on desktop and mobile devices
- 🎯 **Event System**: Complete event system for pattern interactions
- 🧮 **Pattern Analysis**: Built-in complexity analysis and validation
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 📦 **Multiple Import Methods**: ES6 modules, CommonJS, UMD, and browser globals
- 🎲 **Preset Configurations**: Pre-built configurations for common use cases
- 🏗️ **Modern Build System**: TypeScript definitions, tree-shaking support, and optimized bundles

## 🚀 Quick Start

### 1. HTML Setup

```html
<!DOCTYPE html>
<html>
<head>
    <!-- Include the CSS -->
    <link rel="stylesheet" href="dist/pattern-drawer.css">
    <!-- Or use individual modules -->
    <link rel="stylesheet" href="src/styles/index.css">
</head>
<body>
    <div id="pattern-container"></div>
</body>
</html>
```

### 2. JavaScript (ES6 Modules)

```javascript
import { createPatternDrawer } from './src/index.js';

const drawer = createPatternDrawer('#pattern-container', 'MOBILE_LOCK');

drawer.on('patternComplete', (data) => {
    console.log('Pattern completed:', data.pattern);
    console.log('Complexity:', data.complexity);
});
```

### 3. Backward Compatibility

```javascript
// Still works with existing imports
import { createPatternDrawer } from './pattern-drawer.js';
```

## 📦 Installation Methods

### ES6 Modules (Recommended)

```javascript
import { PatternDrawer, PatternUtils, THEMES, PRESETS } from './src/index.js';

// Create with custom configuration
const drawer = new PatternDrawer('#container', {
    theme: THEMES.DARK,
    minPoints: 4,
    maxPoints: 9,
    gridSize: 3,
    showComplexity: true
});

// Or use a preset
const drawer = createPatternDrawer('#container', 'MOBILE_LOCK');
```

### CommonJS (Node.js)

```javascript
const { PatternDrawer, createPatternDrawer } = require('./dist/pattern-drawer.cjs');
```

### Browser Globals (No Module System)

```html
<script src="dist/pattern-drawer.umd.js"></script>
<script>
    const drawer = new PatternDrawer.PatternDrawer('#container', {
        theme: 'dark',
        minPoints: 4
    });
</script>
```

## ⚙️ Configuration Options

```javascript
const config = {
    // Pattern constraints
    minPoints: 4,           // Minimum required points
    maxPoints: 9,           // Maximum allowed points
    gridSize: 3,            // Grid size (3x3, 4x4, 5x5)
    
    // Visual settings
    theme: 'dark',          // 'dark', 'light', 'blue', 'green'
    size: 'medium',         // 'small', 'medium', 'large'
    dotSize: 60,           // Dot size in pixels
    lineWidth: 3,          // Line width in pixels
    
    // Features
    showComplexity: false,  // Show pattern complexity
    showInfo: false,        // Show pattern info panel
    animations: true,       // Enable animations
    allowRedraw: true       // Allow pattern clearing on error
};
```

## 🎨 Available Themes

```javascript
import { THEMES, createPatternDrawer } from './src/index.js';

// Built-in themes
const darkDrawer = createPatternDrawer('#dark', { theme: THEMES.DARK });
const lightDrawer = createPatternDrawer('#light', { theme: THEMES.LIGHT });
const blueDrawer = createPatternDrawer('#blue', { theme: THEMES.BLUE });
const greenDrawer = createPatternDrawer('#green', { theme: THEMES.GREEN });
```

### Custom Themes

You can create custom themes by extending the CSS variables:

```css
.pattern-drawer--custom {
  --pattern-drawer-container-bg: #your-bg-color;
  --pattern-drawer-dot-bg: #your-dot-color;
  --pattern-drawer-line-color: #your-line-color;
  /* ... other variables */
}
```

## 🎲 Available Presets

```javascript
import { PRESETS, createPatternDrawer } from './src/index.js';

// Mobile lock screen (Android style)
const mobileDrawer = createPatternDrawer('#mobile', 'MOBILE_LOCK');

// High security pattern
const securityDrawer = createPatternDrawer('#security', 'SECURITY');

// Gaming pattern
const gameDrawer = createPatternDrawer('#game', 'GAMING');

// Simple authentication
const simpleDrawer = createPatternDrawer('#simple', 'SIMPLE');
```

## 🎯 Event System

```javascript
drawer.on('patternStart', () => {
    console.log('User started drawing');
});

drawer.on('patternProgress', (data) => {
    console.log('Pattern progress:', data.pattern);
});

drawer.on('patternComplete', (data) => {
    console.log('Pattern completed:', data.pattern);
    console.log('Pattern string:', data.patternString);
    console.log('Complexity:', data.complexity);
});

drawer.on('patternClear', () => {
    console.log('Pattern cleared');
});

drawer.on('patternError', (error) => {
    console.log('Pattern error:', error.message);
});
```

## 🔧 API Methods

```javascript
// Pattern manipulation
drawer.clearPattern();                    // Clear current pattern
drawer.loadPattern([0, 1, 2, 5, 8]);    // Load specific pattern
drawer.setPattern('0,1,2,5,8');          // Set pattern from string

// Mode control
drawer.setMode('draw');                  // Enable drawing mode
drawer.setMode('view');                  // Set to view-only mode
drawer.setDisabled(true);                // Disable interaction

// Visual updates
drawer.setTheme('blue');                 // Change theme
drawer.setSize('large');                 // Change size
drawer.refresh();                        // Refresh display

// Getters
const pattern = drawer.getPattern();     // Get current pattern array
const patternString = drawer.getPatternString(); // Get pattern as string
const isValid = drawer.isPatternValid(); // Check if pattern is valid
```

## 🧮 Pattern Utilities

```javascript
import { PatternUtils } from './src/index.js';

// Validation
const isValid = PatternUtils.isValidPattern([0, 1, 2], 3, 9, 3);

// Conversion
const patternArray = PatternUtils.stringToPattern('0,1,2,5,8');
const patternString = PatternUtils.patternToString([0, 1, 2, 5, 8]);

// Analysis
const complexity = PatternUtils.calculateComplexity([0, 1, 2, 5, 8], 3);
console.log(complexity.level); // 'weak', 'medium', 'strong', etc.

// Generation
const randomPattern = PatternUtils.generateRandomPattern(4, 9, 3);
```

## 🏗️ Development

### Building from Source

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Development mode with CSS watching
npm run dev

# Serve examples locally
npm run serve
```

### File Structure for Development

- `src/` - Source files (edit these)
- `dist/` - Built files (generated)
- `examples/` - Example implementations
- `docs/` - Documentation

### Build Scripts

- `npm run build` - Build everything
- `npm run build:js` - Build JavaScript only
- `npm run build:css` - Build CSS only
- `npm run lint` - Run ESLint
- `npm run serve` - Serve examples locally

## 📁 Project Structure

```
pattern-drawer/
├── src/                          # Source files
│   ├── core/                     # Core library classes
│   │   ├── PatternDrawer.js      # Main PatternDrawer class
│   │   └── EventEmitter.js       # Event system
│   ├── utils/                    # Utility functions
│   │   └── index.js              # Pattern utilities
│   ├── styles/                   # CSS modules
│   │   ├── base.css              # Base styles and variables
│   │   ├── components.css        # Component styles
│   │   ├── responsive.css        # Responsive and accessibility
│   │   ├── themes/               # Theme files
│   │   │   ├── dark.css          # Dark theme (default)
│   │   │   ├── light.css         # Light theme
│   │   │   ├── blue.css          # Blue theme
│   │   │   └── green.css         # Green theme
│   │   └── index.css             # Main CSS entry point
│   └── index.js                  # Main JavaScript entry point
├── dist/                         # Built/compiled files
├── examples/                     # Example implementations
│   ├── simple-example.html       # Basic usage example
│   ├── basic-example.html        # Advanced modal example
│   └── modal-example.html        # Custom implementation example
├── docs/                         # Documentation
├── pattern-drawer.js             # Backward compatibility entry point
├── pattern-drawer.css            # Backward compatibility CSS
├── package.json                  # Package configuration
└── README.md                     # This file
```

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

## 🧮 Pattern Complexity Analysis

The library includes sophisticated pattern analysis:

```javascript
const complexity = PatternUtils.calculateComplexity([0,1,4,3,6,7,8]);
console.log(complexity);
// {
//   score: 85,
//   level: 'very-strong',
//   factors: [
//     'Length: +50',
//     'Direction changes: +15', 
//     'Line crossings: +15',
//     'Corner usage: +5'
//   ]
// }
```

**Complexity Levels:**
- `very-weak` (0-19): Too simple
- `weak` (20-39): Basic patterns
- `medium` (40-59): Adequate security
- `strong` (60-79): Good security
- `very-strong` (80+): Excellent security

## 🌍 Browser Support

- Modern browsers with ES6+ support
- Touch events for mobile devices
- Keyboard navigation for accessibility
- High DPI display optimization

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