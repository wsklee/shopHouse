import { useSelector, useDispatch } from "react-redux";
import { selectToast } from "../../../store/toastSlice";
import { ToastContainer } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { deleteToast } from "../../../store/toastSlice";

function CustomToast(props) {
  const dispatch = useDispatch();
  const handleToastClose = () => {
    dispatch(deleteToast(props.id));
  };

  return (
    <Toast
      bg={props.type}
      onClose={handleToastClose}
      delay={props.dismissalTime}
      autohide
    >
      <Toast.Header>
        <strong className="me-auto">{props.heading}</strong>
      </Toast.Header>
      <Toast.Body>{props.description}</Toast.Body>
    </Toast>
  );
}

export function GlobalToast() {
  const { toasts } = useSelector(selectToast);

  return (
    <ToastContainer position="top-start" className="p-3">
      {toasts.map((toast) => (
        <CustomToast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          heading={toast.heading}
          description={toast.description}
          dismissalTime={toast.dismissalTime}
        />
      ))}
    </ToastContainer>
  );
}
