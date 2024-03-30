// @ts-nocheck

"use server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SERVER_API_URL } from "@/app/constant";

import { z } from "zod";

import { toast } from "sonner";

const schema = z
  .object({
    first_name: z.string().min(1, "First Name Required").trim(),
    last_name: z.string().min(1, "Last Name Required").trim(),
    email: z.string().email("Invalid E-mail").trim(),

    phone: z
      .string()
      .trim()
      .min(1, "Phone Required")
      .max(10, "Enter valid 10 digit phone number"),
    password: z
      .string()
      .min(8, { message: "Password is min 8 digit long" }),
    password2: z.string(),

    role_id: z.string().min(1, "Role Required"),
    department_id: z.string().min(1, "Department Required"),
    qa_type_id: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"], // path of error
  });

export async function createUser(prevState, formData: FormData) {
  let jsonObject = Object.fromEntries(formData.entries());

  const validatedFields = schema.safeParse(jsonObject);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      message: null,
      type: null,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  if (jsonObject["qa_type_id"] == "null") jsonObject["qa_type_id"] = null;
  // delete jsonObject["qa_type_id"]
  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/`, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 401) redirect("/signin");

  if (res.status !== 201) {
    const error = await res.json();
    return {
      fieldErrors: null,
      type: "Error",
      message: error.detail,
    };
  }

  if (res.status === 201) redirect("/dashboard/users");

  // if (res.status === 201) {

  //     fieldErrors: null,
  //     type: 'Success',
  //     message: "User Created Successfully",
  //   })
  // }
}

export async function updateUser(id: string, formData: FormData) {
  console.log(formData);
  let jsonObject = Object.fromEntries(formData.entries());

  if (jsonObject["qa_type_id"] == "null") jsonObject["qa_type_id"] = null;

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 401) redirect("/signin");
  if (res.status === 204) redirect("/dashboard/users");
}

export async function updateUser1(state, id: string, formData: FormData) {
  console.log(formData);
  let jsonObject = Object.fromEntries(formData.entries());

  if (jsonObject["qa_type_id"] == "null") jsonObject["qa_type_id"] = null;

  const access_token = cookies().get("access_token");

  const res = await fetch(`${SERVER_API_URL}/users/${id}`, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    headers: {
      "Content-Type": "application/json",
      // "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Bearer ${access_token?.value}`,
    },
    body: JSON.stringify(jsonObject),
  });

  if (res.status === 401) redirect("/signin");
  if (res.status === 204) redirect("/dashboard/users");
}
