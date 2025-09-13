// Node.js Example using CommonJS build
const { 
    createPatternDrawer, 
    PatternDrawer,
    PatternUtils,
    PRESETS, 
    THEMES, 
    SIZES 
} = require('../dist/pattern-drawer.cjs');

// Example: Server-side pattern validation
class PatternValidator {
    constructor() {
        this.validPatterns = new Set();
        this.minComplexity = 'medium';
    }
    
    /**
     * Register a valid pattern
     * @param {string} patternString - Pattern in string format
     */
    registerPattern(patternString) {
        const pattern = PatternUtils.stringToPattern(patternString);
        
        if (!PatternUtils.isValidPattern(pattern)) {
            throw new Error('Invalid pattern format');
        }
        
        const complexity = PatternUtils.calculateComplexity(pattern);
        if (this.isComplexityAcceptable(complexity.level)) {
            this.validPatterns.add(patternString);
            console.log(`✅ Pattern registered: ${patternString} (${complexity.level} complexity)`);
            return true;
        } else {
            throw new Error(`Pattern complexity too low. Minimum: ${this.minComplexity}, Got: ${complexity.level}`);
        }
    }
    
    /**
     * Validate a pattern against registered patterns
     * @param {string} patternString - Pattern to validate
     */
    validatePattern(patternString) {
        return this.validPatterns.has(patternString);
    }
    
    /**
     * Get pattern statistics
     * @param {string} patternString - Pattern to analyze
     */
    getPatternStats(patternString) {
        const pattern = PatternUtils.stringToPattern(patternString);
        const complexity = PatternUtils.calculateComplexity(pattern);
        
        return {
            pattern: patternString,
            length: pattern.length,
            complexity: complexity.level,
            score: complexity.score,
            uniquePoints: new Set(pattern.map(p => `${p.row}-${p.col}`)).size,
            isValid: PatternUtils.isValidPattern(pattern),
            isRegistered: this.validatePattern(patternString)
        };
    }
    
    isComplexityAcceptable(level) {
        const levels = ['low', 'medium', 'high', 'very-high'];
        const minIndex = levels.indexOf(this.minComplexity);
        const currentIndex = levels.indexOf(level);
        return currentIndex >= minIndex;
    }
}

// Example usage
try {
    const validator = new PatternValidator();
    
    // Test patterns
    const testPatterns = [
        '0,0-0,1-0,2',           // Simple horizontal line (low complexity)
        '0,0-1,1-2,2-1,0',       // More complex pattern
        '0,0-1,1-2,2-2,1-1,0',   // High complexity pattern
        '0,0-2,2-0,2-2,0'        // Diamond pattern
    ];
    
    console.log('🧪 Testing Pattern Validator\n');
    
    testPatterns.forEach((pattern, index) => {
        try {
            console.log(`Test ${index + 1}: ${pattern}`);
            const stats = validator.getPatternStats(pattern);
            console.log(`  Stats:`, stats);
            
            if (stats.complexity !== 'low') {
                validator.registerPattern(pattern);
            } else {
                console.log(`  ❌ Pattern rejected: complexity too low\n`);
            }
        } catch (error) {
            console.log(`  ❌ Error: ${error.message}\n`);
        }
    });
    
    // Test validation
    console.log('\n🔍 Validation Tests:');
    testPatterns.forEach(pattern => {
        const isValid = validator.validatePattern(pattern);
        console.log(`${pattern}: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
    });
    
} catch (error) {
    console.error('Error:', error.message);
}

module.exports = { PatternValidator };