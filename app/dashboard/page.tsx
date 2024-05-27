import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SERVER_API_URL } from "@/app/constant";

export const metadata: Metadata = {
  title: "Trustin | Dashboard",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export type RegistrationData = {
  week: string;
  count: number;
};

export type FollowupData = {
  followup_count: number;
  user_id: number;
  user_name: string;
};

export type DashboardInfo = {
  customer: number;
  product: number;
  registration_count: number;
  followup_count: number;
  sample_count: number;
  registration_data: RegistrationData[];
  followup_count_by_assigned_to: FollowupData[];
};

export type DashboardData = {
  dashboard: DashboardInfo;
  menus: string[]
}



async function getData() {
  const cookieStore = cookies();
  const access_token = cookieStore.get("access_token");

  const res = await fetch(`${SERVER_API_URL}/dashboard/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
    next: {
      tags: ["Dashboard", "Users", "Followup", "Registration", "Samples"],
      revalidate: 100000,
    },
  });
  const res1 = await fetch(`${SERVER_API_URL}/users/menus/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${access_token?.value}`,
    },
    next: {
      revalidate: 100000,
    },
  });

  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    // console.log(res)
    // throw new Error("Failed to fetch data");
    console.log("error");
  }

  if (res.status === 401) redirect("/signin");
  if (res1.status === 401) redirect("/signin");

  const dashboard = await res.json();
  const menusRes = await res1.json();

  const menus = menusRes.map((menu: { id: number; name: string }) => menu.name);

  return {dashboard, menus};
}

export default async function DashboardPage() {
  const data:DashboardData = await getData(); 
  return (
    <>
      <ECommerce data={data}/>
    </>
  );
}
