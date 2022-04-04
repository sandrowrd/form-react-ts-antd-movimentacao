import { Input, Form, Table, Button, Row, Col, Tooltip } from "antd";
import "./container.css";
import { useState } from "react";
import { FieldData } from "./containerInterface";

function ContainerObservation() {
  const [fields, setFields] = useState<FieldData[]>([
    { name: "approver", value: "" },
  ]);

  const [dataSource, setDataSource] = useState([
    {
      key: "",
      usu: "",
      dateTime: "",
      role: "",
      description: "",
    },
  ]);

  const [count, setCount] = useState(0);

  const columns = [
    {
      title: "Nome",
      dataIndex: "usu",
      key: "key",
      width: "20%",
    },
    {
      title: "Cargo",
      dataIndex: "office",
      key: "key",
      width: "20%",
    },
    {
      title: "Data/Hora",
      dataIndex: "dateTime",
      key: "key",
      width: "20%",
    },
    {
      title: "Papel",
      dataIndex: "paper",
      key: "key",
      width: "20%",
    },
    {
      title: "Observações",
      dataIndex: "description",
      key: "key",
      width: "20%",
    },
  ];

  interface obsItem {
    key: string;
    usu: string;
    dateTime: string;
    role: string;
    description: string;
  }

  const onFinish = (values: string) => {
    const now = new Date();
    const newObs: obsItem = {
      key: count.toString(),
      usu: values["approver"],
      dateTime: now.toLocaleString("en-GB", { timeZone: "UTC" }),
      role: "",
      description: values["descriptionApp"],
    };

    setCount((prev) => prev + 1);
    setDataSource((prev) => {
      return [newObs, ...prev];
    });
  };

  return (
    <>
      <fieldset>
        <legend>Observações</legend>
        <Form
          fields={fields}
          onFieldsChange={(_, allFields) => {}}
          onFinish={onFinish}
        >
          <Row gutter={20}>
            <Col span={20}>
              <Form.Item
                name={"approver"}
                label={"Aprovador"}
                labelAlign="left"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 10 }}
              >
                <Input style={{ marginLeft: "25px" }} />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item labelAlign="right">
                <Button block type="primary" htmlType="submit">
                  Gravar
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Tooltip title="Campo opcional para acrescentar observações. Após digitar pressionar tecla 'Gravar'.">
            <Form.Item
              name={"descriptionApp"}
              label={"Observações"}
              labelAlign="left"
              labelCol={{ span: 4 }}
            >
              <Input.TextArea showCount maxLength={150} />
            </Form.Item>
          </Tooltip>
          <Form.Item label={"Histórico"} labelAlign="left">
            <Table dataSource={dataSource} columns={columns}></Table>
          </Form.Item>
        </Form>
      </fieldset>
    </>
  );
}

export default ContainerObservation;
