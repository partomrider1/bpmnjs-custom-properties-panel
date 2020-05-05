export default class CustomPalette {
    constructor(bpmnFactory, create, elementFactory, palette, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
      this.bpmnFactory = bpmnFactory;
  
      palette.registerProvider(this);
    }
  
    getPaletteEntries(element) {
      const {
        bpmnFactory,
        create,
        elementFactory,
        translate
      } = this;

      const lambdaFuncs = JSON.parse(localStorage.getItem('lambdaFuncs'));

      let defaultTaskObject = {
        group: 'activity',
        className: 'bpmn-icon-service-task',
        title: 'Acknowledge and accept the ticket',
        action: {
          dragstart: createServiceTask,
          click: createServiceTask
        }
      }
  
      function createServiceTask(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
        shape.lambdaLabel = event.target.title;
        create.start(event, shape);
        setTimeout(() => {
          document.querySelector('.djs-direct-editing-content').innerHTML = shape.lambdaLabel;
          document.querySelector('.djs-direct-editing-content').classList.add('disabledInput');
          document.querySelector('.djs-direct-editing-content').blur();
        }, 1000);
      }
      
      let customEntries = {};
      lambdaFuncs.forEach((lambda) => {
        const key = 'create.' + lambda.label;
        const title = lambda.label;
        const valueObject = {...defaultTaskObject, title};
        customEntries[key] = valueObject;
      });

      return customEntries;
    }
  }
  
  CustomPalette.$inject = [
    'bpmnFactory',
    'create',
    'elementFactory',
    'palette',
    'translate'
  ];