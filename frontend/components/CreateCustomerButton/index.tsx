"use client";
import React from "react";
import Button, { ButtonType } from "../Button";
import { useRouter } from "next/navigation";
import { useModalContext } from "@/context/modal";
import { ClipLoader } from "react-spinners";
import { useLoadingContext } from "@/context/loading";

interface Props {}

const CreateCustomerButton: React.FC<Props> = (props) => {
  //   const router = useRouter();

  const { setModalOpen } = useModalContext();

  const { loading } = useLoadingContext();

  const onClick = () => {
    if (setModalOpen) setModalOpen(true);
  };

  return (
    <div className="px-10 mx-auto pt-[4vh]">
      <Button onClick={onClick} theme={ButtonType.CREATE_CUSTOMER}>
        + Adicione um CLIENTE
      </Button>
    </div>
  );
};

export default CreateCustomerButton;
