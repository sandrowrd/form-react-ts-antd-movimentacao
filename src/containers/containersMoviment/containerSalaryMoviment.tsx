import {
  Form,
  Row,
  Col,
  Select,
  DatePicker,
  Checkbox,
  InputNumber,
  Modal,
  notification,
  Button,
  Tooltip,
} from "antd";
import "../containersCommonFile/container.css";
import { useState, useEffect } from "react";
import { FieldData } from "../containersCommonFile/containerInterface";
import { WarningOutlined } from "@ant-design/icons";

let selectOption = {
  enaCar: true,
  enaPorcentagem: true,
  enaWork: true,
  enaRule: false,
  enaWage: true,
};

export default function ContainerSalaryMoviment(props) {
  const [fields, setFields] = useState<FieldData[]>([
    { name: "movimentType", value: "salarial" },
    { name: "modality", value: "" },
    { name: "movimentDateStr", value: "" },
    { name: "officeDestiny", value: "" },
    { name: "percentage", value: "" },
    { name: "workingDay", value: "" },
    { name: "startSalary", value: 1000 },
    { name: "finalSalary", value: 2500 },
  ]);

  const [modalityType, setModalityType] = useState(selectOption);
  const [enaModal, setEnaModal] = useState(false);
  const [enaModalPromo, setEnaModalPromo] = useState(false);
  const [enaModalEnquad, setEnaModalEnquad] = useState(false);
  const dateNow = new Date();
  const [form] = Form.useForm();
  const modalityTypeSalary = [
    "Promoção",
    "Promoção escalonada",
    "Mérito",
    "Enquadramento",
    "Incorporação de verbas",
    "Alteração de carga horária",
    "Função",
    "Ajuste de alvo",
    "Mudança de cargo sem reajuste salarial",
    "Processo seletivo interno",
  ];

  const funcOption = (option: string) => {
    if (option === "") {
      selectOption = {
        enaPorcentagem: true,
        enaCar: true,
        enaWork: true,
        enaRule: true,
        enaWage: true,
      };
    } else if (option === "percentage") {
      if (fields[0].value > 1000) {
        selectOption = {
          enaPorcentagem: false,
          enaCar: true,
          enaWork: true,
          enaRule: true,
          enaWage: true,
        };
      } else {
        selectOption = {
          enaPorcentagem: false,
          enaCar: true,
          enaWork: true,
          enaRule: true,
          enaWage: true,
        };
      }
    } else if (option === "escala") {
      selectOption = {
        enaPorcentagem: true,
        enaCar: true,
        enaWork: false,
        enaRule: true,
        enaWage: true,
      };
    } else if (option === "role") {
      selectOption = {
        enaPorcentagem: true,
        enaCar: false,
        enaWork: true,
        enaRule: true,
        enaWage: true,
      };
    } else if (option === "wage") {
      selectOption = {
        enaPorcentagem: true,
        enaCar: true,
        enaWork: true,
        enaRule: true,
        enaWage: false,
      };
    }
  };

  const chooseMode = (value) => {
    if (value === undefined) {
      funcOption("");
    } else if (value === "Ajuste de alvo") {
      funcOption("percentage");
    } else if (value === "Promoção" || value === "Processo seletivo interno") {
      setEnaModalPromo(true);
    } else if (
      value === "Mérito" ||
      value === "Promoção escalonada" ||
      value === "Incorporação de verbas" ||
      value === "Alteração de carga horária"
    ) {
      setEnaModal(true);
    } else if (
      value === "Função" ||
      value === "Mudança de cargo sem reajuste salarial"
    ) {
      funcOption("role");
    } else if (value === "Enquadramento") {
      setEnaModalEnquad(true);
    }
  };

  useEffect(() => {
    setModalityType(selectOption);
  }, [selectOption]);

  const tableWarning = (title, descript) => {
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

  const politicIncrease = () => {
    const currentWage = 800;
    const initialSalary = form.getFieldValue(["startSalary"]);
    const percIncrease = form.getFieldValue(["percentage"]);
    const modeSalary = form.getFieldValue(["modality"]);

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

    const title = "Política da empresa";
    const rangePromo = ", permitido aumento entre 5% a 30%. Favor corrigir.";
    const rangeMerito = ", permitido aumento entre 5% a 20%. Favor corrigir.";

    if (currentWage > initialSalary) {
      if (
        modeSalary === "Promoção" ||
        modeSalary === "Promoção escalonada" ||
        modeSalary === "Processo seletivo interno" ||
        modeSalary === "Incorporação de verbas" ||
        modeSalary === "Ajuste de alvo" ||
        modeSalary === "Processo seletivo interno"
      ) {
        if (percIncrease < 5) {
          const description =
            "Porcentagem abaixo da política da empresa. Salário acima da faixa inicial salarial" +
            rangePromo;
          tableWarning(title, description);

          return;
        } else if (percIncrease > 30) {
          const description =
            "Porcentagem acima da política da empresa. Salário acima da faixa inicial salarial" +
            rangePromo;
          tableWarning(title, description);
          return;
        }
      } else if (modeSalary === "Mérito") {
        if (percIncrease < 5) {
          const description =
            "Porcentagem abaixo da política da empresa. Salário acima da faixa inicial salarial" +
            rangeMerito;
          tableWarning(title, description);
          return;
        } else if (percIncrease > 20) {
          const description =
            "Porcentagem acima da política da empresa. Salário acima da faixa inicial salarial" +
            rangeMerito;
          tableWarning(title, description);
          return;
        }
      }
    } else if (currentWage < initialSalary) {
      if (
        modeSalary === "Promoção" ||
        modeSalary === "Promoção escalonada" ||
        modeSalary === "Processo seletivo interno" ||
        modeSalary === "Incorporação de verbas" ||
        modeSalary === "Ajuste de alvo" ||
        modeSalary === "Processo seletivo interno"
      ) {
        if (percIncrease < 5) {
          const description = "Porcentagem abaixo da política da empresa. ";
          tableWarning(title, description);
        } else if (percIncrease > 30) {
          const description =
            "Porcentagem acima de 30% será efetivado em 2 parcelas sendo a primeiro de 30% e o restante será efetivado após 90 dias. ";
          tableWarning(title, description);
        }
      } else if (modeSalary === "Mérito") {
        if (percIncrease < 5) {
          const description = "Porcentagem abaixo da política da empresa. ";
          tableWarning(title, description);
        } else if (percIncrease > 30) {
          const description =
            "Porcentagem acima de 20% será efetivado em 2 parcelas sendo a primeiro de 20% e o restante será efetivado após 90 dias. ";
          tableWarning(title, description);
        }
      }
    }
  };

  const handlePercentage = (e) => {
    const currentWage = 1200;
    const initialSalary = fields[0].value;
    const percIncrease = e;
    let percHigherInicialSalary = 0;

    politicIncrease();
    const currentWageAfter = currentWage * (percIncrease / 100 + 1);
    if (currentWageAfter > initialSalary) {
      percHigherInicialSalary = (currentWageAfter / initialSalary - 1) * 100;
    }
  };

  const handleOk = () => {
    funcOption("percentage");
    setEnaModal(false);
    setEnaModalEnquad(false);
    setEnaModalPromo(false);
  };

  const handleCancel = () => {
    funcOption("role");
    setEnaModal(false);
    setEnaModalEnquad(false);
    setEnaModalPromo(false);
  };

  const handleWage = () => {
    funcOption("wage");
    setEnaModal(false);
    setEnaModalEnquad(false);
    setEnaModalPromo(false);
  };

  const handleScale = () => {
    funcOption("escala");
    setEnaModal(false);
    setEnaModalEnquad(false);
    setEnaModalPromo(false);
  };

  return (
    <>
      <fieldset
        hidden={
          props.mode === "salarial" || fields[0].value === "salarial"
            ? false
            : true
        }
      >
        <legend>Movimentação</legend>
        <Form
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
          fields={fields}
          onValuesChange={(changedValues, allValues) => {}}
          onFieldsChange={(_, allFields) => {
            setModalityType(selectOption);

            setFields(allFields);
          }}
          name="salarialMoviment"
          form={form}
        >
          <div className="warningPanel">
            <ul>
              <li>
                <p>
                  As solicitações de movimentação salarial devem ser requiridas
                  e aprovadas até o dia 5 para entrar em vigência no mesmo mês.
                  Após essa data, entrarão em vigência no mês seguinte.
                </p>
              </li>
              <li>
                <p>
                  Para entrar em vigor no mês seguinte, as solicitações devem
                  ser feitas após dia 5 e antes do dia 20, inclusive sendo
                  aprovadas até o dia 20. Caso contrário, somente entrarão em
                  vigência no mês subsequente.
                </p>
              </li>
              <li
                hidden={
                  fields[1].value === "Promoção" ||
                  fields[1].value === "Promoção escalonada" ||
                  fields[1].value === "Enquadramento" ||
                  fields[1].value === "Ajuste de alvo" ||
                  fields[1].value === "Processo seletivo interno"
                    ? false
                    : true
                }
              >
                <p>
                  A porcentagem permitida para o colaborador acima da faixa
                  salarial inicial é entre 5% a 30%.
                </p>
              </li>
              <li hidden={fields[1].value === "Mérito" ? false : true}>
                <p>
                  A porcentagem permitida para o colaborador acima da faixa
                  salarial inicial é entre 5% a 20%.
                </p>
              </li>
              <li
                hidden={
                  fields[1].value === "Promoção" ||
                  fields[1].value === "Promoção escalonada" ||
                  fields[1].value === "Enquadramento" ||
                  fields[1].value === "Ajuste de alvo" ||
                  fields[1].value === "Processo seletivo interno"
                    ? false
                    : true
                }
              >
                <p>
                  Caso esteja abaixo da faixa salarial poderá ter aumento
                  superior a 30% que será parcelado em 2, sendo a primeira de
                  30% e a segunda com o valor restante após 90 dias.
                </p>
              </li>
              <li hidden={fields[1].value === "Mérito" ? false : true}>
                <p>
                  Caso esteja abaixo da faixa salarial poderá ter aumento
                  superior a 20% que será parcelado em 2, sendo a primeira de
                  20% e a segunda com o valor restante após 90 dias.
                </p>
              </li>
              <li hidden={fields[1].value === "Promoção" ? false : true}>
                <p>
                  Caso a proposta salarial seja superior a Política de Salários
                  da empresa utilizar a opção de Promoção Escalonada
                </p>
              </li>
              <li hidden={fields[1].value === "Enquadramento" ? false : true}>
                <p>
                  Se houver ajuste de Jornada o valor hora poderá ser afetado.
                </p>
              </li>
              <p>
                <Checkbox>Declaro que li todas as regras acima.</Checkbox>
              </p>
            </ul>
          </div>
          <Row gutter={20}>
            <Col span={11}>
              <Form.Item name={"movimentType"} label={"Tipo de Movimentação"}>
                <Select
                  placeholder="Selecione Movimentação"
                  defaultValue="salarial"
                >
                  <Select.Option value="salarial">Salarial</Select.Option>
                  <Select.Option value="estrutural">Estrutural</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={13}>
              <Tooltip title="Selecionar a modadalidade de movimentação salarial.">
                <Form.Item name={"modality"} label={"Modalidade"}>
                  <Select
                    allowClear
                    placeholder="Selecione Modalidade"
                    onChange={chooseMode}
                  >
                    {modalityTypeSalary.map((value, index) => {
                      return (
                        <Select.Option key={index} value={value}>
                          {value}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={11}>
              <Form.Item
                name={"movimentDateStr"}
                label={"Data da Movimentação "}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value) {
                        const data = new Date();

                        if (data.getMonth() <= value._d.getMonth()) {
                          console.log(data.getDate());
                          if (value._d.getDate() <= 5) {
                            const title = "Aviso";
                            const description =
                              "As solicitações de movimentação salarial devem ser requiridas e aprovadas até o dia 5 para entrar em vigência no mesmo mês. Após essa data, entrarão em vigência no mês seguinte.";
                            tableWarning(title, description);
                          } else if (
                            value._d.getDate() > 5 &&
                            value._d.getDate() <= 20
                          ) {
                            const title = "Aviso";
                            const description =
                              "Para entrar em vigor no mês seguinte, as solicitações devem ser feitas após dia 5 e antes do dia 20, inclusive sendo aprovadas até o dia 20. Caso contrário, somente entrarão em vigência no mês subsequente.";
                            tableWarning(title, description);
                          } else {
                            const title = "Aviso";
                            const description =
                              "As solicitações entrarão em vigência no mês subsequente.";
                            tableWarning(title, description);
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
            <Col span={13}>
              <Tooltip
                title="Selecione o cargo/posto de destino."
                trigger={modalityType.enaCar ? "focus" : "hover"}
              >
                <Form.Item
                  name={"officeDestiny"}
                  label={"Cargo/Posto Destino"}
                  rules={[
                    {
                      required: modalityType.enaCar ? false : true,
                      message:
                        "Obrigatório selecionar o cargo/posto de destino",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Posto de Destino"
                    disabled={modalityType.enaCar}
                  ></Select>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={11}>
              <Tooltip
                title="O valor da porcentagem deve estar dentro da política da empresa."
                trigger={modalityType.enaPorcentagem ? "focus" : "hover"}
              >
                <Form.Item
                  name={"percentage"}
                  label={"Porcentagem "}
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (getFieldValue("startSalary") > 800) {
                          return Promise.resolve();
                        }
                        return Promise.reject({
                          warningOnly: true,
                          message: "Salario acima da faixa salarial inicial ok",
                        });
                      },
                    }),
                    {
                      required: modalityType.enaPorcentagem ? false : true,
                      message:
                        "Obrigatório o preenchimento do valor da porcentagem",
                    },
                  ]}
                >
                  <InputNumber
                    placeholder="Porcentagem"
                    min={0}
                    max={100}
                    disabled={modalityType.enaPorcentagem}
                    addonAfter="%"
                    onPressEnter={handlePercentage}
                  />
                </Form.Item>
              </Tooltip>
            </Col>
            <Col span={13}>
              <Tooltip
                title="Selecione a Jornada de trabalho."
                trigger={modalityType.enaWork ? "focus" : "hover"}
              >
                <Form.Item
                  name={"workingDay"}
                  label={"Jornada de Trabalho"}
                  rules={[
                    {
                      required: modalityType.enaWork ? false : true,
                      message:
                        "Obrigatório o preenchimento do valor da porcentagem",
                    },
                  ]}
                >
                  <Select
                    allowClear
                    showSearch
                    placeholder="Jornada de Trabalho"
                    disabled={modalityType.enaWork}
                  ></Select>
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={11}>
              <Tooltip
                title="Informe o valor do novo salário"
                trigger={modalityType.enaWage ? "focus" : "hover"}
              >
                <Form.Item
                  name={"wage"}
                  label={"Salário"}
                  rules={[
                    {
                      required: modalityType.enaWage ? false : true,
                      message: "Obrigatório o preenchimento do novo salário",
                    },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        const finalWage = getFieldValue("finalSalary");
                        if (value <= finalWage) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error(
                              "Valor não permitido. Valor acima da faixa salarial final. Favor corrigir."
                            )
                          );
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    disabled={modalityType.enaWage}
                    addonBefore="R$"
                  />
                </Form.Item>
              </Tooltip>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={11}>
              <Form.Item name={"startSalary"} label={"Faixa Salarial Inicial"}>
                <InputNumber readOnly addonBefore="R$" />
              </Form.Item>
            </Col>
            <Col span={13}>
              <Form.Item name={"finalSalary"} label={"Faixa Salarial Final"}>
                <InputNumber readOnly addonBefore="R$" />
              </Form.Item>
            </Col>
          </Row>
          <Modal
            title="Escolha uma das opções."
            visible={enaModalPromo}
            footer={[
              <Button type="primary" onClick={handleOk}>
                % de ajuste salarial
              </Button>,
              <Button type="primary" onClick={handleWage}>
                Novo salário
              </Button>,
              <Button type="primary" onClick={handleScale}>
                Novo Cargo e Posição
              </Button>,
            ]}
            centered
            closable
          />
          <Modal
            title="Escolha uma das opções."
            onOk={handleOk}
            onCancel={handleWage}
            okText="% de ajuste salarial"
            cancelText="Novo Salário"
            visible={enaModal}
            okButtonProps={{ type: "primary" }}
            cancelButtonProps={{ type: "primary" }}
            centered
            closable
          />

          <Modal
            title="Escolha uma das opções."
            visible={enaModalEnquad}
            footer={[
              <Button type="primary" onClick={handleOk}>
                % de Ajuste Salarial
              </Button>,
              <Button type="primary" onClick={handleWage}>
                Novo Salário
              </Button>,
              <Button type="primary" onClick={handleCancel}>
                Novo Cargo e Posição
              </Button>,
              <Button type="primary" onClick={handleScale}>
                Nova Jornada de Trabalho
              </Button>,
            ]}
            width={900}
            closable
          />
        </Form>
      </fieldset>
    </>
  );
}
