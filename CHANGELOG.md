# Changelog

All notable changes to the Pattern Drawer Library will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-09-12

### 🎉 Initial Release

#### Added
- **Core Library**
  - `PatternDrawer` class with full functionality
  - `EventEmitter` class for event handling
  - `PatternUtils` namespace with utility functions
  
- **Multiple Themes**
  - Dark theme (default)
  - Light theme
  - Blue theme  
  - Green theme
  - CSS custom properties for easy customization

- **Preset Configurations**
  - `MOBILE_LOCK` - Android-style lock screen pattern
  - `SECURITY` - High-security pattern with complexity analysis
  - `GAMING` - Gaming-optimized pattern input
  - `SIMPLE` - Basic authentication pattern

- **Modern Build System**
  - ES6 modules as primary format
  - CommonJS build for Node.js compatibility
  - UMD build for browser globals
  - Minified versions for production
  - CSS processing with PostCSS

- **Developer Experience**
  - TypeScript definitions included
  - Comprehensive documentation
  - Multiple usage examples
  - ESLint configuration
  - Professional project structure

- **Features**
  - Touch and mouse support
  - Responsive design
  - Accessibility features (keyboard navigation, screen reader support)
  - Pattern complexity analysis
  - Multiple grid sizes (3x3, 4x4, 5x5)
  - Customizable dot sizes and colors
  - Animation support with reduced-motion respect

#### File Structure
```
src/
├── core/           # Core classes
├── utils/          # Utility functions  
├── styles/         # Modular CSS
│   └── themes/     # Theme files
└── index.js        # Main entry point

dist/               # Built files
examples/           # Usage examples
docs/               # Documentation
tests/              # Test files
```

#### Breaking Changes
- This is the initial release, no breaking changes

#### Migration
- New users: Import from `./src/index.js`
- Backward compatibility maintained via `./pattern-drawer.js`

---

## [Unreleased]

### Planned Features
- [ ] React/Vue/Angular components
- [ ] Pattern templates/presets
- [ ] Audio feedback support
- [ ] Gesture recording and playback
- [ ] Advanced security features
- [ ] Performance optimizations