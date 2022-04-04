import { Input, Form, Row, Col, Select, DatePicker, Checkbox } from "antd";
import "../containersCommonFile/container.css";
import { useState } from "react";
import { FieldData } from "../containersCommonFile/containerInterface";

export default function ContainerMoviment() {
  const [fields, setFields] = useState<FieldData[]>([
    { name: ["approver"], value: "teste" },
  ]);

  const [modalityType, setModalityType] = useState("salarial");

  const modalityTypeSalary = [
    "Promoção",
    "Promoção escalonada",
    "Mérito",
    "Enquadramento",
    "Incorporação de verbas",
    "Ampliação de carga horária",
    "Função",
    "Ajuste de alvo",
    "Mudança de cargo sem reajuste salarial",
    "Processo seletivo interno",
  ];

  const CustomizedFormMov = ({ onChange, fields }) => (
    <Form
      labelCol={{ span: 12 }}
      wrapperCol={{ span: 12 }}
      labelAlign="left"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        console.log(allFields);
      }}
    >
      <div className="warningPanel">
        <ul>
          <li>
            <p>
              As solicitações de movimentação salarial devem ser requiridas e
              aprovadas até o dia 5 para entrar em vigência no mesmo mês. Após
              essa data, entrarão em vigência no mês seguinte.
            </p>
          </li>
          <li>
            <p>
              A porcentagem permitida para o colaborador acima da faixa salarial
              inicial é entre 5% a e0%.
            </p>
          </li>
          <li>
            <p>
              Caso esteja abaixo da faixa salarial poderá ter aumento superior a
              30% que será parcelado em 2, sendo a primeira de 30% e a segunda
              com o valor restante após 90 dias.
            </p>
            <p>
              <Checkbox>Declaro que li todas as regras acima.</Checkbox>
            </p>
          </li>
        </ul>
      </div>
      <Row gutter={20}>
        <Col span={14}>
          <Form.Item name={["modality"]} label={"Modalidade"}>
            <Select allowClear placeholder="Selecione Modalidade">
              {modalityTypeSalary.map((value, index) => {
                return (
                  <Select.Option key={index} value={value}>
                    {value}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={["movimentDate"]} label={"Data da Movimentação "}>
            <DatePicker allowClear format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={14}>
          <Form.Item name={["officeDestiny"]} label={"Cargo/Posto Destino"}>
            <Select
              allowClear
              showSearch
              placeholder="Posto de Destino"
            ></Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item name={["percentagem"]} label={"Porcentagem "}>
            <Input placeholder="Porcentagem" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={10}>
        <Col span={20}>
          <Form.Item name={["workingDay"]} label={"Jornada de Trabalho"}>
            <Select
              allowClear
              showSearch
              placeholder="Jornada de Trabalho"
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item name={["startSalary"]} label={"Faixa Salarial Inicial"}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name={["finalSalary"]} label={"Faixa Salarial Final"}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const CustomizedFormStructuralMove = () => (
    <Form labelCol={{ span: 12 }} wrapperCol={{ span: 12 }} labelAlign="left">
      <div className="warningPanel">
        <ul>
          <li>
            <p>
              As solicitações de movimentação salarial devem ser requiridas e
              aprovadas até o dia 5 para entrar em vigência no mesmo mês. Após
              essa data, entrarão em vigência no mês seguinte.
            </p>
          </li>

          <p>
            <Checkbox>Declaro que li todas as regras acima.</Checkbox>
          </p>
        </ul>
      </div>
      <Row gutter={20}>
        <Col span={12}>
          <Form.Item name={["company"]} label={"Empresa"}>
            <Select allowClear placeholder="Selecione Empresa"></Select>
          </Form.Item>
          <Form.Item name={["subsidiary"]} label={"Filial"}>
            <Select allowClear placeholder="Selecione Filial"></Select>
          </Form.Item>
          <Form.Item name={["costCenter"]} label={"Centro de Custo"}>
            <Select allowClear placeholder="Selecione Centro de Custo"></Select>
          </Form.Item>
          <Form.Item name={["manager"]} label={"Gestor"}>
            <Select allowClear placeholder="Selecione Gestor"></Select>
          </Form.Item>
          <Form.Item name={["workplace"]} label={"Local de Trabalho"}>
            <Select
              allowClear
              placeholder="Selecione Local de Trabalho"
            ></Select>
          </Form.Item>
          <Form.Item name={["syndicate"]} label={"Sindicato"}>
            <Select allowClear placeholder="Selecione Sindicato"></Select>
          </Form.Item>
          <Form.Item name={["movimentType"]} label={"Posto de Trabalho"}>
            <Select
              allowClear
              placeholder="Selecione Posto de Trabalho"
            ></Select>
          </Form.Item>
        </Col>

        <Col span={12}>
          <fieldset className="modoBox">
            <legend>Modalidade</legend>
            <Checkbox value="transfJuridica" className="modoItem">
              Transferência Juridica
            </Checkbox>

            <Checkbox value="CostCent" className="modoItem">
              Centro de Custo
            </Checkbox>

            <Checkbox value="hierarchy" className="modoItem">
              Hierarquia
            </Checkbox>

            <Checkbox value="branch" className="modoItem">
              Filial
            </Checkbox>

            <Checkbox value="workloc" className="modoItem">
              Local de Trabalho
            </Checkbox>

            <Checkbox value="sind" className="modoItem">
              Sindicato
            </Checkbox>

            <Checkbox value="postW" className="modoItem">
              Posto de Trabalho
            </Checkbox>
          </fieldset>
          <Form.Item name={["movimentDate"]} label={"Data da Movimentação "}>
            <DatePicker allowClear format="DD/MM/YYYY" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );

  const ModalityPage = () => (
    <>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 10 }} labelAlign="left">
        <Form.Item name={["movimentType"]} label={"Tipo de Movimentação"}>
          <Select
            allowClear
            placeholder="Selecione Movimentação"
            onChange={(value) => {
              setModalityType(value);
              console.log(modalityType);
            }}
            defaultValue="salarial"
          >
            <Select.Option value="salarial">Salarial</Select.Option>
            <Select.Option value="estrutural">Estrutural</Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <div hidden={modalityType === "estrutural" ? false : true}>
        <CustomizedFormStructuralMove />
      </div>
      <div hidden={modalityType === "salarial" ? false : true}>
        <CustomizedFormMov
          fields={fields}
          onChange={(newFields) => {
            setFields(newFields);
          }}
        />
      </div>
    </>
  );

  return (
    <>
      <fieldset>
        <legend>Movimentação</legend>
        <ModalityPage />
      </fieldset>
    </>
  );
}
