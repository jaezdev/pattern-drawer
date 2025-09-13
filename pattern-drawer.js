/**
 * Pattern Drawer Library - Backward Compatibility Entry Point
 * Version 1.0.0
 * 
 * This file provides backward compatibility for existing imports.
 * For new projects, use: import { PatternDrawer } from './src/index.js'
 * 
 * @author Pattern Drawer Library
 * @license MIT
 */

// Re-export everything from the new main entry point
export * from './src/index.js';
export { default } from './src/index.js';
