import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/toastSlice";
import { useAddNewSellerMutation } from "../../api/apiSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    companyEmail: yup.string().email().required("email is required"),
    companyName: yup
      .string()
      .min(4)
      .max(15)
      .required("name must be 4 - 15 characters."),
    companyImageUrl: yup.string().url().required("enter a valid image url"),
  })
  .required();

function SellerSignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addNewSeller, { isError, isLoading, isSuccess }] =
    useAddNewSellerMutation();

  const onSaveSeller = async (data) => {
    try {
      const payload = await addNewSeller({ ...data }).unwrap();
      const sellerId = payload.id;
      dispatch(
        createToast({
          type: "success",
          heading: "Welcome new shopHouse seller!",
          description: "Successful Seller Sign up ",
        })
      );
      navigate(`/sellers/me`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          description: "Oh no. Something went wrong with your sign up",
        })
      );
      console.error("Error: ", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ resolver: yupResolver(schema) });

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={4}>
          <h1 className="mt-5">ShopHouse</h1>
          <h3>Seller Sign up</h3>
          <Form onSubmit={handleSubmit(onSaveSeller)}>
            <Form.Group className="mt-4 mb-2" controlId="companyEmail">
              <Form.Label>Seller Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter seller email"
                {...register("companyEmail")}
              />
            </Form.Group>
            {errors.companyEmail && (
              <Alert variant="danger">{errors.companyEmail.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="companyName">
              <Form.Label>Seller Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter seller name"
                {...register("companyName")}
              />
            </Form.Group>
            {errors.companyName && (
              <Alert variant="danger">{errors.companyName.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="companyImageUrl">
              <Form.Label>Seller Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Image Url"
                {...register("companyImageUrl")}
              />
            </Form.Group>
            {errors.companyImageUrl && (
              <Alert variant="danger">{errors.companyImageUrl.message}</Alert>
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

export default SellerSignUp;
