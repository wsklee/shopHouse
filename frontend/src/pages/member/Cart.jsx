import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/toastSlice";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import CartItem from "../../components/cart/CartItem";
import {
  useGetCartsQuery,
  useDeleteAllCartMutation,
} from "../../api/extendedCartApiSlice";
import { useAddNewOrderMutation } from "../../api/extendedOrderApiSlice";
import * as yup from "yup";

const schemaOrder = yup
  .object()
  .shape({
    itemIdQuantityList: yup
      .array()
      .of(
        yup.object().shape({
          itemId: yup.number().positive().integer().required(),
          itemCount: yup.number().positive().integer().required(),
        })
      )
      .required("Enter items"),
  })
  .required();

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addNewOrder, { isError: isErrorOrder }] = useAddNewOrderMutation();
  const [deleteAllCart, { isError: isErrorCart }] = useDeleteAllCartMutation();
  const {
    data: carts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCartsQuery();

  const onSaveOrderFromCart = async (carts) => {
    try {
      const mappedCarts = carts.data.map((cart) => ({
        itemId: cart.itemId,
        itemCount: cart.itemCount,
      }));
      const data = {
        itemIdQuantityList: mappedCarts,
      };
      const validatedData = await schemaOrder.validate(data);
      const payload = await addNewOrder(validatedData).unwrap();
      const orderId = payload.orderId;
      const payloadDelete = await deleteAllCart();
      dispatch(
        createToast({
          type: "success",
          description: "Created new order from Cart!",
        })
      );
      navigate(`/orders/${orderId}`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          description: "Oops something went wrong with creating the order",
        })
      );
      console.error("Error: ", err);
    }
  };

  let content;

  if (isLoading) {
    content = (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else if (isSuccess) {
    if (!Array.isArray(carts.data) || !carts.data.length) {
      content = (
        <Fragment>
          <Container>
            <h2 className="fw-light">Cart is Empty!</h2>
          </Container>
        </Fragment>
      );
    } else {
      content = (
        <Fragment>
          <Container>
            {carts.data.map((cart) => (
              <CartItem
                key={cart.cartId}
                cartId={cart.cartId}
                itemId={cart.itemId}
                itemName={cart.itemName}
                itemMainImageUrl={cart.itemMainImageUrl}
                itemPrice={cart.itemPrice}
                itemCount={cart.itemCount}
              />
            ))}
            <Card>
              <Card.Header>Order here</Card.Header>
              <Card.Body>
                <h3>Total Price : {carts.totalPrice}</h3>
                <Button
                  variant="btn btn-primary btn-lg"
                  onClick={() => onSaveOrderFromCart(carts)}
                >
                  Order Now
                </Button>
              </Card.Body>
            </Card>
          </Container>
        </Fragment>
      );
    }
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }
  return <div>{content}</div>;
}

export default Cart;
