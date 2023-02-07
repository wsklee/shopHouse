import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAddNewCategoryMutation } from "../../api/extendedCategoryApiSlice";

import { useNavigate, useParams } from "react-router-dom";
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
      .required("category name must be 5 - 15 characters."),
  })
  .required();

function AddCategoryForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [addCategory, { isError, isLoading, isSuccess }] =
    useAddNewCategoryMutation();

  const onAddCategory = async (data) => {
    try {
      const payload = await addCategory(data).unwrap();
      dispatch(
        createToast({
          type: "success",
          heading: "ADMIN",
          description: "Successfully added category!",
        })
      );
      navigate(`/admin/category`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          heading: "ADMIN",
          description: "Oops something went wrong with adding the category",
        })
      );
      console.error("Add category Error: ", err);
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
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Add new category</Accordion.Header>
        <Accordion.Body>
          <Form onSubmit={handleSubmit(onAddCategory)}>
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

            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AddCategoryForm;
