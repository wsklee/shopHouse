import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { closeModal } from "../../../store/modalSlice";

function LoginModal() {
  const dispatch = useDispatch();
  const handleModalClose = () => {
    dispatch(closeModal());
  };
  const handleLogin = () => {
    handleModalClose();
  };
  return (
    <div>
      <h2>로그인 모달 창입니다</h2>

      <Button onClick={handleModalClose}>취소</Button>
      <Button onClick={handleLogin}>로그인</Button>
    </div>
  );
}

export default LoginModal;
