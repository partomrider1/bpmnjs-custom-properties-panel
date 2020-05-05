import inherits from 'inherits';

import BaseRenderer from 'diagram-js/lib/draw/BaseRenderer';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import Lambda from './lambda';

import {
  append as svgAppend,
  create as svgCreate
} from 'tiny-svg';


export default function CustomRender(eventBus, bpmnRenderer) {
  BaseRenderer.call(this, eventBus, 1500);

  this.canRender = function(element) {
    return is(element, 'bpmn:ServiceTask');
  };


  this.drawShape = function(parent, shape) {
    var url = Lambda.dataURL;
    const renderedShape = bpmnRenderer.drawShape(parent, shape);

    var custGfx = svgCreate('image', {
      id: '#imageLambda',
      x: 0,
      y: 3.2,
      width: shape.width/3,
      height: shape.height/3,
      href: url
    });
    svgAppend(parent, custGfx);

    return renderedShape;
  };
}

inherits(CustomRender, BaseRenderer);

CustomRender.$inject = [ 'eventBus', 'bpmnRenderer'];