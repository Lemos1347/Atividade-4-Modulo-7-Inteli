import Button from "@/components/Button";
import CreateCustomer from "@/components/CreateCustomer";
import CustomerCard, { Customer } from "@/components/CustomerCard";
import { fetchInstance } from "@/config/fetch";
import { redirect } from "next/navigation";
import { routes } from "@/config/routes";
import { ModalContextProvider } from "../context/modal";
import CreateCustomerButton from "@/components/CreateCustomerButton";
import RedirectAdminPage from "@/components/RedirectAdminPage";
import Logout from "@/components/Logout";
import GenderPieChart from "@/components/GenderPieChart";

interface User {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string[];
  Customer: Customer[];
}

const getGenderPercentage = (customers: Customer[]) => {
  const size = customers.length;

  const mulheres = ["female", "mulher", "feminino"];
  const homens = ["male", "homem", "masculino"];

  const gendersAbsoluteValues = [
    {
      name: "Homens",
      value: 0,
    },
    {
      name: "Mulheres",
      value: 0,
    },
  ];
  customers.map((customer) => {
    if (mulheres.includes(customer.gender)) {
      gendersAbsoluteValues[1].value += 1;
    } else if (homens.includes(customer.gender)) {
      gendersAbsoluteValues[0].value += 1;
    }
  });

  return gendersAbsoluteValues;
};

const getCustomers = async (): Promise<Customer[]> => {
  try {
    const { user } = await fetchInstance(routes.user.get);
    return (user as User).Customer;
  } catch (e) {
    console.log("🚀 ~ file: page.tsx:56 ~ getCustomers ~ e:", e)
    // redirect("api/auth/signin");
    // redirect("/");
    return [];
  }
};

export default async function Home() {
  const customers: Customer[] = await getCustomers();

  const gendersAbsoluteValues = getGenderPercentage(customers);

  const isAdmin = async () => {
    try {
      const { user } = await fetchInstance(routes.user.get);
      return user.role.includes("ADMIN");
    } catch {
      return false;
    }
  };

  const admin = await isAdmin();

  return (
    <ModalContextProvider>
      <CreateCustomer />
      <div className="h-[10vh] itens-center justify-between bg-red-700 select-none px-16 flex">
        <p className="text-4xl text-white my-auto">DASHBOARD DE CONSUMIDORES</p>
        <div className="flex gap-4 items-center ">
          {admin && <RedirectAdminPage />}
          <Logout theme="COSTUMER PORTAL" />
        </div>
      </div>
      {/* <CreatePokemon /> */}
      <CreateCustomerButton />
      <div className="flex flex-wrap gap-2 py-10 px-10">
        {customers &&
          customers.map((customers, index) => (
            <CustomerCard key={index} customer={customers} />
          ))}
      </div>
      <div className="flex justify-center items-center w-screen h-96">
      {customers && <GenderPieChart data={gendersAbsoluteValues} />}
      </div>
    </ModalContextProvider>
  );
}
