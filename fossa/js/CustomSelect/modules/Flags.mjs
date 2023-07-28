export default function Flags({ addFilter }) {
  /**
   * Convert a country code to an <img> element
   * @param {String} code The country code
   * @returns {HTMLImageElement} The <img> element
   */
  function getFlag(code) {
    let flag = document.createElement("img");
    flag.classList.add("flag");
    flag.src = `./svg/flags/${code}.svg`;
    return flag;
  }

  /**
   * Filters the option data
   * @param {Object} data The option data
   * @param {Object} option The option element
   * @returns {Object} The filtered option data
   */
  addFilter("select:option:data", (data, { option }) => {
    let flagCode = option.dataset?.flag || false;
    if (flagCode) data.flag = flagCode;
    return data;
  });

  /**
   * Add the flag to the header button
   */
  addFilter("select:header:button", (button, { activeOptionData }) => {
    let flagCode = activeOptionData.flag || false;
    if (!flagCode) return button;

    button.prepend(getFlag(flagCode));
    return button;
  });

  /**
   * Add the flag to the option button
   */
  addFilter("select:option", (optionElement, { optionData }) => {
    let flagCode = optionData.flag || false;
    if (!flagCode) return optionElement;

    // add flag to button
    let button = optionElement.querySelector("button");
    if (!button) return optionElement;

    button.prepend(getFlag(flagCode));
    return optionElement;
  });
}
