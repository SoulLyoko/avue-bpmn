<template>
  <BpmnModeler
    v-model="formData"
    :xml="processData.xml"
    :form-options="formOptions"
    prefix="flowable"
    @init="onInit"
    @input="onUpdateFormData"
    @update:model-value="onUpdateFormData"
    @update:xml="processData.xml = $event"
    @element-change="onElementChange"
  ></BpmnModeler>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue-demi";

import { BpmnModeler, defaultXml, useOptions } from "../packages";
import "../packages/styles/bpmn-modeler.scss";

export default defineComponent({
  name: "App",
  components: { BpmnModeler },
  setup() {
    const formData = ref<any>({});
    const processData = ref<any>({
      xml: defaultXml()
    });
    let modeler: any;
    function onInit(e: any) {
      modeler = e;
      console.log("🚀 ~ file: App.vue ~ line 38 ~ onInit ~ modeler", modeler);
    }
    let element: any;
    function onElementChange(ele: any) {
      element = ele;
    }
    function onUpdateFormData(val: any) {
      if (element?.type !== "bpmn:Process") return;
      processData.value = {
        ...processData.value,
        modelKey: val.id,
        name: val.name,
        categoryId: val.category,
        icon: val.icon,
        description: val.documentation
      };
    }

    const { options: formOptions, update } = useOptions();
    update({
      "assigneeColumn.0.value": [{ type: "custom", value: "applyUser" }],
      "multiInstanceColumn.0.value": {
        completionCondition: "${nrOfCompletedInstances / nrOfInstances == 1}",
        collection: "${ysMultiInstanceHandler.getList(execution)}",
        elementVariable: "assignee"
      },
      "multiInstanceColumn.1.value": "${nrOfCompletedInstances / nrOfInstances == 1}",
      "multiInstanceColumn.2.value": "${ysMultiInstanceHandler.getList(execution)}",
      "multiInstanceColumn.3.value": "assignee",
      "propertyColumn.0.value": [{ name: "name", value: "value" }],
      "propertyColumn.0.children.column.0": value => ({
        ...value,
        type: "select",
        dicData: [
          { label: "接收时更新", value: "upReceive" },
          { label: "通过时更新", value: "upPass" },
          { label: "可编辑字段", value: "editable" },
          { label: "字段是否必填", value: "required" },
          { label: "隐藏字段", value: "hidden" },
          { label: "指定跳转", value: "specifyJump" },
          { label: "是发起节点", value: "isStart" }
        ],
        params: { filterable: true, allowCreate: true, defaultFirstOption: true }
      }),
      "serialColumn.0.value": [
        { dateFormat: "yyyyMMdd", suffixLength: "4", startSequence: "0", connector: "-", cycle: "none" }
      ],
      "timelimitColumn.0.value": [
        { name: "green", min: 10, max: 365 },
        { name: "yellow", min: 5, max: 10 },
        { name: "red", min: 0, max: 5 }
      ],
      "timelimitColumn.0.children.column.0": value => ({
        ...value,
        type: "select",
        dicData: [
          { label: "绿灯", value: "green" },
          { label: "黄灯", value: "yellow" },
          { label: "红灯", value: "red" }
        ],
        params: { filterable: true, allowCreate: true, defaultFirstOption: true }
      })
    });
    setTimeout(() => {
      update({
        "processColumn.3.type": "select",
        "processColumn.3.dicData": [
          { label: "考勤", value: "1" },
          { label: "财务", value: "2" }
        ],
        "buttonColumn.0.value": [
          {
            label: "发送",
            prop: "flow_pass",
            display: "true",
            approval: "false"
          }
        ],
        "formpropertyColumn.0.value": [
          {
            label: "发送",
            prop: "flow_pass",
            display: "false",
            disabled: "true",
            detail: "true",
            required: "true"
          }
        ]
      });
    }, 1000);

    return {
      formData,
      processData,
      onInit,
      onElementChange,
      onUpdateFormData,
      formOptions
    };
  }
});
</script>

<style>
html,
body,
#app {
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
