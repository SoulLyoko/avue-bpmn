<template>
  <component
    is="BpmnModeler"
    v-model="formData"
    v-model:xml="xml"
    :form-options="options"
    prefix="flowable"
    style="height: 500px"
  >
    <template #bpmn-tools>
      <el-button type="primary" size="default" @click="updateCategory">
        更新流程分类(更新后需手动点击一次图形)
      </el-button>
    </template>
  </component>
  <!-- <BpmnModeler v-model="formData" v-model:xml="xml" :form-options="options" prefix="flowable" style="height: 500px">
    <template #bpmn-tools>
      <el-button type="primary" size="default" @click="updateCategory">
        更新流程分类(更新后需手动点击一次图形)
      </el-button>
    </template>
  </BpmnModeler> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defaultXml } from "avue-bpmn/defaults/xml";
import { useOptions } from "avue-bpmn/composables/options";
// import { BpmnModeler, defaultXml, useOptions } from "avue-bpmn";
// import "avue-bpmn/styles/bpmn-modeler.scss";

const formData = ref({});
const xml = ref(defaultXml());
const { options, update } = useOptions();
update({
  "serialColumn.value": [
    { dateFormat: "yyyyMMdd", suffixLength: "4", startSequence: "0", connector: "-", cycle: "none" }
  ]
});

function updateCategory() {
  update({
    "processCategoryColumn.type": "select",
    "processCategoryColumn.dicData": [
      { label: "财务管理", value: "0" },
      { label: "人事管理", value: "1" },
      { label: "考勤管理", value: "2" }
    ]
  });
}
</script>
