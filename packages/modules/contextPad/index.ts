// @ts-nocheck

export default class CustomContextPad {
  constructor(config, contextPad, create, elementFactory, injector, translate) {
    this.create = create;
    this.elementFactory = elementFactory;
    this.translate = translate;

    if (config.autoPlace !== false) {
      this.autoPlace = injector.get("autoPlace", false);
    }

    contextPad.registerProvider(this);
  }

  getContextPadEntries(element) {
    const { autoPlace, create, elementFactory, translate } = this;

    function appendUserTask(event, element) {
      if (autoPlace) {
        const shape = elementFactory.createShape({ type: "bpmn:UserTask" });
        autoPlace.append(element, shape);
      } else {
        appendUserTaskStart(event, element);
      }
    }

    function appendUserTaskStart(event, element) {
      const shape = elementFactory.createShape({ type: "bpmn:UserTask" });
      create.start(event, shape, element);
    }

    if (["bpmn:SequenceFlow", "bpmn:EndEvent", "bpmn:TextAnnotation"].includes(element.type)) return {};
    return {
      "append.user-task": {
        group: "model",
        className: "bpmn-icon-user-task",
        title: translate("User Task"),
        action: {
          click: appendUserTask,
          dragstart: appendUserTaskStart
        }
      }
    };
  }
}

CustomContextPad.$inject = ["config", "contextPad", "create", "elementFactory", "injector", "translate"];
