import React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { Props, AnchorOrigin } from "../types/Toast";

export default function Toast(props: Props) {
  const { isShowToast, setIsShowToast } = props;

  const { vertical, horizontal, open, text, type } = isShowToast;

  const handleClose = () => {
    setIsShowToast({ ...isShowToast, open: false });
  };

  <React.Fragment>
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      X
    </IconButton>
  </React.Fragment>;

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal } as AnchorOrigin}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        key={vertical + horizontal}
      >
        <Alert
          onClose={handleClose}
          severity={type as "success" | "error" | "info" | "warning"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {text}
        </Alert>
      </Snackbar>
    </div>
  );
}
