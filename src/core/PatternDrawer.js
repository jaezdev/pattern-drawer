/**
 * Pattern Drawer Library
 * A configurable, themeable pattern drawing component with event system
 */

import { EventEmitter } from './EventEmitter.js';
import { PatternUtils } from '../utils/index.js';

export class PatternDrawer extends EventEmitter {
    constructor(container, options = {}) {
        super();
        
        // Default configuration
        this.config = {
            minPoints: 4,
            maxPoints: 9,
            gridSize: 3,
            dotSize: 60,
            lineWidth: 3,
            theme: 'dark',
            size: 'medium', // small, medium, large
            showComplexity: false,
            showInfo: false,
            animations: true,
            allowRedraw: true,
            ...options
        };

        // State
        this.pattern = [];
        this.isDrawing = false;
        this.mode = 'draw'; // 'draw' or 'view'
        this.disabled = false;
        this.dotPositions = [];

        // DOM elements
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        if (!this.container) {
            throw new Error('Container element not found');
        }

        // Canvas and dots
        this.canvas = null;
        this.ctx = null;
        this.dots = [];

        // Initialize
        this.init();
    }

    /**
     * Initialize the pattern drawer
     */
    init() {
        this.createHTML();
        this.setupCanvas();
        this.setupEventListeners();
        this.applyTheme();
        this.calculateDotPositions();
        
        this.emit('ready', this);
    }

    /**
     * Create the HTML structure
     */
    createHTML() {
        const gridClass = this.config.gridSize === 4 ? 'pattern-drawer__grid--4x4' : 
                         this.config.gridSize === 5 ? 'pattern-drawer__grid--5x5' : '';
        
        const sizeClass = `pattern-drawer--${this.config.size}`;
        
        this.container.innerHTML = `
            <div class="pattern-drawer pattern-drawer--${this.config.theme} ${sizeClass}">
                <div class="pattern-drawer__grid ${gridClass}" data-grid>
                    <canvas class="pattern-drawer__canvas" data-canvas></canvas>
                    ${this.createDotsHTML()}
                </div>
                ${this.config.showComplexity ? '<div class="pattern-drawer__complexity" data-complexity></div>' : ''}
                ${this.config.showInfo ? this.createInfoHTML() : ''}
            </div>
        `;

        // Cache DOM references
        this.canvas = this.container.querySelector('[data-canvas]');
        this.ctx = this.canvas.getContext('2d');
        this.dots = this.container.querySelectorAll('[data-dot]');
        this.grid = this.container.querySelector('[data-grid]');
        this.complexityEl = this.container.querySelector('[data-complexity]');
        this.infoEl = this.container.querySelector('[data-info]');
    }

    /**
     * Create HTML for dots
     */
    createDotsHTML() {
        const totalDots = this.config.gridSize * this.config.gridSize;
        let html = '';
        
        for (let i = 0; i < totalDots; i++) {
            html += `<div class="pattern-drawer__dot" data-dot data-index="${i}" tabindex="0" role="button" aria-label="Pattern dot ${i + 1}"></div>`;
        }
        
        return html;
    }

    /**
     * Create HTML for pattern info
     */
    createInfoHTML() {
        return `
            <div class="pattern-drawer__info" data-info style="display: none;">
                <div class="pattern-drawer__info-row">
                    <span class="pattern-drawer__info-label">Pattern:</span>
                    <span class="pattern-drawer__info-value" data-pattern-sequence></span>
                </div>
                <div class="pattern-drawer__info-row">
                    <span class="pattern-drawer__info-label">Length:</span>
                    <span class="pattern-drawer__info-value"><span data-pattern-length></span> points</span>
                </div>
            </div>
        `;
    }

    /**
     * Setup canvas dimensions and properties
     */
    setupCanvas() {
        if (!this.canvas) return;
        
        const rect = this.grid.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        this.canvas.width = rect.width * dpr;
        this.canvas.height = rect.height * dpr;
        this.canvas.style.width = rect.width + 'px';
        this.canvas.style.height = rect.height + 'px';
        
        this.ctx.scale(dpr, dpr);
    }

    /**
     * Refresh canvas and redraw pattern if exists
     */
    refreshCanvas() {
        this.setupCanvas();
        this.calculateDotPositions();
        if (this.pattern.length > 0) {
            // Use requestAnimationFrame to ensure layout is complete
            requestAnimationFrame(() => {
                this.drawLines();
            });
        }
    }

    /**
     * Force redraw of the current pattern (useful for troubleshooting)
     */
    forceRedraw() {
        if (this.pattern.length > 0) {
            this.refreshCanvas();
            
            // Additional attempt with delay for stubborn cases
            setTimeout(() => {
                if (this.pattern.length > 0) {
                    this.calculateDotPositions();
                    this.drawLines();
                }
            }, 100);
        }
    }

