"use client";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

export interface Customer {
  id: string;
  name: string;
  gender: string;
  age: number;
  annual_income: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  Prediction: Prediction[];
}

export interface Prediction {
  id: string;
  predicted: number;
  createdAt: string;
  userId: string;
}

interface Props {
  customer: Customer;
}

const CustomerCard: React.FC<Props> = ({ customer }) => {
  const { id, name, gender, age } = customer;

  const router = useRouter();

  const redirectToCustomerPage = (id) => {
    router.push(`/customer/${id}`);
  };

  const deletePokemon = () => {
    console.log(id);
    fetchInstance(routes.model.deleteCostumer(id), {
      method: "DELETE",
    })
      .then(() => {
        toast.success("Consumidor deletado com sucesso!");
        router.refresh();
      })
      .catch((e) => {
        console.log(e.message);
        toast.error(e.message);
      });
  };

  return (
    <div
      className={`bg-white
       rounded-lg inline-block drop-shadow-xl py-3 px-3 select-none hover:-translate-y-3 transition-all duration-300`}
      onClick={() => redirectToCustomerPage(id)}
    >
      <div className="flex justify-between">
        <div className="text-black text-xl">{name.toUpperCase()}</div>
        <BsFillTrashFill
          className={"fill-black transition-all hover:fill-red-500"}
          size={20}
          onClick={() => deletePokemon()}
        />
      </div>
      <p className="text-gray-600">gênero: {gender}</p>
      <p className="text-gray-600">idade: {age}</p>
    </div>
  );
};

export default CustomerCard;
