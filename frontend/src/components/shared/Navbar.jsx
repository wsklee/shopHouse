import { Fragment } from "react";
import { Button, Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/authSlice";
import { useLogoutMutation } from "../../api/extendedAuthApiSlice";
import { selectCurrentToken } from "../../store/authSlice";
import { createToast } from "../../store/toastSlice";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectCurrentToken);
  const [logoutMember, { isError }] = useLogoutMutation();
  const onLogout = async () => {
    try {
      const result = await logoutMember().unwrap();
      dispatch(logOut());
      dispatch(
        createToast({
          type: "success",
          description: "You have successfully logged out.",
        })
      );
      window.location.replace("/");
      // navigate("/");
    } catch (err) {
      dispatch(
        createToast({
          type: "warning",
          description: "Oops you have not been logged out",
        })
      );
      console.error("Error: ", err);
    }
  };

  return (
    <NavbarBs className="bg-warning shadow-sm mb-3" expand="lg">
      <Container>
        <NavbarBs.Brand to="/" as={NavLink}>
          ShopHouse
        </NavbarBs.Brand>
        <NavbarBs.Toggle aria-controls="navbarScroll" />
        <NavbarBs.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {token && (
              <Fragment>
                <Nav.Link to="/members/me" as={NavLink}>
                  MyProfile
                </Nav.Link>
                <Nav.Link to="/members/orders" as={NavLink}>
                  My Orders
                </Nav.Link>
              </Fragment>
            )}
          </Nav>

          <div className="d-flex gap-3">
            {token ? (
              <Button
                variant="danger"
                className="my-1"
                onClick={() => onLogout()}
              >
                Logout
              </Button>
            ) : (
              <Fragment>
                <Button
                  variant="success"
                  className="my-1"
                  to="/auth/login"
                  as={NavLink}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  className="my-1"
                  to="/auth/signup"
                  as={NavLink}
                >
                  Sign Up
                </Button>
              </Fragment>
            )}

            <Button
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle ml-3"
              to="/members/cart"
              as={NavLink}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="currentColor"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>
            </Button>
          </div>
        </NavbarBs.Collapse>
      </Container>
    </NavbarBs>
  );
}

export default Navbar;
