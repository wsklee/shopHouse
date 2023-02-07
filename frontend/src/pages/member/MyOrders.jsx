import Spinner from "react-bootstrap/Spinner";
import { Container } from "react-bootstrap";
import MyOrdersList from "../../components/order/MyOrdersList";

import { useGetMemberOrdersQuery } from "../../api/extendedOrderApiSlice";

function MyOrders() {
  const {
    data: memberOrders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMemberOrdersQuery();

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = memberOrders.data
      .slice()
      .reverse()
      .map((memberOrder) => (
        <MyOrdersList
          key={memberOrder.orderId}
          orderId={memberOrder.orderId}
          orderDate={memberOrder.orderDate}
          orderStatus={memberOrder.orderStatus}
          orderItems={memberOrder.orderItems}
          totalPrice={memberOrder.totalPrice}
        />
      ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <Container>
      <h3>My Orders</h3>
      {content}
    </Container>
  );
}

export default MyOrders;
