import type { Ref } from "vue-demi";
import type Modeler from "bpmn-js/lib/Modeler";

import { saveAs } from "file-saver";

export function useMethods(modeler: Ref<Modeler | undefined>) {
  /** 导入XML */
  async function importXML(xml: string) {
    await modeler.value?.importXML(xml);
    fitViewport();
  }
  /** 打开xml */
  function openXML(file: File) {
    const reader = new FileReader();
    reader.readAsText(file, "utf-8");
    reader.onload = () => {
      importXML(reader.result as string);
    };
    return false;
  }
  /** 获取XML */
  async function saveXML() {
    const res = await modeler.value?.saveXML({ format: true });
    return res?.xml as string;
  }
  /** 下载XML */
  async function downloadXml() {
    const xml = await saveXML();
    saveAs(new Blob([xml]), `download.xml`);
  }
  /** 自适应大小 */
  function fitViewport() {
    const canvas = modeler.value?.get("canvas");
    canvas?.zoom("fit-viewport", true);
  }
  /** 放大 */
  function zoomIn() {
    const canvas = modeler.value?.get("canvas");
    const zoom = canvas?.zoom() ?? 0;
    canvas?.zoom(zoom + 0.1);
  }
  /** 缩小 */
  function zoomOut() {
    const canvas = modeler.value?.get("canvas");
    const zoom = canvas?.zoom() ?? 0;
    canvas?.zoom(zoom - 0.1);
  }
  /** 后退 */
  function undo() {
    const commandStack = modeler.value?.get("commandStack");
    commandStack.undo();
  }
  /** 前进 */
  function redo() {
    const commandStack = modeler.value?.get("commandStack");
    commandStack.redo();
  }

  return { importXML, openXML, saveXML, downloadXml, fitViewport, zoomIn, zoomOut, undo, redo };
}
