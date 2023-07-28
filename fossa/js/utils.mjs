// Utility function to check if an item is an object
export function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

// // Deep merge function
// export function deepMerge(target, ...sources) {
//   if (!sources.length) return target;
//   const source = sources.shift();

//   if (isObject(target) && isObject(source)) {
//     for (const key in source) {
//       if (isObject(source[key])) {
//         if (!target[key]) Object.assign(target, { [key]: {} });
//         deepMerge(target[key], source[key]);
//       } else {
//         Object.assign(target, { [key]: source[key] });
//       }
//     }
//   }

//   return deepMerge(target, ...sources);
// }

// Deep merge function
export function deepMerge(defaults, target) {
  function isObject(item) {
    return item && typeof item === "object" && !Array.isArray(item);
  }

  if (!isObject(defaults) || !isObject(target)) {
    throw new Error(
      "deepMerge function requires both parameters to be objects"
    );
  }

  for (const key in defaults) {
    if (isObject(defaults[key])) {
      if (!target[key]) Object.assign(target, { [key]: {} });
      deepMerge(defaults[key], target[key]);
    } else {
      if (!target.hasOwnProperty(key)) {
        Object.defineProperty(target, key, {
          enumerable: true,
          writable: true,
          configurable: true,
          value: defaults[key],
        });
      }
    }
  }

  return target;
}
