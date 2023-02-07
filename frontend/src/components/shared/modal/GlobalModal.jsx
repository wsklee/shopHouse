import { useSelector, useDispatch } from "react-redux";
import { selectModal } from "../../../store/modalSlice";
import LoginModal from "./LoginModal";
import BasicModal from "./BasicModal";
import { closeModal } from "../../../store/modalSlice";

export const MODAL_TYPES = {
  LoginModal: "LoginModal",
  BasicModal: "BasicModal",
};

export const MODAL_COMPONENTS = [
  {
    type: MODAL_TYPES.LoginModal,
    component: <LoginModal />,
  },
  {
    type: MODAL_TYPES.BasicModal,
    component: <BasicModal />,
  },
];

export function GlobalModal() {
  // modalType: string
  const { modalType, isOpen } = useSelector(selectModal);
  const dispatch = useDispatch();
  if (!isOpen) return;

  const findModal = MODAL_COMPONENTS.find((modal) => {
    return modal.type === modalType;
  });

  const renderModal = () => {
    return findModal.component;
  };
  return (
    <div>
      {/* <div className={cx("overlay")} onClick={() => dispatch(closeModal())} /> */}
      {renderModal()}
    </div>
  );
}

// const handleOpenBasicModal = () => {
//   dispatch(
//     openModal({
//       modalType: "BasicModal",
//       isOpen: true,
//     })
//   );
// };
