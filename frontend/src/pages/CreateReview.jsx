import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useAddNewReviewMutation } from "../api/apiSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../store/toastSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    description: yup
      .string()
      .min(20)
      .max(200)
      .required("review must be 20 - 200 characters."),

    rating: yup
      .number()
      .positive()
      .integer()
      .moreThan(0)
      .lessThan(6)
      .required("rating is required"),
  })
  .required();

function CreateReview() {
  const { itemId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addNewReview, { isError, isLoading, isSuccess }] =
    useAddNewReviewMutation();

  const onSaveReview = async (data) => {
    try {
      const payload = await addNewReview({
        itemId: itemId,
        newReview: { ...data },
      }).unwrap();
      const reviewId = payload.id;
      dispatch(
        createToast({
          type: "success",
          description: "Created new review!",
        })
      );
      navigate(`/items/${itemId}`);
    } catch (err) {
      dispatch(
        createToast({
          type: "warning",
          description: "Oh no something went wrong. Try again",
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
        <Col md={6}>
          <h1 className="mt-5">ShopHouse</h1>
          <h3>Write Review</h3>
          <Form onSubmit={handleSubmit(onSaveReview)}>
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

            <Form.Group className="mt-4 mb-2" controlId="rating">
              <Form.Label>Rating</Form.Label>

              <Form.Select
                aria-label="Default select example"
                {...register("rating")}
              >
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </Form.Select>
            </Form.Group>
            {errors.rating && (
              <Alert variant="danger">{errors.rating.message}</Alert>
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

export default CreateReview;
