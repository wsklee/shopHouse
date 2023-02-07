import { useParams } from "react-router-dom";
import { Fragment } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";
import OrderItemsDetailed from "../components/order/OrderItemsDetailed";
import OrderDelivery from "../components/order/OrderDelivery";

import { useGetOrderQuery } from "../api/extendedOrderApiSlice";

function OrderInfo() {
  let { orderId } = useParams();
  const {
    data: order,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetOrderQuery(orderId);

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = (
      <Container>
        <h3>Order Detail</h3>
        <OrderItemsDetailed
          orderId={order.orderId}
          orderDate={order.orderDate}
          orderStatus={order.orderStatus}
          orderItems={order.orderItems}
          deliveryStatus={order.deliveryStatus}
          totalPrice={order.totalPrice}
        />
        <h3>Delivery</h3>
        <OrderDelivery
          name={order.name}
          address={order.address}
          deliveryStatus={order.deliveryStatus}
        />
      </Container>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <Fragment>{content}</Fragment>;
}

export default OrderInfo;
