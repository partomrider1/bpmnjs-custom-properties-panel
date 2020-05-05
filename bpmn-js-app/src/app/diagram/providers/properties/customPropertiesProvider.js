import inherits from 'inherits';
import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator';

// Require all properties you need from existing providers.
// In this case all available bpmn relevant properties without camunda extensions.
import processProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/ProcessProps';
import eventProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/EventProps';
import linkProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/LinkProps';
import documentationProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/DocumentationProps';
import idProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/IdProps';
import nameProps from 'bpmn-js-properties-panel/lib/provider/bpmn/parts/NameProps';


// Require your custom property entries.
import customProp from './custom-properties/customText';

const lambdaFuncs = JSON.parse(localStorage.getItem('lambdaFuncs'));


// The general tab contains all bpmn relevant properties.
// The properties are organized in groups.
function createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate) {

  var generalGroup = {
    id: 'general',
    label: '',
    entries: []
  };
  idProps(generalGroup, element, translate);
  nameProps(generalGroup, element, bpmnFactory, canvas, translate);
  processProps(generalGroup, element, translate);

  var detailsGroup = {
    id: 'details',
    label: 'Details',
    entries: []
  };
  linkProps(detailsGroup, element, translate);
  eventProps(detailsGroup, element, bpmnFactory, elementRegistry, translate);

  var documentationGroup = {
    id: 'documentation',
    label: 'Documentation',
    entries: []
  };

  //modifyGeneralProps(element, generalGroup);

  //documentationProps(documentationGroup, element, bpmnFactory, translate);

  return [
    generalGroup,
    detailsGroup,
    documentationGroup
  ];
}

// Create the custom magic tab
function createInputTabGroups(index, element) {
  var lambdaInputs = {
    id: 'lambdaInputs',
    label: '',
    entries: []
  };

  customProp(lambdaInputs, element, lambdaFuncs[index].workflowInput, '-in');
  lambdaInputs.entries = [...appendValueAttributes(lambdaFuncs[index].workflowInput, lambdaInputs.entries)];

  return [
    lambdaInputs
  ];
}

function createOutputTabGroups(index, element) {
  var lambdaOutputs = {
    id: 'lambdaOutputs',
    label: '',
    entries: []
  };

  customProp(lambdaOutputs, element, lambdaFuncs[index].workflowOutput, '-out');
  lambdaOutputs.entries = [...appendValueAttributes(lambdaFuncs[index].workflowOutput, lambdaOutputs.entries)];

  return [
    lambdaOutputs
  ];
}

export default function CustomPropertiesProvider(
    eventBus, bpmnFactory, canvas,
    elementRegistry, translate) {

  PropertiesActivator.call(this, eventBus);

  this.getTabs = function(element) {
    
    let tabs = [];
    tabs.push({
      id: 'general',
      label: 'General',
      groups: createGeneralTabGroups(element, bpmnFactory, canvas, elementRegistry, translate)
    });;

    if(is(element, 'bpmn:ServiceTask')) {
      const index = findIndexOfInLambdas(element.lambdaLabel);
      var inputPropTab = {
        id: 'inputProps',
        label: 'Lambda Inputs',
        groups: createInputTabGroups(index, element)
      };
      var outputPropTab = {
        id: 'oututProps',
        label: 'Lambda Outputs',
        groups: createOutputTabGroups(index, element)
      };
      tabs.push(inputPropTab);
      tabs.push(outputPropTab);
    }

    return tabs;
  };
}

function findIndexOfInLambdas(label) {
  return lambdaFuncs.findIndex((lambda) => lambda.label === label);
}

function appendValueAttributes(valueObj, entries) {
  entries.forEach(entry => {
    const label = entry.id.split('-')[0]; //.substr(0, entry.id.length - 36);
    entry.html = modifyAttributeInEntryHtml(entry.html, valueObj[label], 'input', label);
  });
  return entries;
}

function modifyGeneralProps(element, generalGroup) {
  if(element && element.lambdaLabel) {
    generalGroup.entries.forEach((entry) => {
      if(entry.id === 'name') {
        entry.html = modifyAttributeInEntryHtml(entry.html, element.lambdaLabel, 'div', 'name');
      }
      if(entry.id === 'id') {
        delete entry.clear;
        delete entry.canClear;
      }
    });
  }
}

function modifyAttributeInEntryHtml(html, value, type, attributeKey) {
  let parser = new DOMParser(), miniDom = parser.parseFromString(html, 'text/html');
  switch(type) {
    case 'input': {
      let elem = miniDom.querySelector(type + '[name="' + attributeKey + '"]');
      elem.setAttribute('placeholder', value);
      elem.classList.add('disabledInput');
      break;
    }
    case 'div': {
      // let elem = miniDom.querySelector(type + '.bpp-field-wrapper');
      // elem.innerHTML = '<input type="text" name="' + value + '" placeholder="' + value + '" class="disabledInput" />';
      let elem = miniDom.getElementById('camunda-name');
      elem.classList.add('disabledInput');
      break;
    }
  }
  return miniDom.body.innerHTML;
}

inherits(CustomPropertiesProvider, PropertiesActivator);