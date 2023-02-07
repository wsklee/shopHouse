import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function OrderDelivery(props) {
  return (
    <ListGroup className="mb-4">
      <ListGroup.Item>Delivery Information</ListGroup.Item>
      <ListGroup.Item>Delivery Status : {props.deliveryStatus}</ListGroup.Item>
      <ListGroup.Item>
        <Row>
          <Col>
            <p>Person Receiving: {props.name}</p>
            <p>Address</p>
            <p>City : {props.address.city}</p>
            <p>Street : {props.address.street}</p>
            <p>Zipcode : {props.address.zipcode}</p>
          </Col>
        </Row>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default OrderDelivery;
