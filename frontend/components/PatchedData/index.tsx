"use client";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import Button, { ButtonType } from "../Button";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useLoadingContext } from "@/context/loading";
import { ClipLoader } from "react-spinners";

interface Props {
  annual_income?: boolean;
  label: string;
  data: number;
  id: string;
  text: string;
}

const PatchedData: React.FC<Props> = ({
  data,
  id,
  annual_income = false,
  label,
  text,
}) => {
  const [changeAnnualIncome, setChangeAnnualIncome] = useState<boolean>(false);
  const [newData, setNewData] = useState<string>("");
  const { loading, setLoading } = useLoadingContext();

  const router = useRouter();

  const handleClick = () => {
    setChangeAnnualIncome((prev) => !prev);
  };

  const onClickChangeNickName = () => {
    setLoading(true);
    handlePatch(id);
  };

  const handlePatch = (id: string) => {
    if (!newData) {
      setChangeAnnualIncome(false);
      setLoading(false);
      return;
    }
    fetchInstance(routes.model.updateCostumer(id), {
      method: "PUT",
      body: JSON.stringify({ [label]: newData }),
    })
      .then(() => {
        setChangeAnnualIncome((prev) => !prev);
        toast.success("Informação atualizada com sucesso!");
        router.refresh();
      })
      .catch((e) => {
        toast.error(`Erro ao atualizar informação: ${e.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {changeAnnualIncome ? (
        <div className="inline-block">
          <p className="text-gray-500 text-lg">Renda anual</p>
          <input
            onChange={(e) => {
              if (e.target.value !== newData) {
                setNewData(e.target.value);
              } else {
                setNewData("");
              }
            }}
            className="border-2 rounded-full overflow-x-auto py-1 w-32 px-5 text-black border-gray-300"
            defaultValue={data}
          />
          <Button
            onClick={onClickChangeNickName}
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
              "MUDAR"
            )}
          </Button>
        </div>
      ) : (
        <>
          <p className="text-gray-500 text-lg">{text}</p>
          <p className="text-black text-4xl flex items-center justify-between">
            {annual_income ? `R$ ${data}000` : data}
            <FiEdit
              onClick={handleClick}
              className={
                "cursor-pointer rounded-lg hover:bg-black hover:fill-white px-1 py-1"
              }
              size={25}
            />
          </p>
        </>
      )}
    </>
  );
};

export default PatchedData;
