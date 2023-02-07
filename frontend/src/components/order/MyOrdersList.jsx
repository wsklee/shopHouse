import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import { NavLink } from "react-router-dom";
import styles from "./MyOrdersList.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function MyOrdersList(props) {
  return (
    <ListGroup className="mb-4">
      <ListGroup.Item to={`/orders/${props.orderId}`} as={NavLink}>
        {props.orderDate}
      </ListGroup.Item>
      <ListGroup.Item>{props.orderStatus}</ListGroup.Item>

      {props.orderItems.map((orderItem) => (
        <ListGroup.Item key={orderItem.itemName}>
          <Row>
            <Col xs={8}>
              <h2 className="fw-light">{orderItem.itemName}</h2>
              <p className=" text-muted">Quantity : {orderItem.count}</p>
              <h2 className="fw-bold">{orderItem.orderPrice}</h2>
            </Col>
            <Col xs={4}>
              <Image
                className={cx("orderslist-item-image")}
                rounded
                src={orderItem.itemImageUrl}
                alt="Item image"
              />
            </Col>
          </Row>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <p className="fw-bold">Total Price : {props.totalPrice}</p>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default MyOrdersList;
