import { ref } from "vue-demi";
import { update as _update, set as _set, cloneDeep } from "lodash-unified";

import * as options from "~/defaults/options";

export type OptionsKey = keyof typeof options;
export function useOptions() {
  const cloneOptions = cloneDeep({ ...options });
  const defaultOptions = ref(cloneOptions.defaultOptions);
  const update = (
    updateObj: Record<
      `${OptionsKey}.${string}`,
      ((value: any) => any) | string | boolean | number | Array<any> | Object
    >
  ) => {
    Object.entries(updateObj).forEach(([key, value]) => {
      const [optionsKey, ...path] = key.split(".");
      if (value instanceof Function) {
        return _update(cloneOptions[optionsKey as OptionsKey], path, value as any);
      } else {
        return _set(cloneOptions[optionsKey as OptionsKey], path, value);
      }
    });
    defaultOptions.value = cloneOptions.defaultOptions;
  };
  return { options: defaultOptions, update };
}
