import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateItemMutation } from "../../api/extendedItemApiSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/toastSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    name: yup
      .string()
      .min(5)
      .max(15)
      .required("name must be 5 - 15 characters."),
    description: yup
      .string()
      .min(20)
      .max(500)
      .required("description must be 20 - 500 characters."),

    price: yup
      .number()
      .positive()
      .integer()
      .lessThan(100000000000000)
      .required("price is required"),
    stockQuantity: yup
      .number()
      .positive()
      .integer()
      .moreThan(50)
      .lessThan(10000)
      .required("Stock quantity must be 50 - 10000"),
    mainImageUrl: yup.string().url().required("enter a valid image url"),
  })
  .required();

function UpdateItem() {
  let { itemId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [updateItem] = useUpdateItemMutation();

  const onUpdateItem = async (data) => {
    try {
      const payload = await updateItem({
        itemId: itemId,
        updatedItem: data,
      }).unwrap();
      dispatch(
        createToast({
          type: "success",
          description: "Updated your item!",
        })
      );
      navigate(`/sellers/me`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          description: "Oops something went wrong with updating the item",
        })
      );
      console.error("Update item Error: ", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={6}>
          <h1 className="mt-5">ShopHouse</h1>
          <h3>Update item</h3>
          <Form onSubmit={handleSubmit(onUpdateItem)}>
            <Form.Group className="mt-4 mb-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                {...register("name")}
              />
            </Form.Group>
            {errors.name && (
              <Alert variant="danger">{errors.name.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                {...register("description")}
              />
            </Form.Group>
            {errors.description && (
              <Alert variant="danger">{errors.description.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...register("price")}
              />
            </Form.Group>
            {errors.price && (
              <Alert variant="danger">{errors.price.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="stockQuantity">
              <Form.Label>Stock Quantity</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                {...register("stockQuantity")}
              />
            </Form.Group>
            {errors.stockQuantity && (
              <Alert variant="danger">{errors.stockQuantity.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="mainImageUrl">
              <Form.Label>Item Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Url"
                {...register("mainImageUrl")}
              />
            </Form.Group>
            {errors.mainImageUrl && (
              <Alert variant="danger">{errors.mainImageUrl.message}</Alert>
            )}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateItem;
