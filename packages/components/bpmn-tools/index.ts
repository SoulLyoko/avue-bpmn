import type { PropType } from "vue-demi";
import type Modeler from "bpmn-js/lib/Modeler";
import type { EmitFn } from "~/types";

import { defineComponent, ref, toRefs, isVue2 } from "vue-demi";

import { dynamicComponent, h, slot } from "~/utils";
import { useMethods } from "../../composables";

export type ToolsEmits = typeof toolsEmits;
export type ToolsEmitFn = EmitFn<ToolsEmits>;
export type ToolsInstance = InstanceType<typeof BpmnTools>;

export const ToolsProps = {
  modeler: { type: Object as PropType<Modeler> },
  size: { type: String, default: isVue2 ? "small" : "default" }
};

export const toolsEmits = {
  "xml-change": (e: string) => typeof e === "string"
};

export const BpmnTools = defineComponent({
  name: "BpmnTools",
  inheritAttrs: false,
  props: ToolsProps,
  emits: toolsEmits,
  setup(props, { emit, slots }) {
    const ElTooltip = dynamicComponent("el-tooltip");
    const ElButton = dynamicComponent("el-button");
    const ElUpload = dynamicComponent("el-upload");
    const ElInput = dynamicComponent("el-input");
    const ElDrawer = dynamicComponent("el-drawer");

    const editorVisible = ref(false);
    const xmlForEdit = ref("");
    const { modeler } = toRefs(props);
    const { importXML, openXML, saveXML, downloadXml, fitViewport, zoomIn, zoomOut, undo, redo } = useMethods(modeler);
    /** 打开编辑XML */
    async function openEditXml() {
      xmlForEdit.value = await saveXML();
      editorVisible.value = true;
    }
    /** 确认更新XML */
    async function confirmUpdateXml() {
      await importXML(xmlForEdit.value);
      editorVisible.value = false;
      emit("xml-change", xmlForEdit.value);
    }

    const toolsList = [
      { label: "下载XML", icon: "el-icon-download", onClick: downloadXml },
      { label: "编辑XML", icon: "el-icon-edit", onClick: openEditXml },
      { label: "自适应大小", icon: "el-icon-rank", onClick: fitViewport },
      { label: "放大", icon: "el-icon-plus", onClick: zoomIn },
      { label: "缩小", icon: "el-icon-minus", onClick: zoomOut },
      { label: "后退", icon: "el-icon-arrow-left", onClick: undo },
      { label: "前进", icon: "el-icon-arrow-right", onClick: redo }
    ];

    return () => {
      const renderButton = (item: typeof toolsList[0]) => {
        return h(ElTooltip, { props: { content: item.label, placement: "bottom", effect: "dark" } }, [
          h(ElButton, {
            props: { type: "info", plain: true, icon: item.icon, size: props.size },
            on: { click: item.onClick }
          })
        ]);
      };
      return h("div", { class: "bpmn-tools" }, [
        h(ElTooltip, { props: { content: "打开XML", placement: "bottom", effect: "dark" } }, [
          h("span", {}, [
            h(ElUpload, { class: "xml-uploader", props: { action: "", accept: ".bpmn,.xml", beforeUpload: openXML } }, [
              h(ElButton, {
                props: { type: "info", plain: true, icon: "el-icon-folder-opened", size: props.size }
              })
            ])
          ])
        ]),
        ...toolsList.map(renderButton),
        slot(slots.default),
        h(
          ElDrawer,
          {
            props: {
              visible: editorVisible.value,
              modelValue: editorVisible.value,
              title: "编辑XML",
              customClass: "xml-editor",
              size: "50%"
            },
            on: {
              "update:visible": (v: boolean) => (editorVisible.value = v),
              "update:modelValue": (v: boolean) => (editorVisible.value = v)
            }
          },
          [
            h(ElInput, {
              props: {
                value: xmlForEdit.value,
                modelValue: xmlForEdit.value,
                type: "textarea",
                autosize: { minRows: 10, maxRows: 40 },
                size: props.size
              },
              on: { input: (v: string) => (xmlForEdit.value = v) }
            }),
            h(
              ElButton,
              {
                class: "confirm-btn",
                props: { type: "primary", icon: "el-icon-check", size: props.size },
                on: { click: confirmUpdateXml }
              },
              "确定"
            )
          ]
        )
      ]);
    };
  }
});
