"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { createFrontDesk } from "../actions";
import SubmitButton from "@/components/submit-button/submit-button";
import Select from "@/components/select-input";
import { Data } from "./page";

const Customers = [
  { id: 1, name: "Muthu" },
  { id: 2, name: "Krishna" },
  { id: 2, name: "Karthi" },
  { id: 2, name: "Ram" },
];

type InitialState = {
  fieldErrors?: {} | null;
  type?: string | null;
  message?: any | string | null;
};

type props = {
  data : Data
};

const initalState: InitialState = {
  fieldErrors: {},
  type: null,
  message: null,
};
const FrontDeskAddForm = ({ data }:props) => {
  const [state, formAction] = useFormState(createFrontDesk, initalState);
  const router = useRouter();
  useEffect(() => {
    if (state?.type === null) return;

    if (state?.type === "Error") {
      toast.error(state?.message, {
        duration: 10000,
        closeButton: true,
      });
    }
    if (state?.type === "Success") {
      toast.success(state?.message, {
        duration: 10000,
        closeButton: true,
      });
      router.push("/dashboard/front-desk");
    }
  }, [state, router]);

 

  return (
    <form action={formAction}>
      <div className="p-6.5">
        <div className="mb-4.5">
          <Select label="Customer" name="customer_id">
            {data?.customers?.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.company_name}
              </option>
            ))}
          </Select>
        </div>

        {/* <div className="mb-4.5"> */}
        {/* <label className="mb-2.5 block text-black dark:text-white">
            Customer
          </label> */}
        {/* <input
            type="text"
            name="company_name"
            placeholder=" Customer"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          /> */}
        {/* </div> */}

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Courier Name
          </label>
          <input
            type="text"
            name="courier_name"
            placeholder="Courier Name"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Date Received
          </label>
          <input
            type="datetime-local"
            name="date_of_received"
            placeholder="Date Received"
            defaultValue={new Date().toISOString().slice(0, 16)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
          Temperature
          </label>
          <input
            type="text"
            name="temperature"
            placeholder="Temperature"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <Select label="Parcel Recived" name="parcel_received">
           <option value="SAMPLE">Sample</option>
           <option value="Material">Material</option>
          </Select>
        </div>
        <div className="mb-4.5">
          <Select label="Received Condition" name="received_condition">
            
              <option value="GOOD" >
              Good
              </option>
              <option value="DAMAGED">Damaged</option>
              
           
          </Select>
        </div>
        
        <div className="mb-4.5">
          <Select label="Department" name="deparment_id">
            {data?.departments.map((department) => (
              <option value={department.id} key={department.id}>
                {department.name}
              </option>
            ))}
          </Select>
        </div>
        <div className="mb-4.5">
          <Select label="Status" name="status">
          <option value="Not_REGISTRATION">
                Not Registration
              </option>
              <option value="REGISTRATION">
                Registration
              </option>
          </Select>
        </div>
        <SubmitButton />
      </div>
    </form>
  );
};

export default FrontDeskAddForm;
