# Using Pattern Drawer from Distribution Files

This guide shows you how to use the pattern-drawer library from the built distribution files in various environments.

## Available Distribution Files

The `dist/` folder contains the following files:

### JavaScript Files
- `pattern-drawer.esm.js` - ES Module build for modern browsers and bundlers
- `pattern-drawer.cjs` - CommonJS build for Node.js applications
- `pattern-drawer.umd.js` - Universal Module Definition for direct browser use
- `pattern-drawer.umd.min.js` - Minified UMD build for production

### CSS Files
- `pattern-drawer.css` - Full stylesheet with all themes and components
- `pattern-drawer.min.css` - Minified CSS for production use

## Usage Examples

### 1. Direct Browser Usage (UMD)

Include the library directly in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/pattern-drawer.min.css">
</head>
<body>
    <div id="pattern-container"></div>
    
    <script src="dist/pattern-drawer.umd.min.js"></script>
    <script>
        const { createPatternDrawer, PRESETS, THEMES } = PatternDrawer;
        
        const drawer = createPatternDrawer('#pattern-container', PRESETS.MOBILE_LOCK);
        
        drawer.on('patternComplete', (pattern) => {
            console.log('Pattern completed:', pattern);
        });
    </script>
</body>
</html>
```

### 2. ES Modules (Modern JavaScript)

Use with modern browsers that support ES modules:

```html
<script type="module">
    import { createPatternDrawer, PRESETS, THEMES } from './dist/pattern-drawer.esm.js';
    
    const drawer = createPatternDrawer('#container', PRESETS.SECURITY);
    // Your code here...
</script>
```

### 3. Node.js/CommonJS

For server-side applications (rename file to `.cjs` if using ES modules in package.json):

```javascript
const { 
    createPatternDrawer, 
    PatternUtils,
    PRESETS 
} = require('./dist/pattern-drawer.cjs');

// Server-side pattern validation example
const pattern = PatternUtils.stringToPattern('0,0-1,1-2,2');
const complexity = PatternUtils.calculateComplexity(pattern);
console.log('Pattern complexity:', complexity.level);
```

### 4. React Integration

```jsx
import React, { useEffect, useRef } from 'react';
import { createPatternDrawer, PRESETS } from 'pattern-drawer';
import 'pattern-drawer/dist/pattern-drawer.css';

const PatternComponent = () => {
    const containerRef = useRef(null);
    
    useEffect(() => {
        const drawer = createPatternDrawer(containerRef.current, PRESETS.MOBILE_LOCK);
        
        drawer.on('patternComplete', (pattern) => {
            console.log('Pattern:', pattern);
        });
        
        return () => drawer.destroy();
    }, []);
    
    return <div ref={containerRef} />;
};
```

### 5. Bundle with Webpack/Vite

Install as a local dependency:

```bash
npm install ./dist  # Install from local dist folder
```

Then import in your application:

```javascript
import { createPatternDrawer, THEMES } from 'pattern-drawer';
import 'pattern-drawer/dist/pattern-drawer.css';

const drawer = createPatternDrawer('#app', {
    theme: THEMES.BLUE,
    gridSize: 4,
    minPoints: 4
});
```

## API Reference

### Main Functions

- `createPatternDrawer(container, preset, overrides)` - Create a new pattern drawer
- `PatternDrawer(container, options)` - Pattern drawer class constructor

### Utilities

- `PatternUtils.stringToPattern(str)` - Convert string to pattern array
- `PatternUtils.patternToString(pattern)` - Convert pattern to string
- `PatternUtils.isValidPattern(pattern)` - Validate pattern format
- `PatternUtils.calculateComplexity(pattern)` - Calculate pattern complexity

### Constants

- `THEMES` - Available themes (DARK, LIGHT, BLUE, GREEN)
- `PRESETS` - Pre-configured setups (MOBILE_LOCK, SECURITY, GAMING, SIMPLE)
- `SIZES` - Available sizes (SMALL, MEDIUM, LARGE)

### Events

Pattern drawers emit the following events:

- `patternStart` - When user starts drawing
- `patternChange` - When pattern changes during drawing
- `patternComplete` - When user completes a pattern
- `patternClear` - When pattern is cleared

### Example Event Usage

```javascript
const drawer = createPatternDrawer('#container', PRESETS.MOBILE_LOCK);

drawer.on('patternStart', () => {
    console.log('User started drawing');
});

drawer.on('patternComplete', (pattern) => {
    const patternString = PatternUtils.patternToString(pattern);
    const complexity = PatternUtils.calculateComplexity(pattern);
    
    console.log('Pattern:', patternString);
    console.log('Complexity:', complexity.level);
});
```

## CSS Themes

The library includes several built-in themes:

- **Dark Theme** - Dark background with light elements
- **Light Theme** - Light background with dark elements  
- **Blue Theme** - Blue color scheme
- **Green Theme** - Green color scheme

Apply themes programmatically:

```javascript
drawer.setTheme(THEMES.BLUE);
```

Or include specific theme CSS:

```html
<link rel="stylesheet" href="dist/pattern-drawer.css">
<!-- Themes are included in main CSS -->
```

## Browser Compatibility

- **ES Modules**: Modern browsers (Chrome 61+, Firefox 60+, Safari 11+)
- **UMD Build**: All modern browsers including IE11+
- **Node.js**: Version 14+ (CommonJS build)

## File Sizes

| File | Size | Gzipped |
|------|------|---------|
| pattern-drawer.esm.js | ~45KB | ~12KB |
| pattern-drawer.umd.min.js | ~42KB | ~11KB |
| pattern-drawer.cjs | ~44KB | ~12KB |
| pattern-drawer.min.css | ~15KB | ~3KB |

## Performance Tips

1. Use minified versions in production
2. Load CSS and JS asynchronously when possible
3. Consider lazy loading for non-critical pattern drawers
4. Use appropriate bundle format for your target environment

## Troubleshooting

### Common Issues

1. **"PatternDrawer is not defined"** - Make sure you're loading the UMD build correctly
2. **Module import errors** - Check that you're using the correct file extension and import syntax
3. **CSS not applied** - Ensure the CSS file is loaded before initializing pattern drawers
4. **Pattern validation fails** - Check that patterns don't have duplicate points and follow the correct format

### Debug Mode

Enable debug logging:

```javascript
const drawer = createPatternDrawer('#container', {
    ...PRESETS.MOBILE_LOCK,
    debug: true
});
```

This will log internal operations to the browser console.