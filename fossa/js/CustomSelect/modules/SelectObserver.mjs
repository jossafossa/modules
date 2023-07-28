export default function SelectObserver({ settings, emit, on }) {
  on("select:ready", () => {
    emit("observe", { root: document.body });
  });

  // find the select elements (querySelector, closest or matches)
  const find = (root) => {
    if (!(root instanceof HTMLElement)) return [];

    let selectorResults = root.querySelectorAll("select");
    let closestResult = root.closest("select") ? [root.closest("select")] : [];

    return [...selectorResults, ...closestResult];
  };

  const observe = (root) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        // added
        mutation.addedNodes.forEach((node) => {
          let selects = find(node);

          for (let select of selects) {
            if (!select.customSelect) {
              emit("select:create", { select });
            } else {
              emit("select:update", { select });
            }
          }
        });
      });
    });

    observer.observe(root, {
      attributes: true,
      childList: true,
      subtree: true,
    });
  };
  on("observe", ({ root }) => observe(root));
}
