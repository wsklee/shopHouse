import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createToast } from "../../store/toastSlice";
import {
  useGetLoggedInMemberQuery,
  useUpdateMemberMutation,
} from "../../api/extendedMemberApiSlice";

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
    city: yup
      .string()
      .min(5)
      .max(15)
      .required("city must be 5 - 15 characters."),
    street: yup
      .string()
      .min(5)
      .max(15)
      .required("street must be 5 - 15 characters."),
    zipcode: yup
      .string()
      .min(5)
      .max(15)
      .required("zipcode must be 5 - 10 characters."),
    profileImageUrl: yup.string().url().required("enter a valid image url"),
  })
  .required();

function UpdateMember() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: member } = useGetLoggedInMemberQuery();
  const [updateMember, { isError, isLoading, isSuccess }] =
    useUpdateMemberMutation();

  const onUpdateMember = async (data) => {
    try {
      const payload = await updateMember({
        updatedMember: data,
      }).unwrap();
      dispatch(
        createToast({
          type: "success",
          description: "Successfully updated your profile!",
        })
      );
      navigate(`/members/me`);
    } catch (err) {
      dispatch(
        createToast({
          type: "danger",
          description: "Oops something went wrong with updating your profile",
        })
      );
      console.error("Update member Error: ", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    defaultValues: {
      name: member.name,
      city: member.city,
      street: member.street,
      zipcode: member.zipcode,
      profileImageUrl: member.profileImageUrl,
    },
    resolver: yupResolver(schema),
  });

  return (
    <Container>
      <Row className="justify-content-md-center ">
        <Col md={6}>
          <h1 className="mt-5">ShopHouse</h1>
          <h3>Update member profile</h3>
          <Form onSubmit={handleSubmit(onUpdateMember)}>
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

            <Form.Group className="mt-4 mb-2" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter city"
                {...register("city")}
              />
            </Form.Group>
            {errors.city && (
              <Alert variant="danger">{errors.city.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="street">
              <Form.Label>Street</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter street"
                {...register("street")}
              />
            </Form.Group>
            {errors.street && (
              <Alert variant="danger">{errors.street.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="zipcode">
              <Form.Label>Zipcode</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter zipcode"
                {...register("zipcode")}
              />
            </Form.Group>
            {errors.zipcode && (
              <Alert variant="danger">{errors.zipcode.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="profileImageUrl">
              <Form.Label>Profile Image Url</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Url"
                {...register("profileImageUrl")}
              />
            </Form.Group>
            {errors.profileImageUrl && (
              <Alert variant="danger">{errors.profileImageUrl.message}</Alert>
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

export default UpdateMember;
