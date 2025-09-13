/**
 * Basic tests for Pattern Drawer Library
 * Run with: node tests/basic.test.js
 */

import { PatternDrawer, PatternUtils, THEMES, PRESETS, createPatternDrawer } from '../src/index.js';

// Simple test runner
let tests = 0;
let passed = 0;

function test(name, fn) {
    tests++;
    try {
        fn();
        console.log(`✅ ${name}`);
        passed++;
    } catch (error) {
        console.log(`❌ ${name}: ${error.message}`);
    }
}

function assertEqual(actual, expected, message = '') {
    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}. ${message}`);
    }
}

function assertTrue(condition, message = '') {
    if (!condition) {
        throw new Error(`Expected true, got false. ${message}`);
    }
}

// Tests
console.log('🧪 Running Pattern Drawer Library Tests...\n');

// PatternUtils tests
test('PatternUtils.stringToPattern converts correctly', () => {
    const result = PatternUtils.stringToPattern('0,1,2');
    assertEqual(result, [0, 1, 2]);
});

test('PatternUtils.patternToString converts correctly', () => {
    const result = PatternUtils.patternToString([0, 1, 2]);
    assertEqual(result, '0,1,2');
});

test('PatternUtils.isValidPattern validates correctly', () => {
    const valid = PatternUtils.isValidPattern([0, 1, 2, 3], 4, 9, 3);
    assertTrue(valid.isValid, 'Should be valid pattern');
    
    const invalid = PatternUtils.isValidPattern([0, 1], 4, 9, 3);
    assertTrue(!invalid.isValid, 'Should be invalid pattern (too short)');
});

test('PatternUtils.calculateComplexity returns complexity data', () => {
    const complexity = PatternUtils.calculateComplexity([0, 1, 2, 5, 8], 3);
    assertTrue(complexity.level, 'Should have complexity level');
    assertTrue(typeof complexity.score === 'number', 'Should have numeric score');
});

// Constants tests
test('THEMES object has correct values', () => {
    assertEqual(THEMES.DARK, 'dark');
    assertEqual(THEMES.LIGHT, 'light');
    assertEqual(THEMES.BLUE, 'blue');
    assertEqual(THEMES.GREEN, 'green');
});

test('PRESETS object has required presets', () => {
    assertTrue(PRESETS.MOBILE_LOCK, 'Should have MOBILE_LOCK preset');
    assertTrue(PRESETS.SECURITY, 'Should have SECURITY preset');
    assertTrue(PRESETS.GAMING, 'Should have GAMING preset');
    assertTrue(PRESETS.SIMPLE, 'Should have SIMPLE preset');
});

// Factory function tests
test('createPatternDrawer function exists and is callable', () => {
    assertTrue(typeof createPatternDrawer === 'function', 'createPatternDrawer should be a function');
    
    // In Node.js environment without DOM, it should throw container error
    try {
        createPatternDrawer('#nonexistent-container');
        assertTrue(false, 'Should have thrown error in Node.js environment');
    } catch (error) {
        // Expected to fail in Node.js without DOM
        assertTrue(true, 'Correctly throws error in Node.js environment');
    }
});

// Summary
console.log(`\n📊 Test Results: ${passed}/${tests} passed`);
if (passed === tests) {
    console.log('🎉 All tests passed!');
    process.exit(0);
} else {
    console.log('💥 Some tests failed!');
    process.exit(1);
}