    /**
     * Calculate dot positions relative to canvas
     */
    calculateDotPositions() {
        if (!this.grid || !this.canvas) return;
        
        this.dotPositions = [];
        const gridRect = this.grid.getBoundingClientRect();
        const canvasRect = this.canvas.getBoundingClientRect();
        
        this.dots.forEach((dot, index) => {
            const rect = dot.getBoundingClientRect();
            
            // Calculate position relative to the canvas display size with high precision
            // Use Math.round to ensure pixel-perfect alignment
            const x = Math.round((rect.left - canvasRect.left) + (rect.width / 2));
            const y = Math.round((rect.top - canvasRect.top) + (rect.height / 2));
            
            this.dotPositions[index] = { x, y };
        });
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Dot interactions
        this.dots.forEach((dot, index) => {
            // Mouse events
            dot.addEventListener('mousedown', (e) => this.handleStart(e, index));
            dot.addEventListener('mouseenter', (e) => this.handleMove(e, index));
            
            // Touch events
            dot.addEventListener('touchstart', (e) => {
                e.preventDefault();
                this.handleStart(e, index);
            });
            
            dot.addEventListener('touchmove', (e) => {
                e.preventDefault();
                const touch = e.touches[0];
                const element = document.elementFromPoint(touch.clientX, touch.clientY);
                if (element && element.dataset.dot !== undefined) {
                    const touchIndex = parseInt(element.dataset.index);
                    this.handleMove(e, touchIndex);
                }
            });

            // Keyboard events
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleKeySelection(index);
                }
            });
        });

        // Global events
        document.addEventListener('mouseup', () => this.handleEnd());
        document.addEventListener('touchend', () => this.handleEnd());
        
        // Window resize
        window.addEventListener('resize', () => {
            this.refreshCanvas();
        });
    }

    /**
     * Handle pattern start (first dot selection)
     */
    handleStart(e, index) {
        if (this.disabled || this.mode === 'view') return;
        
        e.preventDefault();
        this.isDrawing = true;
        this.clearCanvas();
        this.resetDots();
        this.pattern = [index];
        
        this.setDotState(index, 'active');
        this.emit('patternStart', { index, pattern: [...this.pattern] });
    }

    /**
     * Handle pattern continuation (additional dots)
     */
    handleMove(e, index) {
        if (this.disabled || !this.isDrawing || this.pattern.includes(index)) return;
        
        this.pattern.push(index);
        this.setDotState(index, 'active');
        this.drawLines();
        
        this.emit('patternChange', { index, pattern: [...this.pattern] });
    }

    /**
     * Handle pattern completion
     */
    handleEnd() {
        if (this.disabled || !this.isDrawing) return;
        
        this.isDrawing = false;
        
        // Update dot states
        this.dots.forEach((dot, index) => {
            if (this.pattern.includes(index)) {
                this.setDotState(index, 'selected');
            }
        });

        // Validate pattern
        const validation = PatternUtils.isValidPattern(
            this.pattern, 
            this.config.minPoints, 
            this.config.maxPoints, 
            this.config.gridSize
        );

        if (!validation.isValid) {
            this.emit('patternError', { 
                pattern: [...this.pattern], 
                error: validation.message 
            });
            
            if (this.config.allowRedraw) {
                setTimeout(() => this.clear(), 2000);
            }
            return;
        }

        // Update complexity if enabled
        if (this.config.showComplexity) {
            this.updateComplexity();
        }

        this.emit('patternComplete', { 
            pattern: [...this.pattern],
            complexity: PatternUtils.calculateComplexity(this.pattern, this.config.gridSize)
        });
    }

    /**
     * Handle keyboard selection for accessibility
     */
    handleKeySelection(index) {
        if (this.disabled || this.mode === 'view') return;
        
        if (!this.isDrawing) {
            this.handleStart({ preventDefault: () => {} }, index);
        } else if (!this.pattern.includes(index)) {
            this.handleMove({ preventDefault: () => {} }, index);
        }
    }

    /**
     * Set dot visual state
     */
    setDotState(index, state) {
        const dot = this.dots[index];
        if (!dot) return;
        
        // Remove all state classes
        dot.classList.remove('pattern-drawer__dot--active', 'pattern-drawer__dot--selected');
        
        // Add new state
        if (state === 'active') {
            dot.classList.add('pattern-drawer__dot--active');
            if (this.config.animations) {
                dot.classList.add('pattern-drawer__dot--animated');
                setTimeout(() => dot.classList.remove('pattern-drawer__dot--animated'), 
                         this.config.animations === true ? 200 : this.config.animations);
            }
        } else if (state === 'selected') {
            dot.classList.add('pattern-drawer__dot--selected');
        }
    }

    /**
     * Draw connecting lines between pattern points
     */
    drawLines() {
        if (!this.ctx || this.pattern.length < 2) return;
        
        this.clearCanvas();
        
        // Always recalculate positions before drawing to ensure accuracy
        this.calculateDotPositions();
        
        // Verify positions are valid
        if (!this.validatePositions()) {
            console.warn('Invalid dot positions detected');
            return;
        }

        const lineColor = getComputedStyle(this.container).getPropertyValue('--pattern-drawer-line-color').trim();
        const shadowColor = getComputedStyle(this.container).getPropertyValue('--pattern-drawer-line-shadow').trim();

        // Setup line style
        this.ctx.strokeStyle = lineColor || '#ffffff';
        this.ctx.lineWidth = this.config.lineWidth;
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.shadowColor = shadowColor || 'rgba(255, 255, 255, 0.3)';
        this.ctx.shadowBlur = 5;

        // Draw connecting lines
        this.ctx.beginPath();
        const firstPos = this.dotPositions[this.pattern[0]];
        if (firstPos) {
            this.ctx.moveTo(firstPos.x, firstPos.y);

            for (let i = 1; i < this.pattern.length; i++) {
                const pos = this.dotPositions[this.pattern[i]];
                if (pos) {
                    this.ctx.lineTo(pos.x, pos.y);
                }
            }
            
            this.ctx.stroke();

            // Draw connection points (dots at intersections)
            this.ctx.shadowBlur = 0;
            this.ctx.fillStyle = lineColor || '#ffffff';
            
            this.pattern.forEach(index => {
                const pos = this.dotPositions[index];
                if (pos) {
                    this.ctx.beginPath();
                    this.ctx.arc(pos.x, pos.y, 4, 0, 2 * Math.PI);
                    this.ctx.fill();
                }
            });

            // Debug: Draw small red dots at calculated centers (remove this in production)
            if (this.config.debug) {
                this.ctx.fillStyle = '#ff0000';
                this.pattern.forEach(index => {
                    const pos = this.dotPositions[index];
                    if (pos) {
                        this.ctx.beginPath();
                        this.ctx.arc(pos.x, pos.y, 2, 0, 2 * Math.PI);
                        this.ctx.fill();
                    }
                });
            }
        }
    }

    /**
     * Validate that dot positions are calculated
     */
    validatePositions() {
        if (!this.dotPositions || this.dotPositions.length === 0) return false;
        
        return this.dotPositions.every(pos => 
            pos && 
            typeof pos.x === 'number' && 
            typeof pos.y === 'number' && 
            pos.x >= 0 && 
            pos.y >= 0 &&
            !isNaN(pos.x) && 
            !isNaN(pos.y)
        );
    }

    /**
     * Clear canvas
     */
    clearCanvas() {
        if (this.ctx && this.canvas) {
            // Clear using the display size, not the internal buffer size
            const rect = this.canvas.getBoundingClientRect();
            this.ctx.clearRect(0, 0, rect.width, rect.height);
        }
    }

    /**
     * Reset all dots to default state
     */
    resetDots() {
        this.dots.forEach(dot => {
            dot.classList.remove('pattern-drawer__dot--active', 'pattern-drawer__dot--selected');
        });
    }

    /**
     * Update complexity display
     */
    updateComplexity() {
        if (!this.complexityEl) return;
        
        const complexity = PatternUtils.calculateComplexity(this.pattern, this.config.gridSize);
        this.complexityEl.textContent = `Complexity: ${complexity.level} (${complexity.score})`;
        this.complexityEl.className = `pattern-drawer__complexity pattern-drawer__complexity--${complexity.level}`;
    }

    /**
     * Update info display
     */
    updateInfo() {
        if (!this.infoEl) return;
        
        const sequenceEl = this.infoEl.querySelector('[data-pattern-sequence]');
        const lengthEl = this.infoEl.querySelector('[data-pattern-length]');
        
        if (sequenceEl) sequenceEl.textContent = this.pattern.join(',');
        if (lengthEl) lengthEl.textContent = this.pattern.length;
        
        this.infoEl.style.display = this.pattern.length > 0 ? 'block' : 'none';
    }

    /**
     * Apply theme
     */
    applyTheme() {
        const drawer = this.container.querySelector('.pattern-drawer');
        if (!drawer) return;
        
        // Remove existing theme classes
        drawer.classList.remove('pattern-drawer--dark', 'pattern-drawer--light', 'pattern-drawer--blue', 'pattern-drawer--green');
        
        // Add new theme class
        drawer.classList.add(`pattern-drawer--${this.config.theme}`);
    }

    // PUBLIC API METHODS

    /**
     * Enable drawing mode
     */
    draw() {
        this.mode = 'draw';
        this.disabled = false;
        this.container.querySelector('.pattern-drawer').classList.remove('pattern-drawer--viewing', 'pattern-drawer--disabled');
        this.container.querySelector('.pattern-drawer').classList.add('pattern-drawer--drawing');
        this.clear();
        this.emit('modeChange', { mode: this.mode });
    }

    /**
     * Show pattern in view mode
     */
    view(pattern) {
        if (!pattern || !Array.isArray(pattern)) return;
        
        this.mode = 'view';
        this.disabled = true;
        
        const drawer = this.container.querySelector('.pattern-drawer');
        drawer.classList.remove('pattern-drawer--drawing', 'pattern-drawer--disabled');
        drawer.classList.add('pattern-drawer--viewing');
        
        // Use a slight delay for view mode to ensure proper modal rendering
        requestAnimationFrame(() => {
            this.loadPattern(pattern);
            this.emit('modeChange', { mode: this.mode, pattern: [...pattern] });
        });
    }

    /**
     * Load a pattern without enabling drawing
     */
    loadPattern(pattern) {
        if (!Array.isArray(pattern)) return;
        
        const validation = PatternUtils.isValidPattern(pattern, 1, this.config.maxPoints, this.config.gridSize);
        if (!validation.isValid) {
            this.emit('error', { error: validation.message });
            return;
        }

        this.clearCanvas();
        this.resetDots();
        this.pattern = [...pattern];
        
        // Update dot states
        this.pattern.forEach(index => {
            this.setDotState(index, 'selected');
        });
        
        // Draw with enhanced timing for better modal compatibility
        requestAnimationFrame(() => {
            this.refreshCanvas();
            
            // For view mode in modals, add an extra check to ensure lines are drawn
            if (this.mode === 'view') {
                setTimeout(() => {
                    // Verify pattern is still loaded and redraw if needed
                    if (this.pattern.length > 0 && this.validatePositions()) {
                        this.drawLines();
                    }
                }, 50);
            }
            
            if (this.config.showComplexity) this.updateComplexity();
            if (this.config.showInfo) this.updateInfo();
        });

        this.emit('patternLoaded', { pattern: [...this.pattern] });
    }

    /**
     * Clear current pattern
     */
    clear() {
        this.pattern = [];
        this.isDrawing = false;
        this.clearCanvas();
        this.resetDots();
        
        if (this.complexityEl) {
            this.complexityEl.textContent = '';
        }
        
        if (this.infoEl) {
            this.infoEl.style.display = 'none';
        }
        
        this.emit('patternClear');
    }

    /**
     * Get current pattern
     */
    getPattern() {
        return [...this.pattern];
    }

    /**
     * Set pattern programmatically
     */
    setPattern(pattern) {
        this.loadPattern(pattern);
    }

    /**
     * Enable/disable the drawer
     */
    setDisabled(disabled) {
        this.disabled = disabled;
        const drawer = this.container.querySelector('.pattern-drawer');
        
        if (disabled) {
            drawer.classList.add('pattern-drawer--disabled');
        } else {
            drawer.classList.remove('pattern-drawer--disabled');
        }
        
        this.emit('disabledChange', { disabled });
    }

    /**
     * Change theme
     */
    setTheme(theme) {
        this.config.theme = theme;
        this.applyTheme();
        
        // Redraw if pattern exists to update colors
        if (this.pattern.length > 0) {
            this.drawLines();
        }
        
        this.emit('themeChange', { theme });
    }

    /**
     * Update configuration
     */
    updateConfig(newConfig) {
        const oldConfig = { ...this.config };
        this.config = { ...this.config, ...newConfig };
        
        // Handle specific config changes
        if (newConfig.theme && newConfig.theme !== oldConfig.theme) {
            this.setTheme(newConfig.theme);
        }
        
        if (newConfig.gridSize && newConfig.gridSize !== oldConfig.gridSize) {
            this.init(); // Reinitialize with new grid size
        }
        
        this.emit('configChange', { oldConfig, newConfig: this.config });
    }

    /**
     * Get current configuration
     */
    getConfig() {
        return { ...this.config };
    }

    /**
     * Destroy the pattern drawer and clean up
     */
    destroy() {
        // Remove event listeners
        this.removeAllListeners();
        
        // Clear DOM
        if (this.container) {
            this.container.innerHTML = '';
        }
        
        // Clear references
        this.canvas = null;
        this.ctx = null;
        this.dots = [];
        this.container = null;
        
        this.emit('destroyed');
    }
}