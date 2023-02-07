import { Fragment } from "react";
import { NavLink } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import AlertExtraContent from "../../components/shared/AlertExtraContent";

import { useGetLoggedInSellerOrdersQuery } from "../../api/apiSlice";

function MySellerOrders() {
  const {
    data: sellerOrders,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetLoggedInSellerOrdersQuery();

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    content = (
      <Fragment>
        {sellerOrders.data
          .slice()
          .reverse()
          .map((orderItem) => (
            <Row key={orderItem.orderItemId} className="mt-3">
              <ListGroup as="ul">
                <ListGroup.Item as="li" variant="primary">
                  Order date : {orderItem.orderDate}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Order Item id : {orderItem.orderItemId}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Item id : {orderItem.itemId}
                </ListGroup.Item>
                <ListGroup.Item as="li">Item : {orderItem.name}</ListGroup.Item>
                <ListGroup.Item as="li">
                  Price : {orderItem.orderPrice}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Quantity: {orderItem.count}
                </ListGroup.Item>
                <ListGroup.Item as="li">
                  Address:{" "}
                  {`${orderItem.address.city} - ${orderItem.address.street} - ${orderItem.address.zipcode}`}
                </ListGroup.Item>
              </ListGroup>
            </Row>
          ))}
      </Fragment>
    );
  } else if (isError) {
    content = (
      <AlertExtraContent
        variant="danger"
        heading="Oh snap! You got an error!"
        content={"Failed to fetch the resource from server"}
      />
    );
  }

  return (
    <Container>
      <Row>
        <Col md={3}>
          <Row>
            <h2>Seller Orders</h2>
            <Button
              variant="btn btn-outline-primary"
              to={`/sellers/me`}
              as={NavLink}
            >
              Go back to Seller Profile
            </Button>
          </Row>
        </Col>
        <Col md={1}></Col>
        <Col md={8}>
          <p className="fw-bold">Order History</p>
          {content}
        </Col>
      </Row>
    </Container>
  );
}

export default MySellerOrders;
