"use client";
import React from "react";
import Button, { ButtonType } from "../Button";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  theme: string;
}

const Logout: React.FC<Props> = ({ theme }) => {
  const router = useRouter();
  const onClick = () => {
    signOut();
  };
  switch (theme) {
    case "COSTUMER PORTAL":
      return (
        <Button onClick={onClick} theme={ButtonType.CREATE_CUSTOMER}>
          LOG OUT
        </Button>
      );
    case "ADMIN":
      return (
        <Button onClick={onClick} theme={ButtonType.CREATE_USER}>
          LOG OUT
        </Button>
      );
  }
};

export default Logout;
