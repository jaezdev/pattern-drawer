/**
 * Pattern Drawer Library - Main Entry Point
 * Version 1.0.0
 * 
 * A configurable, themeable pattern drawing component for web applications.
 * Perfect for creating lock screen patterns, gesture authentication, and interactive drawings.
 * 
 * @author Pattern Drawer Library
 * @license MIT
 */

// Core classes
export { PatternDrawer } from './core/PatternDrawer.js';
export { PatternUtils } from './utils/index.js';
export { EventEmitter } from './core/EventEmitter.js';

// Constants and configurations
export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    BLUE: 'blue',
    GREEN: 'green'
};

export const SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
};

export const GRID_SIZES = {
    SMALL: 3,      // 3x3 grid
    MEDIUM: 4,     // 4x4 grid
    LARGE: 5       // 5x5 grid
};

// Pre-defined configurations for common use cases
export const PRESETS = {
    // Mobile lock screen pattern (Android style)
    MOBILE_LOCK: {
        minPoints: 4,
        maxPoints: 9,
        gridSize: 3,
        theme: THEMES.DARK,
        size: SIZES.MEDIUM,
        allowRedraw: true,
        animations: true,
        showComplexity: false,
        showInfo: false
    },

    // Security pattern for sensitive applications
    SECURITY: {
        minPoints: 6,
        maxPoints: 16,
        gridSize: 4,
        theme: THEMES.BLUE,
        size: SIZES.LARGE,
        allowRedraw: false,
        animations: true,
        showComplexity: true,
        showInfo: true
    },

    // Gaming pattern for casual games
    GAMING: {
        minPoints: 3,
        maxPoints: 25,
        gridSize: 5,
        theme: THEMES.GREEN,
        size: SIZES.LARGE,
        allowRedraw: true,
        animations: true,
        showComplexity: false,
        showInfo: false
    },

    // Simple pattern for basic authentication
    SIMPLE: {
        minPoints: 3,
        maxPoints: 6,
        gridSize: 3,
        theme: THEMES.LIGHT,
        size: SIZES.SMALL,
        allowRedraw: true,
        animations: false,
        showComplexity: false,
        showInfo: false
    }
};

/**
 * Factory function to create a PatternDrawer with preset configuration
 * @param {string|HTMLElement} container - Container element or selector
 * @param {string|Object} preset - Preset name or custom configuration
 * @param {Object} overrides - Additional options to override preset values
 * @returns {PatternDrawer} New PatternDrawer instance
 */
export function createPatternDrawer(container, preset = 'MOBILE_LOCK', overrides = {}) {
    const config = typeof preset === 'string' 
        ? { ...PRESETS[preset], ...overrides }
        : { ...preset, ...overrides };
    
    return new PatternDrawer(container, config);
}

// Export PatternDrawer as default for convenience
export { PatternDrawer as default } from './core/PatternDrawer.js';