import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import "./CartItem.css";
import {
  useUpdateCartMutation,
  useDeleteCartMutation,
} from "../../api/extendedCartApiSlice";

function CartItem(props) {
  const [
    updateCart,
    {
      isError: isErrorUpdate,
      isLoading: isLoadingUpdate,
      isSuccess: isSuccessUpdate,
    },
  ] = useUpdateCartMutation();

  const [
    deleteCart,
    {
      isError: isErrorDelete,
      isLoading: isLoadingDelete,
      isSuccess: isSuccessDelete,
    },
  ] = useDeleteCartMutation();

  const onUpdateCart = async (data) => {
    try {
      const payload = await updateCart({
        cartId: props.cartId,
        updatedCart: { itemCount: data },
      }).unwrap();
    } catch (err) {
      console.error("Update cart Error: ", err);
    }
  };

  const onDeleteCart = async () => {
    try {
      const payload = await deleteCart({
        cartId: props.cartId,
      }).unwrap();
    } catch (err) {
      console.error("Delete cart Error: ", err);
    }
  };

  let content = (
    <Row className="mb-4 ">
      <Col>
        <Card>
          <Card.Body>
            <Row>
              <Col xs={8}>
                <h2 className="fw-light">{props.itemName}</h2>
                <h1 className="fw-bold">{props.itemPrice}</h1>
                <h2 className="fw-light">
                  Current Quantity : {props.itemCount}
                </h2>
              </Col>
              <Col xs={4}>
                <Image
                  className="mw-100 cart-image"
                  rounded
                  src={props.itemMainImageUrl}
                  alt="Item image"
                />
              </Col>
            </Row>

            <hr />

            <Row>
              <Col xs={12} md={8}>
                <div className="my-2 w-50">
                  <InputGroup>
                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const updatedItemCount = props.itemCount - 1;
                        updatedItemCount === 0
                          ? onDeleteCart()
                          : onUpdateCart(updatedItemCount);
                      }}
                    >
                      -
                    </Button>
                    <Form.Control disabled value={props.itemCount} />

                    <Button
                      variant="outline-secondary"
                      onClick={() => {
                        const updatedItemCount = props.itemCount + 1;
                        onUpdateCart(updatedItemCount);
                      }}
                    >
                      +
                    </Button>
                  </InputGroup>
                </div>
                <Row>
                  <Col>
                    <Button
                      variant="btn btn-danger"
                      onClick={() => onDeleteCart()}
                    >
                      Delete from Cart
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );

  return <div>{content}</div>;
}

export default CartItem;
