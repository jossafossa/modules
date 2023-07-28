import { deepMerge } from "../utils.mjs";

/**
 * A base class to handle modules
 */
export class ModuleBase {
  events = {};
  filters = {};

  /**
   * Create an instance of ModuleBase
   * @param {Object} options a list of options
   */
  constructor(modules = {}, settings, modulePasthrough = {}) {
    this.modules = modules;
    this.settings = settings;
    this.modulePasthrough = modulePasthrough;

    this.initModules();
    this.emit("core:loaded");
  }

  initModules() {
    for (let module of this.modules) {
      module({
        instance: this,
        on: this.on.bind(this),
        off: this.off.bind(this),
        extendParams: this.extendParams.bind(this),
        emit: this.emit.bind(this),
        trigger: this.emit.bind(this),
        settings: this.settings,
        filter: this.filter.bind(this),
        addFilter: this.addFilter.bind(this),
        ...this.modulePasthrough,
      });
    }
  }

  /**
   * Add an event listener
   * @param {String|Array} event The event name(s)
   * @param {Function} callback The callback function
   * @returns {void}
   */
  on(events, callback, order = 10) {
    // make sure events is an array
    events = Array.isArray(events) ? events : [events];

    // loop through events and add callback
    for (let event of events) {
      this.events[event] ??= [];
      this.events[event][order] ??= [];
      this.events[event][order].push(callback);
    }
  }

  /**
   * Remove an event listener
   * @param {String|Array} event The event name(s)
   * @param {Function} callback The callback function
   * @returns {void}
   */
  off(events, callback) {
    // make sure events is an array
    events = Array.isArray(events) ? events : [events];

    // loop through events and remove callback
    for (let event of events) {
      let callbacks = this.events[event] ?? false;
      if (callbacks === false) continue;

      // loop through orders with callbacks and remove
      for (let order in callbacks) {
        let index = callbacks[order].indexOf(callback);
        if (index > -1) callbacks[order].splice(index, 1);
      }
    }
  }

  /**
   * Add a filter
   * @param {String} filter The filter name
   * @param {Function} callback The callback function
   * @param {Number} order The order of the callback function
   */
  addFilter(filter, callback, order = 10) {
    this.filters[filter] ??= [];
    this.filters[filter][order] ??= [];
    this.filters[filter][order].push(callback);
  }

  /**
   * Filter a value
   * @param {String} filter The filter name
   * @param {Any} value The value to filter
   */
  filter(filter, defaultValue, args) {
    if (!this.filters[filter]) return defaultValue;
    const callbacks = this.filters[filter];
    return callbacks
      .flat()
      .reduce((acc, callback) => callback(acc, args), defaultValue);
  }

  /**
   * Emit an event
   * @param {String|Array} event The event name
   * @param {Object} params The event parameters
   * @returns {void}
   */
  emit(events, params) {
    // make sure events is an array
    events = Array.isArray(events) ? events : [events];

    // loop through events and emit
    for (let event of events) {
      let callbacks = this.events[event] ?? false;
      if (callbacks === false) continue;
      callbacks.flat().forEach((callback) => callback(params));
    }
  }

  /**
   * Extend the default settings
   * @param {Object} defaults The default settings
   * @returns {void}
   */
  extendParams(defaults) {
    deepMerge(defaults, this.settings);
  }
}
