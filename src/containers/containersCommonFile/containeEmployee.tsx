import { Input, Form, Row, Col, Select, Tooltip } from "antd";
import "./container.css";
import { useState } from "react";
import { FieldData } from "./containerInterface";

export default function ContainerEmployee() {
  const [fields, setFields] = useState<FieldData[]>([
    { name: ["registryEmployee"], value: "" },
    { name: ["positionemployee"], value: "" },
    { name: ["subsidiaryEmployee"], value: "" },
    { name: ["bossEmployee"], value: "" },
    { name: ["custCenter"], value: "" },
  ]);

  const { Option } = Select;

  return (
    <>
      <fieldset>
        <legend>Informações do Colaborador</legend>
        <Form
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name={["nameEmployee"]}
                label={"Colaborador"}
                rules={[
                  { required: true },
                  { message: "Obrigatório selecionar o colaborador." },
                ]}
              >
                <Tooltip title="Selecione o nome do colaborador">
                  <Select
                    allowClear
                    showSearch
                    placeholder="Selecione Colaborador"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option?.children
                        .toLowerCase()
                        .indexOf(input.toLocaleLowerCase()) >= 0
                    }
                  >
                    <Option value="Adriana Conceição">Adriana Conceição</Option>
                    <Option value="Roberto Mattos">Roberto Mattos</Option>
                    <Option value="Maria Eduarda Freitas">
                      Maria Eduarda Freitas
                    </Option>
                    <Option value="Tadeu Carvalho">Tadeu Carvalho</Option>
                  </Select>
                </Tooltip>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["registryEmployee"]} label={"Matrícula"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                name={["positionemployee"]}
                label={"Cargo Colaborador"}
              >
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["subsidiaryEmployee"]} label={"Filial"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name={["bossEmployee"]} label={"Superior Imediato"}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["custCenter"]} label={"Centro de Custo"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name={["localWork"]} label={"Posto de Trabalho"}>
                <Input readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name={["salary"]} label={"Salário Atual"}>
                <Input readOnly />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col span={12}>
              <Form.Item name={["workHours"]} label={"Jornada de Trabalho"}>
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
