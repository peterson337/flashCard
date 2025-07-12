export const formatarString = (params: string) =>
  params
    .toLocaleLowerCase()
    .split("")
    .filter((item) => item !== "")
    .join("");
