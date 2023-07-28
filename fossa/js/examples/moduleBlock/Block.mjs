import { ModuleBase } from "../../classes/ModuleBase.mjs";
import { deepMerge } from "../../utils.mjs";

export class Block extends ModuleBase {
  constructor(options = {}) {
    const defaultSettings = {
      modules: [],
    };

    // merge default settings with options
    deepMerge(defaultSettings, options);

    super(options.modules, options);

    this.on("block:loaded", () => this.loaded());
    this.emit("block:loaded");
  }

  getBlock() {
    let block = document.createElement("div");
    block.classList.add("block");
    return block;
  }

  loaded() {
    let block = this.getBlock();
    this.emit("block:element", { block });
    document.body.append(block);
  }
}

export function BlockFill({ settings, extendParams, on, trigger }) {
  extendParams({
    fill: {
      text: "hoi allemaal ",
      outer: "outer",
    },
  });

  let text = settings.fill.text;
  let index = 0;

  on("block:element", ({ block }) => {
    setInterval((e) => {
      block.innerHTML = `${text}${index}`;
      trigger("fill:update", { block });
      index++;
    }, 100);
  });
}

export function BlockFillMorpher({ settings, extendParams, on, off, trigger }) {
  extendParams({
    morpher: {
      suffix: "",
      prefix: "",
    },
  });

  let suffix = settings.morpher.suffix;

  const onUpdate = ({ block }) => {
    block.innerText = block.innerText.split("").reverse().join("") + suffix;
  };

  on("fill:update", onUpdate);

  setTimeout((e) => {
    off("fill:update", onUpdate);
  }, 2000);
}

export function BlockSwitcher({ settings, extendParams, on, trigger }) {
  extendParams({
    switcher: {
      colors: ["red", "green", "blue"],
    },
  });

  let colors = settings.switcher.colors;

  on("block:element", ({ block }) => {
    block.addEventListener("click", (e) => {
      let color = colors[Math.floor(Math.random() * colors.length)];
      block.style.backgroundColor = color;
    });

    on("block:color", ({ color }) => {
      block.style.backgroundColor = color;
    });
  });
}

// // deep merge test
// const defaultUser = {
//   information: {
//     name: "john",
//     age: 20,
//   },
//   phone: "123-456-7890",
//   extra: {
//     test: "test",
//   },
// };

// // Changes to the user object
// const userData = {
//   information: {
//     age: 30,
//   },
//   address: {
//     street: "main street",
//   },
//   id: {
//     number: 123,
//   },
// };

// // Merge the two objects
// deepMerge(defaultUser, userData);
