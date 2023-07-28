function TriggerEvent(elements, types, options = {}) {
  if (!Array.isArray(types)) types = [types];
  if (!Array.isArray(elements)) elements = [elements];
  for (let element of elements) {
    for (let type of types) {
      let event = new Event(type, options);
      event.custom = true;

      element.dispatchEvent(event);
    }
  }
}

export default function SelectEvents({ settings, emit, on }) {
  on("select:create", ({ select }) => {
    // trigger event
    on(["select:change", "select:input"], ({ value, custom }) => {
      if (custom) return;
      select.value = value;
      TriggerEvent(select, ["change", "input"]);
    });

    // watch for changes
    select.addEventListener("change", ({ target, custom }) => {
      if (custom) return;
      emit(["select:change", "select:input"], {
        value: target.value,
        custom: true,
      });
    });
  });
}
