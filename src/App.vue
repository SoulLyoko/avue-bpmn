<template>
  <BpmnModeler
    v-model="formData"
    :xml="processData.xml"
    :form-options="formOptions"
    prefix="flowable"
    @update:modeler="modeler = $event"
    @update:element="element = $event"
    @update:xml="processData.xml = $event"
    @input="onUpdateFormData"
    @update:model-value="onUpdateFormData"
  >
    <template #bpmn-tools>
      <el-input
        type="textarea"
        :value="JSON.stringify(formData, null, 2)"
        rows="10"
        style="width: 300px; vertical-align: top"
      ></el-input>
    </template>
  </BpmnModeler>
</template>

<script lang="ts">
import type Modeler from "bpmn-js/lib/Modeler";
import type { Base } from "diagram-js/lib/model";

import { defineComponent, ref, shallowRef } from "vue-demi";

import { BpmnModeler, defaultXml, useOptions, defaultFormData } from "../packages";
import "../packages/styles/bpmn-modeler.scss";

export default defineComponent({
  name: "App",
  components: { BpmnModeler },
  setup() {
    const formData = ref(defaultFormData);
    const processData = ref<any>({
      xml: defaultXml()
    });
    const modeler = shallowRef<Modeler>();
    const element = shallowRef<Base>();
    function onUpdateFormData(val: any) {
      if (element.value?.type !== "bpmn:Process") return;
      processData.value = {
        ...processData.value,
        modelKey: val.id,
        name: val.name,
        categoryId: val.category,
        icon: val.icon,
        description: val.documentation
      };
    }

    const completionCondition = "${nrOfCompletedInstances / nrOfInstances == 1}";
    const collection = "${ysMultiInstanceHandler.getList(execution)}";
    const elementVariable = "assignee";
    const allowCreateSelect = {
      type: "select",
      params: { filterable: true, allowCreate: true, defaultFirstOption: true }
    };
    const { options: formOptions, update } = useOptions();
    update({
      "assigneeListColumn.value": [{ type: "custom", value: "applyUser" }],
      "completionConditionColumn.value": completionCondition,
      "collectionColumn.value": collection,
      "elementVariableColumn.value": elementVariable,
      "multiInstanceTypeColumn.value": { completionCondition, collection, elementVariable },
      "propertyListColumn.value": [{ name: "name", value: "value" }],
      "propertyListColumn.children.column.0": value => ({
        ...value,
        ...allowCreateSelect,
        dicData: [
          { label: "接收时更新", value: "upReceive" },
          { label: "通过时更新", value: "upPass" },
          { label: "可编辑字段", value: "editable" },
          { label: "字段是否必填", value: "required" },
          { label: "隐藏字段", value: "hidden" },
          { label: "指定跳转", value: "specifyJump" },
          { label: "是发起节点", value: "isStart" }
        ]
      }),
      "serialListColumn.value": [
        { dateFormat: "yyyyMMdd", suffixLength: "4", startSequence: "0", connector: "-", cycle: "none" }
      ],
      "timelimitListColumn.value": [
        { name: "green", min: 10, max: 365 },
        { name: "yellow", min: 5, max: 10 },
        { name: "red", min: 0, max: 5 }
      ],
      "timelimitListColumn.children.column.0": value => ({
        ...value,
        ...allowCreateSelect,
        dicData: [
          { label: "绿灯", value: "green" },
          { label: "黄灯", value: "yellow" },
          { label: "红灯", value: "red" }
        ]
      })
    });
    setTimeout(() => {
      update({
        "buttonListColumn.value": [
          {
            label: "发送",
            prop: "flow_pass",
            display: "true",
            approval: "false"
          }
        ],
        "formpropertyListColumn.value": [
          {
            label: "发送",
            prop: "flow_pass",
            display: "false",
            disabled: "true",
            detail: "true",
            required: "true"
          }
        ],
        "processCategoryColumn.type": "select",
        "processCategoryColumn.dicData": [
          { label: "考勤", value: "1" },
          { label: "财务", value: "2" }
        ]
      });
    }, 1000);

    return {
      formData,
      processData,
      modeler,
      element,
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
