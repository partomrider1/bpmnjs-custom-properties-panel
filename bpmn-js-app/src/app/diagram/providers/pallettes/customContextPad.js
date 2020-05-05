export default class CustomContextPad {
    constructor(config, contextPad, create, elementFactory, injector, translate) {
      this.create = create;
      this.elementFactory = elementFactory;
      this.translate = translate;
  
      if (config.autoPlace !== false) {
        this.autoPlace = injector.get('autoPlace', false);
      }
  
      contextPad.registerProvider(this);
    }
  
    getContextPadEntries(element) {
      const {
        autoPlace,
        create,
        elementFactory,
        translate
      } = this;

      let defaultTaskObject = {
        group: 'model',
        className: 'bpmn-icon-service-task',
        title: 'Append',
        action: {
          click: appendServiceTask,
          dragstart: appendServiceTaskStart
        }
      }

      const lambdaFuncs = JSON.parse(localStorage.getItem('lambdaFuncs'));
  
      function appendServiceTask(event, element) {
        if (autoPlace) {
          const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
          shape.lambdaLabel = event.target.title.split('lambda function')[0].split('Append')[1].trim();
          setTimeout(() => {
            document.querySelector('.djs-direct-editing-content').innerHTML = shape.lambdaLabel;
            document.querySelector('.djs-direct-editing-content').classList.add('disabledInput');
            document.querySelector('.djs-direct-editing-content').blur();
          }, 1000);
          autoPlace.append(element, shape);
        } else {
          appendServiceTaskStart(event, element);
        }
      }
  
      function appendServiceTaskStart(event) {
        const shape = elementFactory.createShape({ type: 'bpmn:ServiceTask' });
        shape.lambdaLabel = event.target.title.split('lambda function')[0].split('Append')[1].trim();
        setTimeout(() => {
          document.querySelector('.djs-direct-editing-content').innerHTML = shape.lambdaLabel;
          document.querySelector('.djs-direct-editing-content').classList.add('disabledInput');
          document.querySelector('.djs-direct-editing-content').blur();
        }, 1000);
        create.start(event, shape, element);
      }

      let customEntries = {};
      lambdaFuncs.forEach((lambda) => {
        const key = 'append.' + lambda.label;
        const title = 'Append ' + lambda.label + ' lambda function';
        const valueObject = {...defaultTaskObject, title};
        customEntries[key] = valueObject;
      });
      return customEntries;
    }
  }
  
  CustomContextPad.$inject = [
    'config',
    'contextPad',
    'create',
    'elementFactory',
    'injector',
    'translate'
  ];