import ContainerIdentify from "../containers/containersCommonFile/containerIdentify";
import ContainerEmployee from "../containers/containersCommonFile/containeEmployee";
import ContainerMovimentHistory from "../containers/containersMoviment/containerMovimentHistory";
import ContainerSalaryMoviment from "../containers/containersMoviment/containerSalaryMoviment";
import ContainerStructuralMoviment from "../containers/containersMoviment/containerStructuralMoviment";
import ContainerObservation from "../containers/containersCommonFile/containerObservation";
import { Form } from "antd";
import { useState } from "react";

export default function FormPageMovimentation() {
  const [selectMode, setSelectMode] = useState("salarial");

  return (
    <>
      <div>
        <ContainerIdentify />
        <ContainerEmployee />
        <ContainerMovimentHistory />
        <Form.Provider
          onFormChange={(name, { changedFields, forms }) => {
            if (
              name === "salarialMoviment" &&
              changedFields[0].name[0] === "movimentType"
            ) {
              const { structuralMoviment } = forms;
              structuralMoviment.setFieldsValue({
                movimentType: changedFields[0].value,
              });
            } else if (
              name === "structuralMoviment" &&
              changedFields[0].name[0] === "movimentType"
            ) {
              const { salarialMoviment } = forms;
              salarialMoviment.setFieldsValue({
                movimentType: changedFields[0].value,
              });
            }
            setSelectMode(changedFields[0].value);
          }}
        >
          <ContainerSalaryMoviment mode={selectMode} />
          <ContainerStructuralMoviment mode={selectMode} />
        </Form.Provider>
        <ContainerObservation />
      </div>
    </>
  );
}
