/**
 * Pattern Drawer Utilities
 * Utility functions for pattern validation, conversion, and analysis
 */

export const PatternUtils = {
    /**
     * Validates if a pattern is valid based on constraints
     * @param {number[]} pattern - Array of dot indices
     * @param {number} minPoints - Minimum required points
     * @param {number} maxPoints - Maximum allowed points
     * @param {number} gridSize - Grid size (3 for 3x3, 4 for 4x4, etc.)
     * @returns {Object} Validation result with isValid flag and message
     */
    isValidPattern(pattern, minPoints = 4, maxPoints = 9, gridSize = 3) {
        if (!Array.isArray(pattern)) {
            return { isValid: false, message: 'Pattern must be an array' };
        }
        
        if (pattern.length < minPoints) {
            return { isValid: false, message: `Pattern must have at least ${minPoints} points` };
        }
        
        if (pattern.length > maxPoints) {
            return { isValid: false, message: `Pattern cannot have more than ${maxPoints} points` };
        }
        
        const maxIndex = (gridSize * gridSize) - 1;
        for (const point of pattern) {
            if (!Number.isInteger(point) || point < 0 || point > maxIndex) {
                return { isValid: false, message: `Invalid point: ${point}. Must be between 0 and ${maxIndex}` };
            }
        }
        
        // Check for duplicates
        const unique = new Set(pattern);
        if (unique.size !== pattern.length) {
            return { isValid: false, message: 'Pattern cannot have duplicate points' };
        }
        
        return { isValid: true, message: 'Valid pattern' };
    },

    /**
     * Checks if a string represents a valid pattern sequence
     * @param {string} value - String to check
     * @param {number} minPoints - Minimum required points
     * @param {number} maxPoints - Maximum allowed points
     * @param {number} gridSize - Grid size
     * @returns {boolean} True if string is a valid pattern
     */
    isPatternSequence(value, minPoints = 4, maxPoints = 9, gridSize = 3) {
        if (!value || typeof value !== 'string') return false;
        
        const parts = value.split(',');
        if (parts.length < minPoints || parts.length > maxPoints) return false;
        
        const pattern = parts.map(part => {
            const num = parseInt(part.trim());
            return isNaN(num) ? -1 : num;
        });
        
        return this.isValidPattern(pattern, minPoints, maxPoints, gridSize).isValid;
    },

    /**
     * Converts pattern array to string representation
     * @param {number[]} pattern - Pattern array
     * @returns {string} Comma-separated string
     */
    patternToString(pattern) {
        if (!Array.isArray(pattern)) return '';
        return pattern.join(',');
    },

    /**
     * Converts string to pattern array
     * @param {string} str - Comma-separated string
     * @returns {number[]} Pattern array
     */
    stringToPattern(str) {
        if (!str || typeof str !== 'string') return [];
        return str.split(',')
            .map(s => parseInt(s.trim()))
            .filter(n => !isNaN(n));
    },

    /**
     * Calculates pattern complexity score
     * @param {number[]} pattern - Pattern array
     * @param {number} gridSize - Grid size
     * @returns {Object} Complexity analysis
     */
    calculateComplexity(pattern, gridSize = 3) {
        if (!Array.isArray(pattern) || pattern.length < 2) {
            return { score: 0, level: 'invalid', factors: [] };
        }

        let score = 0;
        const factors = [];

        // Length factor (more points = higher complexity)
        const lengthScore = Math.min(pattern.length - 2, 6) * 10;
        score += lengthScore;
        if (lengthScore > 0) factors.push(`Length: +${lengthScore}`);

        // Direction changes (zigzag patterns are more complex)
        let directionChanges = 0;
        for (let i = 2; i < pattern.length; i++) {
            const prev = this.indexToCoord(pattern[i - 2], gridSize);
            const curr = this.indexToCoord(pattern[i - 1], gridSize);
            const next = this.indexToCoord(pattern[i], gridSize);

            const prevDir = { x: curr.x - prev.x, y: curr.y - prev.y };
            const currDir = { x: next.x - curr.x, y: next.y - curr.y };

            // Check if direction changed
            if (prevDir.x !== currDir.x || prevDir.y !== currDir.y) {
                directionChanges++;
            }
        }
        const directionScore = directionChanges * 5;
        score += directionScore;
        if (directionScore > 0) factors.push(`Direction changes: +${directionScore}`);

        // Cross-pattern bonus (lines that cross over previous ones)
        const crossings = this.countLineCrossings(pattern, gridSize);
        const crossingScore = crossings * 15;
        score += crossingScore;
        if (crossingScore > 0) factors.push(`Line crossings: +${crossingScore}`);

        // Corner usage bonus
        const corners = [0, gridSize - 1, gridSize * (gridSize - 1), gridSize * gridSize - 1];
        const cornerCount = pattern.filter(p => corners.includes(p)).length;
        const cornerScore = cornerCount * 8;
        score += cornerScore;
        if (cornerScore > 0) factors.push(`Corner usage: +${cornerScore}`);

        // Determine complexity level
        let level = 'very-weak';
        if (score >= 80) level = 'very-strong';
        else if (score >= 60) level = 'strong';
        else if (score >= 40) level = 'medium';
        else if (score >= 20) level = 'weak';

        return { score, level, factors };
    },

    /**
     * Converts grid index to x,y coordinates
     * @param {number} index - Grid index
     * @param {number} gridSize - Grid size
     * @returns {Object} Coordinates {x, y}
     */
    indexToCoord(index, gridSize = 3) {
        return {
            x: index % gridSize,
            y: Math.floor(index / gridSize)
        };
    },

    /**
     * Converts x,y coordinates to grid index
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {number} gridSize - Grid size
     * @returns {number} Grid index
     */
    coordToIndex(x, y, gridSize = 3) {
        return y * gridSize + x;
    },

    /**
     * Counts line crossings in a pattern
     * @param {number[]} pattern - Pattern array
     * @param {number} gridSize - Grid size
     * @returns {number} Number of crossings
     */
    countLineCrossings(pattern, gridSize = 3) {
        if (pattern.length < 4) return 0;

        const lines = [];
        for (let i = 1; i < pattern.length; i++) {
            const start = this.indexToCoord(pattern[i - 1], gridSize);
            const end = this.indexToCoord(pattern[i], gridSize);
            lines.push({ start, end });
        }

        let crossings = 0;
        for (let i = 0; i < lines.length - 2; i++) {
            for (let j = i + 2; j < lines.length; j++) {
                if (this.linesIntersect(lines[i], lines[j])) {
                    crossings++;
                }
            }
        }

        return crossings;
    },

    /**
     * Checks if two lines intersect
     * @param {Object} line1 - First line {start: {x, y}, end: {x, y}}
     * @param {Object} line2 - Second line {start: {x, y}, end: {x, y}}
     * @returns {boolean} True if lines intersect
     */
    linesIntersect(line1, line2) {
        const { start: p1, end: q1 } = line1;
        const { start: p2, end: q2 } = line2;

        const orientation = (p, q, r) => {
            const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
            if (val === 0) return 0;
            return val > 0 ? 1 : 2;
        };

        const onSegment = (p, q, r) => {
            return q.x <= Math.max(p.x, r.x) && q.x >= Math.min(p.x, r.x) &&
                   q.y <= Math.max(p.y, r.y) && q.y >= Math.min(p.y, r.y);
        };

        const o1 = orientation(p1, q1, p2);
        const o2 = orientation(p1, q1, q2);
        const o3 = orientation(p2, q2, p1);
        const o4 = orientation(p2, q2, q1);

        // General case
        if (o1 !== o2 && o3 !== o4) return true;

        // Special cases
        if (o1 === 0 && onSegment(p1, p2, q1)) return true;
        if (o2 === 0 && onSegment(p1, q2, q1)) return true;
        if (o3 === 0 && onSegment(p2, p1, q2)) return true;
        if (o4 === 0 && onSegment(p2, q1, q2)) return true;

        return false;
    },

    /**
     * Generates a random valid pattern
     * @param {number} minPoints - Minimum points
     * @param {number} maxPoints - Maximum points
     * @param {number} gridSize - Grid size
     * @returns {number[]} Random pattern
     */
    generateRandomPattern(minPoints = 4, maxPoints = 9, gridSize = 3) {
        const totalDots = gridSize * gridSize;
        const targetLength = Math.floor(Math.random() * (maxPoints - minPoints + 1)) + minPoints;
        
        const pattern = [];
        const available = Array.from({ length: totalDots }, (_, i) => i);
        
        // Start with random dot
        let currentIndex = Math.floor(Math.random() * available.length);
        pattern.push(available.splice(currentIndex, 1)[0]);
        
        // Add remaining points
        for (let i = 1; i < targetLength && available.length > 0; i++) {
            currentIndex = Math.floor(Math.random() * available.length);
            pattern.push(available.splice(currentIndex, 1)[0]);
        }
        
        return pattern;
    }
};