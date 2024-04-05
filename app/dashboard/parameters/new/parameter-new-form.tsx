"use client";
import { useEffect, useState } from "react";
import { createParameters } from "../actions";
import Select from "@/components/select-input";
import { Data } from "./page";
import { useForm,  useWatch } from "react-hook-form";
import SubmitButton from "@/components/submit-button/submit-button";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type InitialState = {
  fieldErrors?: {} | null;
  type?: string | null;
  message?: any | string | null;
};

const initialState: InitialState = {
  fieldErrors: {},
  type: null,
  message: null,
};


type Props = {
  data: Data;
};
const ParameterNewForm = ({ data }: Props) => {
  const { register, control, setValue } = useForm();
  const [showProductSelect, setShowProductSelect] = useState<boolean>(true);

  const watchTestType = useWatch({
    control,
    name: "test_type_id",
    defaultValue: "1",
  });

  useEffect(() => {
    if (watchTestType) {
      if (watchTestType === "2") {
        setShowProductSelect(true);
      
      } else {
        setShowProductSelect(false);
        setValue("product_id", "null");
      }
    }
  }, [setShowProductSelect,setValue, watchTestType]);

  const [state, formAction] = useFormState(createParameters, initialState);
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
      router.push("/dashboard/parameters");
    }
  }, [state, router]);

  // const handleSubmit = ({
  //   formData,
  //   data,
  // }: {
  //   formData: FormData;
  //   data: {};
  // }) => {
  //   console.log(data);
  //   createParameters(formData);
  // };



  return (
    // <Form control={control} onSubmit={handleSubmit}>
    <form action={formAction}>
      <div className="p-6.5">
        <Select name="branch_id" label="Branch" register={register}>
          {data?.branch.map((b) => (
            <option value={b.id} key={b.id}>
              {b.branch_name}
            </option>
          ))}
        </Select>

        <Select name="test_type_id" label="Test Type" register={register}>
          {data?.test_types.map((test) => (
            <option value={test.id} key={test.id}>
              {test.name}
            </option>
          ))}
        </Select>

        <Select
          name="product_id"
          label="Product"
          register={register}
          disabled={!showProductSelect}
        >
          <option value="null">---Select Product---</option>
          {data?.products.map((product) => (
            <option value={product.id} key={product.id}>
              {product.product_name}
            </option>
          ))}
        </Select>

        <Select name="customer_id" label="Customer" register={register}>
          <option value="null">----</option>
          {data?.customers.map((customer) => (
            <option value={customer.id} key={customer.id}>
              {customer.company_name}
            </option>
          ))}
        </Select>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Test Parameters
          </label>
          <input
            type="text"
            {...register("testing_parameters")}
            placeholder="Test Parameters"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Amount
          </label>
          <input
            type="number"
            {...register("amount")}
            placeholder="Amount"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>
        <div className="mb-4.5">
          <label className="mb-2.5 block text-black dark:text-white">
            Method or Specification
          </label>
          <input
            type="text"
            {...register("method_or_spec")}
            placeholder="  Method or Specification"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2.5 block text-black dark:text-white">
            Group of test parameters
          </label>
          <textarea
            rows={6}
            {...register("group_of_test_parameters")}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          ></textarea>
        </div>

        <SubmitButton />
      </div>
      {/* </Form> */}
    </form>
  );
};

export default ParameterNewForm;
