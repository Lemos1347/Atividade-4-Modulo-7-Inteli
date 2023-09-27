import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Session, getServerSession } from "next-auth";
import { isServerSide } from "./environment";
import { getSession } from "next-auth/react";

export const fetchInstance = async (
  endpoint: string,
  options?: RequestInit
) => {
  let baseURL = "http://34.225.28.22:3001";

  let session: Session | null = null;
  if (isServerSide()) {
    session = await getServerSession(authOptions);
  } else {
    session = await getSession();
    baseURL = "http://34.225.28.22:3001";
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
