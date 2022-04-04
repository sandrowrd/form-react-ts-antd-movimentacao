import { Input, Form, Row, Col } from "antd";
import "./container.css";
import { useState } from "react";
import { FieldData } from "./containerInterface";

export default function ContainerIdentify() {
  const [fields, setFields] = useState<FieldData[]>([
    { name: "fullname", value: "" },
    { name: "registry", value: "" },
    { name: "subsidiary", value: "" },
    { name: "office", value: "" },
    { name: "boss", value: "" },
  ]);

  return (
    <>
      <fieldset>
        <legend>Identificação do Solicitante</legend>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          fields={fields}
          onFieldsChange={(_, allFields) => {}}
        >
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item name={"fullname"} label={"Nome Solicitante"}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"registry"} label={"Matrícula"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item name={"office"} label={"Cargo Solicitante"}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={"subsidiary"} label={"Filial"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item name={"boss"} label={"Superior Imediato"}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item></Form.Item>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}
