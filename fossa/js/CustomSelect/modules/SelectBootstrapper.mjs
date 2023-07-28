export default function SelectBootstrapper({ settings, emit, on }) {
  on("select:ready", () => {
    let { querySelector } = settings;
    let root = document.querySelector(querySelector);

    on("select:init", (root) => {
      root.customSelect = true;
      emit("select:create", { select: root });
    });
    emit("select:init", root);
  });
}
