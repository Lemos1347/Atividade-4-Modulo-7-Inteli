import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { isServerSide } from "./environment";
import { getSession } from "next-auth/react";

export const fetchInstance = async (
  endpoint: string,
  options?: RequestInit
) => {
  let baseURL = process.env.API_URL;
  console.log("🚀 ~ file: fetch.ts:11 ~ API_URL:", baseURL);

  let session: Session | null = null;
  if (isServerSide()) {
    session = await getServerSession(authOptions);
  } else {
    session = await getSession();
    baseURL = process.env.NEXT_PUBLIC_API_URL;
  }

  if (!session) {
    throw new Error("No session found");
  }

  const finalURL = `${baseURL}${endpoint}`;

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
      ...options?.headers,
    },
  };

  const response = await fetch(finalURL, mergedOptions);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Fetch request failed");
  }

  return await response.json();
};
