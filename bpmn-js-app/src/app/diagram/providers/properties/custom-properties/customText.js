import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';

import {
  is
} from 'bpmn-js/lib/util/ModelUtil';

import { getBusinessObject } from 'bpmn-js/lib/util/ModelUtil';
import cmdHelper from 'bpmn-js-properties-panel/lib/helper/CmdHelper';


export default function(group, element, data, keyString) {

  // Only return an entry, if the currently selected
  // element is a start event.

  if (is(element, 'bpmn:ServiceTask')) {
    Object.keys(data).forEach((key) => {
      group.entries.push(entryFactory.textField({
        id : key + keyString, // + guidGenerator(),
        label : key,
        modelProperty : key
      }));
    });
  }
}

// function guidGenerator() {
//   var S4 = function() {
//      return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
//   };
//   return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
// }