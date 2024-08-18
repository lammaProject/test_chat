const deepMerge = <T extends Record<string, any>>(target: T, source: T): T => {
  const result: T = { ...target };

  for (const key in source) {
    if (
      source[key] &&
      typeof source[key] === "object" &&
      !Array.isArray(source[key])
    ) {
      if (result[key] && typeof result[key] === "object") {
        result[key] = deepMerge(result[key] as any, source[key] as any);
      } else {
        result[key] = { ...(source[key] as any) };
      }
    } else {
      result[key] = source[key];
    }
  }

  return result;
};

export default deepMerge;
