import CustomContextPad from "./contextPad";
import customTranslate from "./translate";

export default {
  __init__: ["translate", "customContextPad"],
  translate: ["value", customTranslate],
  customContextPad: ["type", CustomContextPad]
};
