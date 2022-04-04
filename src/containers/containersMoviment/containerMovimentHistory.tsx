import { Table } from "antd";
import "../containersCommonFile/container.css";

export default function ContainerMovimentHistory() {
  const data = [
    {
      id: "583336",
      before: "01/11/21",
      after: "Atual",
      modality: "Dissídio Coletivo",
      office: "Analista de Crédito e cobrança",
      wage: "R$ 6215,00",
    },
  ];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "key",
      width: "20%",
    },
    {
      title: "Vigência De",
      dataIndex: "before",
      key: "key",
      width: "20%",
    },
    {
      title: "Vigência Para",
      dataIndex: "after",
      key: "key",
      width: "20%",
    },
    {
      title: "Motivo/Modalidade",
      dataIndex: "modality",
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
      title: "Salário",
      dataIndex: "wage",
      key: "key",
      width: "20%",
    },
  ];

  return (
    <fieldset>
      <legend>Histórico das Movimentações do Colaborador</legend>
      <Table dataSource={data} columns={columns}></Table>
    </fieldset>
  );
}
