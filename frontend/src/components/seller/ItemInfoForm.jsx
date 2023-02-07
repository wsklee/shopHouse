import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../../store/authSlice";
import classNames from "classnames";

import { useAddNewOrderMutation } from "../../api/extendedOrderApiSlice";
import { useAddNewCartMutation } from "../../api/extendedCartApiSlice";
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

const schemaCart = yup
  .object()
  .shape({
    newCart: yup.object().shape({
      itemId: yup.number().positive().integer().required("Enter a valid item"),
      itemCount: yup
        .number()
        .positive()
        .integer()
        .required("Enter a valid item count"),
    }),
  })
  .required();

function ItemInfoForm(props) {
  const token = useSelector(selectCurrentToken);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [addNewOrder, { isError }] = useAddNewOrderMutation();
  const [addNewCart, { isError: isErrorCart }] = useAddNewCartMutation();

  const onSaveOrder = async (data) => {
    try {
      const validatedData = await schemaOrder.validate(data);
      const payload = await addNewOrder(validatedData).unwrap();
      const orderId = payload.orderId;
      navigate(`/orders/${orderId}`);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  const onSaveCart = async (data) => {
    try {
      const validatedData = await schemaCart.validate(data);
      const payload = await addNewCart(validatedData).unwrap();
      const cartId = payload.cartId;
      navigate(`/members/cart`);
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div>
      <div className="my-2 w-50">
        <InputGroup>
          <Button
            variant="outline-secondary"
            onClick={() => {
              const newCount = count - 1;
              newCount === 0 ? setCount(1) : setCount(newCount);
            }}
          >
            -
          </Button>
          <Form.Control disabled value={count} />

          <Button
            variant="outline-secondary"
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +
          </Button>
        </InputGroup>
      </div>
      <p className="mb-2 fw-bold">Total Price : {count * props.price}</p>

      <div>
        <Button
          variant="btn btn-outline-primary btn-lg"
          className={classNames("me-4")}
          onClick={() => {
            if (!token) {
              navigate("/auth/login");
            } else {
              onSaveCart({
                newCart: { itemId: props.itemId, itemCount: count },
              });
            }
          }}
        >
          Add to Cart
        </Button>
        <Button
          variant="btn btn-primary btn-lg"
          onClick={() => {
            if (!token) {
              navigate("/auth/login");
            } else {
              onSaveOrder({
                itemIdQuantityList: [
                  { itemId: props.itemId, itemCount: count },
                ],
              });
            }
          }}
        >
          Order Now
        </Button>
      </div>
    </div>
  );
}

export default ItemInfoForm;
