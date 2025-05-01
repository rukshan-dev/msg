import { ImpactMode } from "../types";

export const isPathImpacted = (
  changedPath: (string | symbol)[],
  selectedPath: (string | symbol)[],
  mode: ImpactMode = ImpactMode.Nested
) => {
  if (mode === ImpactMode.Strict) {
    if (changedPath.length !== selectedPath.length) {
      return false;
    }
    return changedPath.join(".") === selectedPath.join(".");
  }

  if (changedPath.length < selectedPath.length) {
    return false;
  }
  for (let i = 0; i < selectedPath.length; i++) {
    if (selectedPath[i] !== changedPath[i]) {
      return false;
    }
  }
  return true;
};

export default isPathImpacted;
