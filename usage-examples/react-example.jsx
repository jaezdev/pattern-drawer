// React Component Example
import React, { useEffect, useRef, useState } from 'react';
import { createPatternDrawer, PatternUtils, PRESETS, THEMES } from 'pattern-drawer';
import 'pattern-drawer/dist/pattern-drawer.css';

const PatternDrawerComponent = ({ 
    preset = 'MOBILE_LOCK', 
    theme = THEMES.DARK,
    onPatternChange,
    onPatternComplete 
}) => {
    const containerRef = useRef(null);
    const drawerRef = useRef(null);
    const [pattern, setPattern] = useState([]);
    const [complexity, setComplexity] = useState(null);

    useEffect(() => {
        if (containerRef.current && !drawerRef.current) {
            // Initialize pattern drawer
            drawerRef.current = createPatternDrawer(
                containerRef.current, 
                PRESETS[preset],
                { theme }
            );

            // Set up event listeners
            drawerRef.current.on('patternStart', () => {
                setPattern([]);
                setComplexity(null);
            });

            drawerRef.current.on('patternChange', (newPattern) => {
                setPattern(newPattern);
                if (onPatternChange) {
                    onPatternChange(newPattern);
                }
            });

            drawerRef.current.on('patternComplete', (completedPattern) => {
                const comp = PatternUtils.calculateComplexity(completedPattern);
                setComplexity(comp);
                
                if (onPatternComplete) {
                    onPatternComplete(completedPattern, comp);
                }
            });
        }

        // Cleanup
        return () => {
            if (drawerRef.current) {
                drawerRef.current.destroy();
                drawerRef.current = null;
            }
        };
    }, []);

    // Update theme when prop changes
    useEffect(() => {
        if (drawerRef.current) {
            drawerRef.current.setTheme(theme);
        }
    }, [theme]);

    const clearPattern = () => {
        if (drawerRef.current) {
            drawerRef.current.clear();
            setPattern([]);
            setComplexity(null);
        }
    };

    const getPatternString = () => {
        return pattern.length > 0 ? PatternUtils.patternToString(pattern) : '';
    };

    return (
        <div className="pattern-drawer-wrapper">
            <div ref={containerRef} className="pattern-container" />
            
            <div className="pattern-info">
                <div className="pattern-stats">
                    <p><strong>Points:</strong> {pattern.length}</p>
                    {complexity && (
                        <>
                            <p><strong>Complexity:</strong> {complexity.level}</p>
                            <p><strong>Score:</strong> {complexity.score}</p>
                        </>
                    )}
                    <p><strong>Pattern:</strong> {getPatternString() || 'None'}</p>
                </div>
                
                <button onClick={clearPattern} className="clear-button">
                    Clear Pattern
                </button>
            </div>
        </div>
    );
};

// Example usage in an App component
const App = () => {
    const [currentTheme, setCurrentTheme] = useState(THEMES.DARK);
    const [lastPattern, setLastPattern] = useState('');

    const handlePatternComplete = (pattern, complexity) => {
        const patternString = PatternUtils.patternToString(pattern);
        setLastPattern(patternString);
        
        console.log('Pattern completed:', {
            pattern: patternString,
            complexity: complexity.level,
            points: pattern.length
        });
    };

    const cycleTheme = () => {
        const themes = Object.values(THEMES);
        const currentIndex = themes.indexOf(currentTheme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        setCurrentTheme(nextTheme);
    };

    return (
        <div className="app">
            <header>
                <h1>Pattern Drawer React Example</h1>
                <div className="controls">
                    <button onClick={cycleTheme}>
                        Theme: {currentTheme}
                    </button>
                </div>
            </header>

            <main>
                <PatternDrawerComponent
                    preset="SECURITY"
                    theme={currentTheme}
                    onPatternComplete={handlePatternComplete}
                />
                
                {lastPattern && (
                    <div className="last-pattern">
                        <h3>Last Pattern: {lastPattern}</h3>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;