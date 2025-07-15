export type Props = {
  isShowToast: ToastType;
  //prettier-ignore
  setIsShowToast: (value: React.SetStateAction<ToastType>) => void
};

export type ToastType = {
  open: boolean;
  vertical: string;
  horizontal: string;
  text: string;
  type: string;
};

export type AnchorOrigin = {
  horizontal: "left" | "center" | "right";
  vertical: "top" | "bottom";
};
