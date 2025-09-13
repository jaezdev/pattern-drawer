# Pattern Drawer Library

A configurable, themeable pattern drawing component for web applications. Perfect for creating lock screen patterns, gesture authentication, and interactive drawings.

## Features

- ✨ **Multiple Themes**: Dark, Light, Blue, and Green themes with CSS custom properties
- 🎨 **Fully Customizable**: Configurable grid sizes, dot sizes, colors, and animations
- 📱 **Touch & Mouse Support**: Works on desktop and mobile devices
- 🎯 **Event System**: Complete event system for pattern interactions
- 🧮 **Pattern Analysis**: Built-in complexity analysis and validation
- ♿ **Accessible**: Keyboard navigation and screen reader support
- 📦 **Multiple Import Methods**: ES6 modules, UMD, and browser globals
- 🎲 **Preset Configurations**: Pre-built configurations for common use cases

## Quick Start

### HTML
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="pattern-drawer.css">
</head>
<body>
    <div id="pattern-container"></div>
    
    <script type="module">
        import { createPatternDrawer } from './pattern-drawer.js';
        
        const drawer = createPatternDrawer('#pattern-container', 'MOBILE_LOCK');
        
        drawer.on('patternComplete', (data) => {
            console.log('Pattern completed:', data.pattern);
        });
    </script>
</body>
</html>
```

## Installation & Usage

### ES6 Modules
```javascript
import { PatternDrawer, PatternUtils, THEMES, PRESETS } from './pattern-drawer.js';

// Create with custom configuration
const drawer = new PatternDrawer('#container', {
    theme: THEMES.DARK,
    minPoints: 4,
    maxPoints: 9,
    gridSize: 3,
    showComplexity: true
});

// Or use a preset
import { createPatternDrawer } from './pattern-drawer.js';
const drawer = createPatternDrawer('#container', 'MOBILE_LOCK');
```

### Browser Globals (No Module System)
```html
<script src="pattern-drawer.js"></script>
<script>
    const drawer = new PatternDrawerLib.PatternDrawer('#container', {
        theme: 'dark',
        minPoints: 4
    });
</script>
```

## Configuration Options

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

## Available Presets

```javascript
import { PRESETS, createPatternDrawer } from './pattern-drawer.js';

// Mobile lock screen (Android style)
const mobile = createPatternDrawer('#container', 'MOBILE_LOCK');

// High security pattern
const secure = createPatternDrawer('#container', 'HIGH_SECURITY');

// Simple gesture input
const gesture = createPatternDrawer('#container', 'GESTURE_INPUT');

// Gaming pattern
const game = createPatternDrawer('#container', 'GAME_PATTERN');
```

## API Methods

### Core Methods
```javascript
// Mode control
drawer.draw();                    // Enable drawing mode
drawer.view([0,1,4,7]);          // Show pattern in view mode
drawer.clear();                   // Clear current pattern

// Pattern management
const pattern = drawer.getPattern();     // Get current pattern
drawer.setPattern([0,1,4,7]);           // Set pattern programmatically
drawer.loadPattern([0,1,4,7]);          // Load pattern without mode change

// Configuration
drawer.setTheme('blue');                 // Change theme
drawer.setDisabled(true);               // Enable/disable interaction
drawer.updateConfig({ minPoints: 6 });  // Update configuration
const config = drawer.getConfig();       // Get current configuration

// Cleanup
drawer.destroy();                        // Clean up and remove
```

### Utility Functions
```javascript
import { PatternUtils } from './pattern-drawer.js';

// Validation
const isValid = PatternUtils.isPatternSequence('0,1,4,7');
const validation = PatternUtils.isValidPattern([0,1,4,7], 4, 9, 3);

// Conversion
const patternString = PatternUtils.patternToString([0,1,4,7]);
const patternArray = PatternUtils.stringToPattern('0,1,4,7');

// Analysis
const complexity = PatternUtils.calculateComplexity([0,1,4,7], 3);
// Returns: { score: 45, level: 'medium', factors: ['Length: +20', 'Direction changes: +15'] }

// Generation
const randomPattern = PatternUtils.generateRandomPattern(4, 8, 3);
```

## Event System

```javascript
// Pattern events
drawer.on('patternStart', (data) => {
    console.log('Started drawing at:', data.index);
});

drawer.on('patternChange', (data) => {
    console.log('Pattern updated:', data.pattern);
});

drawer.on('patternComplete', (data) => {
    console.log('Pattern completed:', data.pattern);
    console.log('Complexity:', data.complexity);
});

drawer.on('patternError', (data) => {
    console.log('Pattern error:', data.error);
});

drawer.on('patternClear', () => {
    console.log('Pattern cleared');
});

// Mode and state events
drawer.on('modeChange', (data) => {
    console.log('Mode changed to:', data.mode);
});

drawer.on('themeChange', (data) => {
    console.log('Theme changed to:', data.theme);
});

// Lifecycle events
drawer.on('ready', (drawer) => {
    console.log('Pattern drawer ready');
});

drawer.on('destroyed', () => {
    console.log('Pattern drawer destroyed');
});
```

## Themes and Customization

### Built-in Themes
- **Dark** (default): Dark background with white patterns
- **Light**: Light background with blue patterns  
- **Blue**: Dark blue theme with cyan accents
- **Green**: Dark green theme with emerald accents

### Custom Themes with CSS
```css
.pattern-drawer--custom {
    --pattern-drawer-bg: #your-bg-color;
    --pattern-drawer-dot-bg: #your-dot-color;
    --pattern-drawer-dot-active-bg: #your-active-color;
    --pattern-drawer-line-color: #your-line-color;
    /* ... other custom properties */
}
```

## Pattern Complexity Analysis

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

## Browser Support

- Modern browsers with ES6+ support
- Touch events for mobile devices
- Keyboard navigation for accessibility
- High DPI display optimization

## File Structure

```
pattern-drawer/
├── pattern-drawer.js       # Main library entry point
├── pattern-drawer.css      # Complete CSS library
├── PatternDrawer.js        # Core PatternDrawer class
├── EventEmitter.js         # Event system
├── utils.js               # Utility functions
└── pattern.html           # Example implementation
```

## License

MIT License - Feel free to use in personal and commercial projects.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## Examples

Check out `pattern.html` for a complete working example with modal integration and DaisyUI styling.