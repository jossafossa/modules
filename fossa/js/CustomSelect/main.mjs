import { CustomSelect } from "./CustomSelect.mjs";
import Flags from "./modules/Flags.mjs";

let select = new CustomSelect({
  init: false,
  modules: [Flags],
});
select.init();
