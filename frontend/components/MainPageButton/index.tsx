"use client";
import { useRouter } from "next/navigation";
import React from "react";
import Button, { ButtonType } from "../Button";

const MainPageButton: React.FC = () => {
  const router = useRouter();

  return (
    <Button
      className="mt-4 ml-4"
      onClick={() => router.push("/")}
      theme={ButtonType.CREATE_CUSTOMER}
    >
      {"VOLTAR PARA A PÁGINA PRINCIPAL"}
    </Button>
  );
};

export default MainPageButton;
