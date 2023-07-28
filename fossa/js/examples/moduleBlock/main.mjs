import { Block, BlockFill, BlockFillMorpher, BlockSwitcher } from "./Block.mjs";

new Block({
  modules: [BlockFill, BlockFillMorpher, BlockSwitcher],
  fill: {
    text: "hoi allemaal jongons ",
    extra: "extra",
  },
  morpher: {
    suffix: "!!",
  },
  switcher: {
    interval: 1000,
    colors: [
      "red",
      "green",
      "blue",
      "yellow",
      "purple",
      "orange",
      "grey",
      "white",
    ],
  },
});
