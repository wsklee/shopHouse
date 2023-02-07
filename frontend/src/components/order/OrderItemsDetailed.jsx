import { useCancelOrderMutation } from "../../api/extendedOrderApiSlice";
import { useNavigate, NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import styles from "./MyOrdersList.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function OrderItemsDetailed(props) {
  const navigate = useNavigate();
  const ableToCancelOrder =
    props.orderStatus === "ORDER" && props.deliveryStatus === "READY";
  const ableToWriteReview = props.orderStatus === "ORDER";
  const [cancelOrder, { isError, isLoading, isSuccess }] =
    useCancelOrderMutation();

  const onCancelOrder = async () => {
    try {
      const payload = await cancelOrder(props.orderId).unwrap();
    } catch (err) {
      console.error("Cancel order Error: ", err);
    }
  };

  return (
    <ListGroup className="mb-4">
      <ListGroup.Item>Order Id : {props.orderId}</ListGroup.Item>
      <ListGroup.Item>Date : {props.orderDate}</ListGroup.Item>
      <ListGroup.Item>
        <p>Order Status : {props.orderStatus}</p>
        {ableToCancelOrder && (
          <Button
            variant="btn btn-outline-danger"
            onClick={() => onCancelOrder()}
          >
            Cancel Order
          </Button>
        )}
      </ListGroup.Item>

      {props.orderItems.map((orderItem) => (
        <ListGroup.Item key={orderItem.itemName}>
          <Row>
            <Col xs={8}>
              <h2 className="fw-light">{orderItem.itemName}</h2>
              <p className=" text-muted">Quantity : {orderItem.count}</p>
              <h2 className="fw-bold">{orderItem.orderPrice}</h2>
              {ableToWriteReview && (
                <Button
                  variant="btn btn-outline-primary"
                  to={`/items/${orderItem.itemId}/reviews/create`}
                  as={NavLink}
                >
                  Write Review
                </Button>
              )}
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
        <h3>Total Price : {props.totalPrice}</h3>
      </ListGroup.Item>
    </ListGroup>
  );
}

export default OrderItemsDetailed;
