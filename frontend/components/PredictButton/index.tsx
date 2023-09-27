"use client";
import React from "react";
import Button, { ButtonType } from "../Button";
import { useLoadingContext } from "@/context/loading";
import ClipLoader from "react-spinners/ClipLoader";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
}

const PredictButton: React.FC<Props> = ({ id }) => {
  const { loading, setLoading } = useLoadingContext();
  const router = useRouter();

  const predict = () => {
    setLoading(true);
    fetchInstance(routes.model.predict(id))
      .then(() => {
        toast.success("Nova predição feita!");
        router.refresh();
      })
      .catch((e) => {
        toast.error(`Erro executar uma nova predição: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Button
      onClick={predict}
      theme={ButtonType.CREATE_CUSTOMER}
      disabled={loading}
    >
      {loading ? (
        <ClipLoader
          color={"white"}
          size={17}
          loading={loading}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        "Predizer novo rating"
      )}
    </Button>
  );
};

export default PredictButton;
