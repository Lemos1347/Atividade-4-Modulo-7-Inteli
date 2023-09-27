import CreateCustomer from "@/components/CreateCustomer";
import { Customer } from "@/components/CustomerCard";
import Logout from "@/components/Logout";
import RedirectAdminPage from "@/components/RedirectAdminPage";
import { fetchInstance } from "@/config/fetch";
import { routes } from "@/config/routes";
import { redirect } from "next/navigation";
import { ModalContextProvider } from "../../../context/modal";
import PatchedData from "@/components/PatchedData";
import PredictButton from "@/components/PredictButton";
import CustomerChart from "@/components/CustomerChart";
import MainPageButton from "@/components/MainPageButton";

const getCustomerInfo = async (customerId): Promise<Customer> => {
  try {
    const { costumer } = await fetchInstance(
      routes.model.getCostumer(customerId)
    );
    return costumer as Customer;
  } catch (e) {
    redirect("api/auth/signin");
    //  redirect("/");
  }
};

export default async function CustomerData({ params }) {
  const { id: ids } = params;

  const customer: Customer = await getCustomerInfo(ids[0]);

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
      <div className="h-[10vh] itens-center justify-between bg-red-700 select-none px-16 flex">
        <p className="text-4xl text-white my-auto">{`DETALHES DO CLIENTE ${customer.name.toUpperCase()}`}</p>
        <div className="flex gap-4 items-center ">
          {admin && <RedirectAdminPage />}
          <Logout theme="COSTUMER PORTAL" />
        </div>
      </div>
      <MainPageButton />
      <div className="flex pt-7 justify-center gap-10">
        <div>
          <p className="text-gray-500 text-lg">Nome</p>
          <h1 className="text-black text-4xl">{customer.name}</h1>
        </div>
        <div>
          <p className="text-gray-500 text-lg">Gênero</p>
          <h1 className="text-black text-4xl">{customer.gender}</h1>
        </div>
        <div>
          <PatchedData
            label="age"
            text="Idade"
            id={ids[0]}
            data={customer.age}
          />
        </div>
        <div>
          <PatchedData
            text="Renda anual"
            label="annual_income"
            id={ids[0]}
            annual_income={true}
            data={customer.annual_income}
          />
        </div>
        <PredictButton id={ids[0]} />
      </div>
      <div className="w-full px-5 h-[50vh] flex items-center justify-center mt-16">
        <CustomerChart predictions={customer.Prediction} />
      </div>
    </ModalContextProvider>
  );
}
