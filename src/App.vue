<template>
  <BpmnModeler
    v-model="formData"
    :xml="xml"
    prefix="flowable"
    :form-options="formOptions"
    @init="onInit"
    @input="onUpdateFormData"
    @update:model-value="onUpdateFormData"
    @update:xml="xml = $event"
    @element-change="onElementChange"
  >
    <template #bpmn-tools>
      {{ formData }}
    </template>
    <template #name>
      <el-input v-model="formData.name"></el-input>
    </template>
  </BpmnModeler>
</template>

<script lang="ts">
import type { BpmnFormColumnItem } from "../packages/types";

import { defineComponent, ref } from "vue-demi";
import { update } from "lodash-unified";

import { BpmnModeler } from "../packages";
import { defaultXml, defaultOptions } from "../packages/defaults";
import { filterObj } from "../packages/utils";
import "../packages/styles/bpmn-modeler.scss";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

export default defineComponent({
  name: "App",
  components: { BpmnModeler },
  setup() {
    const xml = ref(defaultXml());
    const formData = ref<any>({});
    const processData = ref({});
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
      processData.value = { ...val };
    }

    let formOptions = defaultOptions;
    update(defaultOptions, "bpmn:UserTask[7].column[0].children.column[0]", value => {
      return {
        ...value,
        type: "select",
        dicData: [
          { label: "绿灯", value: "green" },
          { label: "黄灯", value: "yellow" },
          { label: "红灯", value: "red" }
        ],
        params: {
          filterable: true,
          allowCreate: true,
          defaultFirstOption: true
        }
      };
    });
    update(defaultOptions, "bpmn:UserTask[7].column[0]", value => {
      return {
        ...value,
        updateFormData({ formData, businessObject, prefix }) {
          const values = businessObject?.extensionElements?.values ?? [];
          const timelimitElements = values.filter(e => e.$type === prefix("Timelimit"));
          if (timelimitElements.length) {
            formData.value.timelimitList = timelimitElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
          } else {
            formData.value.timelimitList = [
              { name: "green", min: 10, max: 365 },
              { name: "yellow", min: 5, max: 10 },
              { name: "red", min: 0, max: 5 }
            ];
          }
        }
      } as BpmnFormColumnItem;
    });
    update(defaultOptions, "bpmn:UserTask[1].column[0].children.column[0]", value => {
      return {
        ...value,
        type: "select",
        dicData: [
          { label: "用户", value: "user" },
          { label: "部门", value: "dept" },
          { label: "角色", value: "role" },
          { label: "岗位", value: "post" },
          { label: "指定节点", value: "userTask" },
          { label: "自定义", value: "custom" }
        ]
      };
    });
    update(defaultOptions, "bpmn:UserTask[1].column[0]", value => {
      return {
        ...value,
        updateFormData({ formData, businessObject, prefix }) {
          const values = businessObject?.extensionElements?.values ?? [];
          const assigneeElements = values.filter(e => e.$type === prefix("Assignee"));
          if (assigneeElements.length) {
            formData.value.assigneeList = assigneeElements.map(e => filterObj(e.$attrs, [], ["$", "_"]));
          } else {
            formData.value.assigneeList = [{ type: "custom", value: "applyUser" }];
          }
        }
      } as BpmnFormColumnItem;
    });
    return {
      xml,
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
