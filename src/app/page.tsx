"use client";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  React.useLayoutEffect(() => redirect("/pages/dashboard"), []);

  return <></>;
}
