import Alert from "react-bootstrap/Alert";

function AlertExtraContent(props) {
  return (
    <Alert variant={props.variant}>
      <Alert.Heading>{props.heading}</Alert.Heading>
      <p>{props.content}</p>
    </Alert>
  );
}

export default AlertExtraContent;
