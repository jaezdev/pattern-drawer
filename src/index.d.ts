/**
 * Type definitions for Pattern Drawer Library
 * @version 1.0.0
 */

export interface PatternDrawerConfig {
  minPoints?: number;
  maxPoints?: number;
  gridSize?: number;
  dotSize?: number;
  lineWidth?: number;
  theme?: 'dark' | 'light' | 'blue' | 'green' | string;
  size?: 'small' | 'medium' | 'large';
  showComplexity?: boolean;
  showInfo?: boolean;
  animations?: boolean;
  allowRedraw?: boolean;
}

export interface PatternData {
  pattern: number[];
  patternString: string;
  complexity: ComplexityResult;
  timestamp: number;
}

export interface ComplexityResult {
  level: 'very-weak' | 'weak' | 'medium' | 'strong' | 'very-strong';
  score: number;
  factors: {
    length: number;
    uniqueness: number;
    crossings: number;
    symmetry: number;
  };
}

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export declare class EventEmitter {
  constructor();
  on(event: string, callback: Function): EventEmitter;
  off(event: string, callback?: Function): EventEmitter;
  emit(event: string, ...args: any[]): boolean;
  once(event: string, callback: Function): EventEmitter;
}

export declare class PatternDrawer extends EventEmitter {
  constructor(container: string | HTMLElement, options?: PatternDrawerConfig);
  
  // Properties
  readonly pattern: number[];
  readonly mode: 'draw' | 'view';
  readonly disabled: boolean;
  readonly config: PatternDrawerConfig;
  
  // Methods
  clearPattern(): void;
  loadPattern(pattern: number[]): void;
  setPattern(patternString: string): void;
  setMode(mode: 'draw' | 'view'): void;
  setDisabled(disabled: boolean): void;
  setTheme(theme: string): void;
  setSize(size: string): void;
  refresh(): void;
  destroy(): void;
  
  // Getters
  getPattern(): number[];
  getPatternString(): string;
  isPatternValid(): boolean;
  
  // Events
  on(event: 'patternStart', callback: () => void): this;
  on(event: 'patternProgress', callback: (data: { pattern: number[] }) => void): this;
  on(event: 'patternComplete', callback: (data: PatternData) => void): this;
  on(event: 'patternClear', callback: () => void): this;
  on(event: 'patternError', callback: (error: { message: string }) => void): this;
  on(event: string, callback: Function): this;
}

export declare namespace PatternUtils {
  function isValidPattern(pattern: number[], minPoints?: number, maxPoints?: number, gridSize?: number): ValidationResult;
  function stringToPattern(patternString: string): number[];
  function patternToString(pattern: number[]): string;
  function calculateComplexity(pattern: number[], gridSize?: number): ComplexityResult;
  function generateRandomPattern(minPoints?: number, maxPoints?: number, gridSize?: number): number[];
  function isPatternSequence(patternString: string, minPoints?: number, maxPoints?: number, gridSize?: number): boolean;
}

export declare const THEMES: {
  readonly DARK: 'dark';
  readonly LIGHT: 'light';
  readonly BLUE: 'blue';
  readonly GREEN: 'green';
};

export declare const SIZES: {
  readonly SMALL: 'small';
  readonly MEDIUM: 'medium';
  readonly LARGE: 'large';
};

export declare const GRID_SIZES: {
  readonly SMALL: 3;
  readonly MEDIUM: 4;
  readonly LARGE: 5;
};

export declare const PRESETS: {
  readonly MOBILE_LOCK: PatternDrawerConfig;
  readonly SECURITY: PatternDrawerConfig;
  readonly GAMING: PatternDrawerConfig;
  readonly SIMPLE: PatternDrawerConfig;
};

export declare function createPatternDrawer(
  container: string | HTMLElement,
  preset?: string | PatternDrawerConfig,
  overrides?: PatternDrawerConfig
): PatternDrawer;

export { PatternDrawer as default };