export const Diagram = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd">
  <bpmn2:process id="init_process" isExecutable="false">
    <bpmn2:startEvent id="StartEvent_00ahu1c">
      <bpmn2:outgoing>SequenceFlow_1i0xxhc</bpmn2:outgoing>
    </bpmn2:startEvent>
    <bpmn2:serviceTask id="ServiceTask_08jdzcf" name="Acknowledge and accept the ticket">
      <bpmn2:incoming>SequenceFlow_1i0xxhc</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_173fxt7</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="SequenceFlow_1i0xxhc" sourceRef="StartEvent_00ahu1c" targetRef="ServiceTask_08jdzcf" />
    <bpmn2:exclusiveGateway id="ExclusiveGateway_1kljdhi">
      <bpmn2:incoming>SequenceFlow_173fxt7</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1m2z76y</bpmn2:outgoing>
      <bpmn2:outgoing>SequenceFlow_0wfjsmy</bpmn2:outgoing>
    </bpmn2:exclusiveGateway>
    <bpmn2:sequenceFlow id="SequenceFlow_173fxt7" sourceRef="ServiceTask_08jdzcf" targetRef="ExclusiveGateway_1kljdhi" />
    <bpmn2:serviceTask id="ServiceTask_0pi7bwy" name="Check connected LAN switch port">
      <bpmn2:incoming>SequenceFlow_1m2z76y</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_1xaadp7</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="SequenceFlow_1m2z76y" sourceRef="ExclusiveGateway_1kljdhi" targetRef="ServiceTask_0pi7bwy" />
    <bpmn2:serviceTask id="ServiceTask_1lxfaa4" name="Cross check device is reachable">
      <bpmn2:incoming>SequenceFlow_0wfjsmy</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0s8wing</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="SequenceFlow_0wfjsmy" sourceRef="ExclusiveGateway_1kljdhi" targetRef="ServiceTask_1lxfaa4" />
    <bpmn2:serviceTask id="ServiceTask_18orfgc" name="Check connected LAN switch port">
      <bpmn2:incoming>SequenceFlow_0s8wing</bpmn2:incoming>
      <bpmn2:outgoing>SequenceFlow_0w7n2ev</bpmn2:outgoing>
    </bpmn2:serviceTask>
    <bpmn2:sequenceFlow id="SequenceFlow_0s8wing" sourceRef="ServiceTask_1lxfaa4" targetRef="ServiceTask_18orfgc" />
    <bpmn2:endEvent id="EndEvent_0e0ichr">
      <bpmn2:incoming>SequenceFlow_0w7n2ev</bpmn2:incoming>
      <bpmn2:incoming>SequenceFlow_1xaadp7</bpmn2:incoming>
    </bpmn2:endEvent>
    <bpmn2:sequenceFlow id="SequenceFlow_0w7n2ev" sourceRef="ServiceTask_18orfgc" targetRef="EndEvent_0e0ichr" />
    <bpmn2:sequenceFlow id="SequenceFlow_1xaadp7" sourceRef="ServiceTask_0pi7bwy" targetRef="EndEvent_0e0ichr" />
  </bpmn2:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_init">
    <bpmndi:BPMNPlane id="BPMNPlane_init" bpmnElement="init_process">
      <bpmndi:BPMNShape id="StartEvent_00ahu1c_di" bpmnElement="StartEvent_00ahu1c">
        <dc:Bounds x="217" y="135" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="ServiceTask_08jdzcf_di" bpmnElement="ServiceTask_08jdzcf">
        <dc:Bounds x="303" y="113" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1i0xxhc_di" bpmnElement="SequenceFlow_1i0xxhc">
        <di:waypoint x="253" y="153" />
        <di:waypoint x="303" y="153" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ExclusiveGateway_1kljdhi_di" bpmnElement="ExclusiveGateway_1kljdhi" isMarkerVisible="true">
        <dc:Bounds x="453" y="128" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_173fxt7_di" bpmnElement="SequenceFlow_173fxt7">
        <di:waypoint x="403" y="153" />
        <di:waypoint x="453" y="153" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ServiceTask_0pi7bwy_di" bpmnElement="ServiceTask_0pi7bwy">
        <dc:Bounds x="553" y="223" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_1m2z76y_di" bpmnElement="SequenceFlow_1m2z76y">
        <di:waypoint x="478" y="178" />
        <di:waypoint x="478" y="263" />
        <di:waypoint x="553" y="263" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ServiceTask_1lxfaa4_di" bpmnElement="ServiceTask_1lxfaa4">
        <dc:Bounds x="553" y="113" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0wfjsmy_di" bpmnElement="SequenceFlow_0wfjsmy">
        <di:waypoint x="503" y="153" />
        <di:waypoint x="553" y="153" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="ServiceTask_18orfgc_di" bpmnElement="ServiceTask_18orfgc">
        <dc:Bounds x="703" y="113" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0s8wing_di" bpmnElement="SequenceFlow_0s8wing">
        <di:waypoint x="653" y="153" />
        <di:waypoint x="703" y="153" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_0e0ichr_di" bpmnElement="EndEvent_0e0ichr">
        <dc:Bounds x="856" y="245" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="SequenceFlow_0w7n2ev_di" bpmnElement="SequenceFlow_0w7n2ev">
        <di:waypoint x="803" y="153" />
        <di:waypoint x="830" y="153" />
        <di:waypoint x="830" y="263" />
        <di:waypoint x="856" y="263" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_1xaadp7_di" bpmnElement="SequenceFlow_1xaadp7">
        <di:waypoint x="653" y="263" />
        <di:waypoint x="856" y="263" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn2:definitions>`;
