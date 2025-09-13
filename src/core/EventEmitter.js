/**
 * EventEmitter Class
 * Simple event system for the Pattern Drawer library
 */

export class EventEmitter {
    constructor() {
        this.events = {};
    }

    /**
     * Subscribe to an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {EventEmitter} Returns this for chaining
     */
    on(event, callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        if (!this.events[event]) {
            this.events[event] = [];
        }

        this.events[event].push(callback);
        return this;
    }

    /**
     * Subscribe to an event once (automatically unsubscribes after first trigger)
     * @param {string} event - Event name
     * @param {Function} callback - Callback function
     * @returns {EventEmitter} Returns this for chaining
     */
    once(event, callback) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);
            callback.apply(this, args);
        };

        return this.on(event, onceWrapper);
    }

    /**
     * Unsubscribe from an event
     * @param {string} event - Event name
     * @param {Function} callback - Callback function to remove (optional)
     * @returns {EventEmitter} Returns this for chaining
     */
    off(event, callback) {
        if (!this.events[event]) {
            return this;
        }

        if (!callback) {
            // Remove all listeners for this event
            delete this.events[event];
            return this;
        }

        const index = this.events[event].indexOf(callback);
        if (index > -1) {
            this.events[event].splice(index, 1);
            
            // Clean up empty event arrays
            if (this.events[event].length === 0) {
                delete this.events[event];
            }
        }

        return this;
    }

    /**
     * Emit an event to all subscribers
     * @param {string} event - Event name
     * @param {...any} args - Arguments to pass to callbacks
     * @returns {EventEmitter} Returns this for chaining
     */
    emit(event, ...args) {
        if (!this.events[event]) {
            return this;
        }

        // Create a copy of the array to prevent issues if listeners are modified during emission
        const listeners = [...this.events[event]];
        
        listeners.forEach(callback => {
            try {
                callback.apply(this, args);
            } catch (error) {
                console.error(`Error in event listener for "${event}":`, error);
            }
        });

        return this;
    }

    /**
     * Get all event names that have listeners
     * @returns {string[]} Array of event names
     */
    eventNames() {
        return Object.keys(this.events);
    }

    /**
     * Get the number of listeners for an event
     * @param {string} event - Event name
     * @returns {number} Number of listeners
     */
    listenerCount(event) {
        return this.events[event] ? this.events[event].length : 0;
    }

    /**
     * Get all listeners for an event
     * @param {string} event - Event name
     * @returns {Function[]} Array of listener functions
     */
    listeners(event) {
        return this.events[event] ? [...this.events[event]] : [];
    }

    /**
     * Remove all listeners for all events
     * @returns {EventEmitter} Returns this for chaining
     */
    removeAllListeners() {
        this.events = {};
        return this;
    }

    /**
     * Check if there are any listeners for an event
     * @param {string} event - Event name
     * @returns {boolean} True if there are listeners
     */
    hasListeners(event) {
        return this.listenerCount(event) > 0;
    }
}