import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/toastSlice";
import { useUpdateCategoryMutation } from "../../api/extendedCategoryApiSlice";

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
      .required("category name must be 5 - 15 characters."),
  })
  .required();

function UpdateCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { categoryId } = useParams();
  const [updateCategory, { isError, isLoading, isSuccess }] =
    useUpdateCategoryMutation();

  const onUpdateCategory = async (data) => {
    try {
      const payload = await updateCategory({
        categoryId: categoryId,
        updatedCategory: data,
      }).unwrap();
      dispatch(
        createToast({
          type: "success",
          heading: "ADMIN",
          description: "Successfully updated category!",
        })
      );
      navigate(`/admin/category`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          heading: "ADMIN",
          description: "Oops something went wrong with updating the category",
        })
      );
      console.error("Update category Error: ", err);
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
          <h1 className="mt-5">ShopHouse Admin</h1>
          <h3>Update category</h3>
          <Form onSubmit={handleSubmit(onUpdateCategory)}>
            <Form.Group className="mt-4 mb-2" controlId="name">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter new category name"
                {...register("name")}
              />
            </Form.Group>
            {errors.name && (
              <Alert variant="danger">{errors.name.message}</Alert>
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

export default UpdateCategory;
