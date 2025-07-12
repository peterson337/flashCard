import React from "react";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import { BtnRedirectType } from "../types/btnRedirect";

export default function BtnRedirect(props: BtnRedirectType) {
  const { color, router, btnText } = props;

  return (
    <Button variant="contained" onClick={() => redirect(router)} color={color}>
      {btnText}
    </Button>
  );
}
