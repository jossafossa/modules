export default function BaseSelect({ settings, emit, on, addFilter, filter }) {
  const getRoot = (select) => {
    let root = document.createElement("div");
    root.classList.add(settings.classes.root);
    let header = getHeader(select);
    let options = getOptions(select);

    root.append(header, options);
    return root;
  };

  const getActiveOptionData = (select) => {
    let optionElement = select.options[select.selectedIndex];
    let option = getOptionData(optionElement);
    return option;
  };

  const getOptionData = (option) => {
    let { value, text, selected, disabled } = option;
    return filter(
      "select:option:data",
      {
        value,
        text,
        selected,
        disabled,
      },
      { option }
    );
  };

  const getOptionsData = (select) => {
    let options = [];
    for (let option of select.options) {
      options.push(getOptionData(option));
    }
    return options;
  };

  const getHeader = (select) => {
    // get active option
    let activeOptionData = getActiveOptionData(select);

    // title
    let button = filter(
      "select:header:button",
      getOptionButton(activeOptionData),
      {
        activeOptionData,
      }
    );

    // watch for changes
    on("select:change", () => {
      let activeOptionData = getActiveOptionData(select);
      button.remove();
      button = filter(
        "select:header:button",
        getOptionButton(activeOptionData),
        {
          activeOptionData,
        }
      );
      header.append(button);
    });

    // header
    let header = document.createElement("header");
    header.append(button);

    return filter("select:header", header, { activeOptionData });
  };

  const getOptionButton = (optionData) => {
    let { value, text } = optionData;
    // button
    let button = document.createElement("button");
    button.value = value;
    button.innerHTML = text;
    button.classList.add(settings.classes.option);
    return button;
  };

  const getOption = (optionData) => {
    let { value, text, selected, disabled } = optionData;

    // create button
    let button = getOptionButton(optionData);

    button.addEventListener("click", () => {
      if (disabled) return;
      emit("select:change", { value });
    });

    // add button to li
    let li = document.createElement("li");
    li.append(button);
    if (selected) {
      li.classList.add(settings.classes.optionSelected);
    }
    if (disabled) {
      li.classList.add(settings.classes.optionDisabled);
    }
    return li;
  };

  const getOptions = (select) => {
    let optionElements = [];
    let optionsData = filter("select:options", getOptionsData(select));
    for (let optionData of optionsData) {
      optionElements.push(
        filter("select:option", getOption(optionData), { optionData })
      );
    }

    // get options
    let optionsElement = document.createElement("ul");
    optionsElement.classList.add(settings.classes.options);
    optionsElement.append(...optionElements);

    // wrap inside section
    let section = document.createElement("section");
    section.append(optionsElement);

    return filter("select:options", section);
  };

  let selectRoot = null;
  on(["select:create", "select:update"], ({ select }) => {
    if (selectRoot) selectRoot.remove();
    selectRoot = filter("select:root", getRoot(select));
    select.parentNode.insertBefore(selectRoot, select.nextSibling);
  });
}
