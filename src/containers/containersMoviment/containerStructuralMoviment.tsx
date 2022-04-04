import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  Tooltip,
  notification,
  Button,
} from "antd";
import { WarningOutlined } from "@ant-design/icons";

import "../containersCommonFile/container.css";
import { useState } from "react";
import { FieldData } from "../containersCommonFile/containerInterface";

export default function ContainerStructuralMoviment(props) {
  const [fields, setFields] = useState<FieldData[]>([
    { name: "movimentType", value: "salarial" },
    { name: "company", value: "" },
    { name: "subsidiary", value: "" },
    { name: "costCenter", value: "" },
    { name: "manager", value: "" },
    { name: "workplace", value: "" },
    { name: "syndicate", value: "" },
    { name: "workstation", value: "" },
    { name: "transfJuridica", value: false },
    { name: "branch", value: false },
    { name: "CostCent", value: false },
    { name: "hierarchy", value: false },
    { name: "workloc", value: false },
    { name: "sind", value: false },
    { name: "postW", value: false },
    { name: "movimentDate", value: false },
  ]);

  const [form] = Form.useForm();

  const notificationBranchSind = () => {
    notification.open({
      message: "Atenção Erro no preenchimento",
      description:
        "Cada Filial esta ligada a um sindicato. Assim, não pode fazer alteração dos dois ao mesmo tempo ",
      icon: <WarningOutlined style={{ color: "#FF0000" }} />,
      style: {
        background: "#bfcff7",
      },
    });
  };

  const ChangeCheck = (value) => {
    console.log(value);
  };

  const tableWarningStr = (title, descript) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Confirmar
      </Button>
    );

    const styleNote = {
      icon: <WarningOutlined style={{ color: "#FF0000" }} />,
      style: {
        background: "#bfcff7",
      },
    };

    notification.open({
      message: title,
      description: descript,
      btn,
      key,
      ...styleNote,
      duration: 0,
    });
  };

  return (
    <>
      <fieldset
        hidden={
          props.mode === "estrutural" || fields[0].value === "estrutural"
            ? false
            : true
        }
      >
        <legend>Movimentação</legend>

        <Form
          form={form}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 10 }}
          labelAlign="left"
          fields={fields}
          onFieldsChange={(_, allFields) => {
            setFields(allFields);
          }}
          name="structuralMoviment"
        >
          <div className="warningPanel">
            <ul>
              <li>
                <p>
                  As solicitações de movimentação estrutural devem ser
                  requiridas e aprovadas até o dia 5 para entrar em vigência no
                  mesmo mês. Após essa data, entrarão em vigência no mês
                  seguinte.
                </p>
              </li>

              <p>
                <Checkbox>Declaro que li todas as regras acima.</Checkbox>
              </p>
            </ul>
          </div>
          <Row gutter={50}>
            <Col span={12}>
              <Form.Item name={"movimentType"} label={"Tipo de Movimentação"}>
                <Select
                  placeholder="Selecione Movimentação"
                  defaultValue="salarial"
                  bordered
                >
                  <Select.Option value="salarial">Salarial</Select.Option>
                  <Select.Option value="estrutural">Estrutural</Select.Option>
                </Select>
              </Form.Item>

              <Tooltip
                title="Selecione a empresa"
                trigger={fields[8].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"company"}
                  label={"Empresa"}
                  rules={[
                    {
                      required: fields[8].value,
                      message: "Obrigatório selecionar a empresa",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Empresa"
                    defaultValue="Tabajara"
                    disabled={fields[8].value ? false : true}
                  >
                    <Select.Option value="telurio">Telurio</Select.Option>
                    <Select.Option value="estroncio">Estrôncio</Select.Option>
                    <Select.Option value="tabajara">Tabajara</Select.Option>
                  </Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Ao selecionar a filial automaticamente será alterado o sindicato"
                trigger={fields[9].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"subsidiary"}
                  label={"Filial"}
                  rules={[
                    {
                      required: fields[9].value && !fields[13].value,
                      message: "Obrigatório selecionar uma filial",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Filial"
                    disabled={
                      fields[9].value && !fields[13].value ? false : true
                    }
                  ></Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Somente poderá escolher entre os centros de custo que a filial está cadastrada."
                trigger={fields[10].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"costCenter"}
                  label={"Centro de Custo"}
                  rules={[
                    {
                      required: fields[10].value,
                      message: "Obrigatório selecionar um centro de custo",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Centro de Custo"
                    disabled={fields[10].value ? false : true}
                  ></Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Selecione o Gestor"
                trigger={fields[11].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"manager"}
                  label={"Gestor"}
                  rules={[
                    {
                      required: fields[11].value,
                      message: "Obrigatório selecionar um dos gestores",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Gestor"
                    disabled={fields[11].value ? false : true}
                  ></Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Selecione o local de Trabalho"
                trigger={fields[12].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"workplace"}
                  label={"Local de Trabalho"}
                  rules={[
                    {
                      required: fields[12].value,
                      message: "Obrigatório selecionar local de trabalho",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Local de Trabalho"
                    disabled={fields[12].value ? false : true}
                  ></Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Somente pode selecionar o sindicatos que estão relacionado com a filial"
                trigger={fields[13].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"syndicate"}
                  label={"Sindicato"}
                  rules={[
                    {
                      required: fields[13].value && !fields[11].value,
                      message: "Obrigatório selecionar sindicato",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Sindicato"
                    disabled={
                      fields[13].value && !fields[11].value ? false : true
                    }
                  ></Select>
                </Form.Item>
              </Tooltip>
              <Tooltip
                title="Selecione o posto de trabalho"
                trigger={fields[14].value ? "hover" : "focus"}
              >
                <Form.Item
                  name={"workstation"}
                  label={"Posto de Trabalho"}
                  rules={[
                    {
                      required: fields[14].value,
                      message: "Obrigatório selecionar posto de trabalho",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    placeholder="Selecione Posto de Trabalho"
                    disabled={fields[14].value ? false : true}
                  ></Select>
                </Form.Item>
              </Tooltip>
            </Col>

            <Col span={12}>
              <fieldset className="modo-box">
                <legend>Modalidade</legend>
                <Form.Item
                  name={"transfJuridica"}
                  valuePropName="checked"
                  className="check-Mode"
                >
                  <Row>
                    <Checkbox>Transferência Juridica</Checkbox>
                  </Row>
                </Form.Item>
                <Form.Item
                  name={"branch"}
                  valuePropName="checked"
                  className="check-Mode"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const branchValue = getFieldValue("sind");
                        console.log(value + "  " + branchValue);
                        if (value && branchValue) {
                          notificationBranchSind();
                          return Promise.reject(
                            new Error(
                              "Sindicato e Filial não podem ser movimentadas juntas"
                            )
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <Row>
                    <Checkbox onChange={ChangeCheck}>Filial</Checkbox>
                  </Row>
                </Form.Item>
                <Form.Item
                  name={"CostCent"}
                  valuePropName="checked"
                  className="check-Mode"
                >
                  <Row>
                    <Checkbox>Centro de Custo</Checkbox>
                  </Row>
                </Form.Item>
                <Form.Item
                  name={"hierarchy"}
                  valuePropName="checked"
                  className="check-Mode"
                >
                  <Row>
                    <Checkbox>Hierarquia</Checkbox>
                  </Row>
                </Form.Item>

                <Form.Item
                  name={"workloc"}
                  valuePropName="checked"
                  className="check-Mode"
                >
                  <Row>
                    <Checkbox>Local de Trabalho</Checkbox>
                  </Row>
                </Form.Item>
                <Form.Item
                  name={"sind"}
                  valuePropName="checked"
                  className="check-Mode"
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        const branchValue = getFieldValue("branch");
                        if (value && branchValue) {
                          notificationBranchSind();
                          return Promise.reject(
                            new Error(
                              "Sindicato e Filial não podem ser movimentadas juntas"
                            )
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <Row>
                    <Checkbox>Sindicato</Checkbox>
                  </Row>
                </Form.Item>
                <Form.Item
                  name={"postW"}
                  valuePropName="checked"
                  className="check-Mode"
                >
                  <Row>
                    <Checkbox>Posto de Trabalho</Checkbox>
                  </Row>
                </Form.Item>
              </fieldset>
              <Form.Item
                name={"movimentDate"}
                label={"Data da Movimentação "}
                rules={[
                  {
                    required: true,
                    message:
                      "Obrigatório o preenchimento da data de movimentação",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value) {
                        const data = new Date();
                        if (data.getMonth() <= value._d.getMonth()) {
                          if (value._d.getDate() <= 5) {
                            const title = "Aviso";
                            const description =
                              "As solicitações de movimentação salarial devem ser requiridas e aprovadas até o dia 5 para entrar em vigência no mesmo mês. Após essa data, entrarão em vigência no mês seguinte.";
                            tableWarningStr(title, description);
                          } else if (
                            value._d.getDate() > 5 &&
                            value._d.getDate() <= 20
                          ) {
                            const title = "Aviso";
                            const description =
                              "Para entrar em vigor no mês seguinte, as solicitações devem ser feitas após dia 5 e antes do dia 20, inclusive sendo aprovadas até o dia 20. Caso contrário, somente entrarão em vigência no mês subsequente.";
                            tableWarningStr(title, description);
                          } else {
                            const title = "Aviso";
                            const description =
                              "As solicitações entrarão em vigência no mês subsequente.";
                            tableWarningStr(title, description);
                          }
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error("Data não pode ser em mês retroativo")
                          );
                        }
                      } else {
                        return Promise.reject(
                          new Error(
                            "Obrigatório o preenchimento da data de movimentação"
                          )
                        );
                      }
                    },
                  }),
                ]}
              >
                <DatePicker allowClear format="DD/MM/YYYY" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </fieldset>
    </>
  );
}
