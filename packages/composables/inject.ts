import type { BpmnState } from "~/types";

import { inject } from "vue-demi";

export function useInject() {
  return inject<BpmnState>("bpmnState")!;
}
