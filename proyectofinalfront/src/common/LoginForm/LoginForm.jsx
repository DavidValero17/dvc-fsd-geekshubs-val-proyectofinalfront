import Form from "react-bootstrap/Form";

export const InputLogin = ({
  type,
  name,
  placeholder,
  changeFunction,
  blurFunction,
}) => {
  return (
    <Form.Control
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={(e) => changeFunction(e)}
      onBlur={(e) => blurFunction(e)}
    />
  );
};
