"use client";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as yup from "yup";
import Modal from "../Modal";
import ModalForm, { ModalFilds } from "../ModalForm";
import { ButtonType } from "../Button";
import { useLoadingContext } from "@/context/loading";

interface Props {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalCreateCustomer: React.FC<Props> = ({ setModalOpen }) => {
  const router = useRouter();

  const { loading, setLoading } = useLoadingContext();

  const schema = yup
    .object({
      name: yup.string().required("Nome é obrigatório"),
      gender: yup.string().required("Gênero é obrigatório"),
      age: yup.number().required("Idade é obrigatório"),
      annual_income: yup.number().required("Renda anual é obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitCreateCustomer = (data) => {
    setLoading(true);
    console.log(loading);
    fetchInstance(routes.model.createCostumer, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        toast.success("Cliente criado com sucesso!");
        setModalOpen(false);
        router.refresh();
      })
      .catch((e) => {
        toast.error("Erro ao criar cliente!");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const createCustomerFields: ModalFilds[] = [
    {
      fieldName: "name",
      type: "text",
      placeHolder: "nome do cliente",
    },
    {
      fieldName: "gender",
      type: "text",
      placeHolder: "gênero",
    },
    {
      fieldName: "age",
      type: "number",
      placeHolder: "idade do cliente",
    },
    {
      fieldName: "annual_income",
      type: "number",
      placeHolder: "renda anual do cliente (em milhares, ou seja 10 = R$10000)",
    }
  ];

  return (
    <Modal setModalOpen={setModalOpen}>
      <h1 className="text-red-600 font-semibold">
        Adicione um cliente a sua dashboard!
      </h1>
      <p className="text-gray-500 text-sm max-w-sm">
        Separamos um cantinho especial para que você possa adicionar todos os seus clientes da sua loja especial!
      </p>
      <ModalForm
      label="Adicionar um CLIENTE"
        fields={createCustomerFields}
        onSubmit={onSubmitCreateCustomer}
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        type={ButtonType.CREATE_CUSTOMER}
      />
    </Modal>
  );
};

export default ModalCreateCustomer;
