import { ModuleBase } from "../classes/ModuleBase.mjs";
import { deepMerge } from "../utils.mjs";
import SelectBase from "./modules/SelectBase.mjs";
import SelectObserver from "./modules/SelectObserver.mjs";
import SelectBootstrapper from "./modules/SelectBootstrapper.mjs";
import SelectEvents from "./modules/SelectEvents.mjs";

export class CustomSelect extends ModuleBase {
  constructor(options = {}) {
    const mustHaveModules = [
      SelectEvents,
      SelectBase,
      SelectBootstrapper,
      SelectObserver,
    ];

    const defaultSettings = {
      modules: [],
      querySelector: "select",
      init: true,
      classes: {
        root: "custom-select",
        header: "custom-select-header",
        options: "custom-select-options",
        option: "custom-select-option",
        optionSelected: "custom-select-option-selected",
      },
    };

    // merge default settings with options
    deepMerge(defaultSettings, options);

    const modules = [...mustHaveModules, ...options.modules];

    super(modules, options);

    if (options.init) {
      this.init();
    }
  }

  init() {
    this.emit("select:ready");
  }
}
