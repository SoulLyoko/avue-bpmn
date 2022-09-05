import type { ModelerState } from "~/types";

import { inject } from "vue-demi";

export function useInject() {
  return inject<ModelerState>("modelerState")!;
}
