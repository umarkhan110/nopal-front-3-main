"use server";

import { cookies } from "next/headers";

export async function storeToken(token) {
  cookies().set({
    name: "token",
    value: token,
    sameSite: "strict",
    secure: true,
  });
}

export async function getToken() {
  cookies().get("token");
}

export async function deleteToken() {
  cookies().delete("token");
}
