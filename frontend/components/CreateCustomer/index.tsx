"use client";
import Button, { ButtonType } from "@/components/Button";
import ModalCreateCustomer from "../ModalCreateCustomer";
import { useModalContext } from "@/context/modal";

interface Props {}

const CreateCustomer: React.FC<Props> = (props) => {
  const { modalOpen, setModalOpen } = useModalContext();

  return <>{modalOpen && <ModalCreateCustomer setModalOpen={setModalOpen} />}</>;
};

export default CreateCustomer;
