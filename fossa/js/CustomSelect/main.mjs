import { CustomSelect } from "./CustomSelect.mjs";
import Flags from "./modules/Flags.mjs";
import Search from "./modules/Search.mjs";

let select = new CustomSelect({
  init: false,
  modules: [Flags, Search],
});
select.init();
