import { mount } from "@vue/test-utils";

import { BpmnModeler } from "..";

describe("VButton", () => {
  it("mount", () => {
    const wrapper = mount(BpmnModeler);
    expect(wrapper.classes()).toContain("bpmn-modeler");
  });
});
