import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin } from "../api/authFetch";
import { createToast } from "../store/toastSlice";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object()
  .shape({
    email: yup.string().email().required("email is required"),
    password: yup
      .string()
      .min(8)
      .max(15)
      .required("password must be 8 - 15 characters."),
  })
  .required();

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // data : {email, password}
  // user : user-email
  const onSubmit = async (data) => {
    try {
      const payload = await onLogin(data);
      dispatch(
        createToast({
          type: "success",
          description: "Login Success!",
        })
      );
      navigate("/");
    } catch (err) {
      if (!err?.originalStatus) {
        // isLoading: true until timeout occurs
      } else if (err.originalStatus === 400) {
        console.error("Error: Missing Username or Password");
      } else if (err.originalStatus === 401) {
        console.error("Error: Unauthorized");
      } else {
        console.error("Error: Login Failed");
      }
      dispatch(
        createToast({
          type: "danger",
          description: "Login failed. Try again!",
        })
      );
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
          <h3>Login</h3>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mt-4 mb-2" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                {...register("email")}
              />
            </Form.Group>
            {errors.email && (
              <Alert variant="danger">{errors.email.message}</Alert>
            )}

            <Form.Group className="mt-4 mb-2" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                {...register("password")}
              />
            </Form.Group>
            {errors.password && (
              <Alert variant="danger">{errors.password.message}</Alert>
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

export default Login;
