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

import { PatternDrawer } from './PatternDrawer.js';
import { PatternUtils } from './utils.js';
import { EventEmitter } from './EventEmitter.js';

// Export main classes
export { PatternDrawer, PatternUtils, EventEmitter };

// Export default as PatternDrawer for convenience
export default PatternDrawer;

// Define available themes
export const THEMES = {
    DARK: 'dark',
    LIGHT: 'light',
    BLUE: 'blue',
    GREEN: 'green'
};

// Define available sizes
export const SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
};

// Define grid sizes
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
        theme: 'dark',
        size: 'medium',
        showComplexity: true,
        animations: true
    },
    
    // Security pattern for sensitive areas
    HIGH_SECURITY: {
        minPoints: 6,
        maxPoints: 9,
        gridSize: 4,
        theme: 'blue',
        size: 'large',
        showComplexity: true,
        showInfo: true,
        animations: true
    },
    
    // Simple gesture input
    GESTURE_INPUT: {
        minPoints: 2,
        maxPoints: 6,
        gridSize: 3,
        theme: 'light',
        size: 'small',
        showComplexity: false,
        animations: false
    },
    
    // Gaming pattern input
    GAME_PATTERN: {
        minPoints: 3,
        maxPoints: 8,
        gridSize: 4,
        theme: 'green',
        size: 'medium',
        showComplexity: false,
        animations: true,
        allowRedraw: true
    }
};

/**
 * Create a PatternDrawer instance with a preset configuration
 * @param {string|HTMLElement} container - Container selector or element
 * @param {string} presetName - Name of the preset from PRESETS
 * @param {Object} overrides - Optional configuration overrides
 * @returns {PatternDrawer} PatternDrawer instance
 */
export function createPatternDrawer(container, presetName = 'MOBILE_LOCK', overrides = {}) {
    const preset = PRESETS[presetName];
    if (!preset) {
        throw new Error(`Unknown preset: ${presetName}. Available presets: ${Object.keys(PRESETS).join(', ')}`);
    }
    
    const config = { ...preset, ...overrides };
    return new PatternDrawer(container, config);
}

/**
 * Utility function to validate a pattern string
 * @param {string} patternString - Comma-separated pattern string
 * @param {Object} options - Validation options
 * @returns {Object} Validation result
 */
export function validatePatternString(patternString, options = {}) {
    const {
        minPoints = 4,
        maxPoints = 9,
        gridSize = 3
    } = options;
    
    if (!PatternUtils.isPatternSequence(patternString, minPoints, maxPoints, gridSize)) {
        return { isValid: false, message: 'Invalid pattern string format' };
    }
    
    const pattern = PatternUtils.stringToPattern(patternString);
    return PatternUtils.isValidPattern(pattern, minPoints, maxPoints, gridSize);
}

/**
 * Generate a random pattern for testing or demonstration
 * @param {Object} options - Generation options
 * @returns {string} Pattern string
 */
export function generateRandomPattern(options = {}) {
    const {
        minPoints = 4,
        maxPoints = 9,
        gridSize = 3
    } = options;
    
    const pattern = PatternUtils.generateRandomPattern(minPoints, maxPoints, gridSize);
    return PatternUtils.patternToString(pattern);
}

/**
 * Analyze pattern complexity and return detailed information
 * @param {string|number[]} pattern - Pattern string or array
 * @param {number} gridSize - Grid size for analysis
 * @returns {Object} Complexity analysis
 */
export function analyzePattern(pattern, gridSize = 3) {
    const patternArray = Array.isArray(pattern) ? pattern : PatternUtils.stringToPattern(pattern);
    return PatternUtils.calculateComplexity(patternArray, gridSize);
}

// Global library information
export const VERSION = '1.0.0';
export const LIBRARY_NAME = 'Pattern Drawer';

// Browser globals (for non-module usage)
if (typeof window !== 'undefined') {
    window.PatternDrawer = PatternDrawer;
    window.PatternDrawerLib = {
        PatternDrawer,
        PatternUtils,
        EventEmitter,
        createPatternDrawer,
        validatePatternString,
        generateRandomPattern,
        analyzePattern,
        THEMES,
        SIZES,
        GRID_SIZES,
        PRESETS,
        VERSION,
        LIBRARY_NAME
    };
}

// UMD export for broader compatibility
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PatternDrawer,
        PatternUtils,
        EventEmitter,
        createPatternDrawer,
        validatePatternString,
        generateRandomPattern,
        analyzePattern,
        THEMES,
        SIZES,
        GRID_SIZES,
        PRESETS,
        VERSION,
        LIBRARY_NAME,
        default: PatternDrawer
    };
}