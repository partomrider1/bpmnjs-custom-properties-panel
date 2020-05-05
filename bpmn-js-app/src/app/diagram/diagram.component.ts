import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  ViewChild,
  SimpleChanges,
  EventEmitter
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map, catchError, retry } from 'rxjs/operators';
import { EmptyBpmn } from './bpmn-xml/empty-bpmn';
import { Diagram } from './bpmn-xml/diagram';

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';

import { importDiagram } from './rx';

import { throwError } from 'rxjs';

import propertiesPanelModule from 'bpmn-js-properties-panel';

// import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';

// import * as camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';

import propertiesProviderModule from './providers/properties';

import customControlsModule from './providers/pallettes';

import customRendererModule from './providers/renderer';

// import * as customModdleDescriptor from './descriptors/sample-desc.json';

import * as customModdleDescriptor from './providers/descriptors/serviceTask.json'
import { GlobalService } from '../services/global-service/global-service';

@Component({
  selector: 'app-diagram',
  template: `
    <div class="diagram-container">
      <div #ref id="canvas"></div>
      <div id="properties"></div>
    </div>
    <button class='exportButton' (click)='exportDiagram()'>Export</button>
  `,
  styleUrls: ['diagram.component.css']
})

export class DiagramComponent implements AfterContentInit, OnChanges, OnDestroy {
  private bpmnJS: BpmnJS;
  private moddle: any;
  private modeling: any;

  @ViewChild('ref') private el: ElementRef;
  @Output() private importDone: EventEmitter<any> = new EventEmitter();

  @Input() private url: string;

  constructor(private http: HttpClient, private _globalService: GlobalService) {
  }

  ngAfterContentInit(): void {
    //this.bpmnJS.attachTo(this.el.nativeElement);

    this._globalService.getServiceCall().subscribe(data => {
      //console.log(JSON.stringify(data));
      localStorage.setItem('lambdaFuncs', JSON.stringify(data));
      this.initializeDiagram();
    });

    //this.loadUrl(this.url);

    // this.bpmnJS.attachTo('#canvas');
    // var propertiesPanel = this.bpmnJS.get('propertiesPanel');
    // propertiesPanel.attachTo('#properties');
  }

  initializeDiagram() {
    this.bpmnJS = new BpmnJS({
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule,
        customControlsModule,
        customRendererModule
      ],
      container: '#canvas',
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtensions: {
        qa: customModdleDescriptor
      }
    });

    //this.bpmnJS.importXML(Diagram);

    this.bpmnJS.importXML(EmptyBpmn);

    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
      }
    });

    var eventBus = this.bpmnJS.get('eventBus');
    eventBus.on('element.dblclick', 1500, function (e) {
      if (e.element && e.element.id.startsWith('ServiceTask')) {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // re-import whenever the url changes
    // if (changes.url) {
    //   this.loadUrl(changes.url.currentValue);
    // }
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  /**
   * Load diagram from URL and emit completion event
   */
  loadUrl(url: string) {

    return (
      this.http.get(url, { responseType: 'text' }).pipe(
        catchError(err => throwError(err)),
        importDiagram(this.bpmnJS)
      ).subscribe(
        (warnings) => {
          this.importDone.emit({
            type: 'success',
            warnings
          });
        },
        (err) => {
          this.importDone.emit({
            type: 'error',
            error: err
          });
        }
      )
    );
  }

  exportDiagram() {
    this.bpmnJS.saveXML({ format: true }, function (err, xml) {
      console.log(xml);
    });
  }

}
