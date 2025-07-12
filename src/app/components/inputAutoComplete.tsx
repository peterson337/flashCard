import * as React from "react";
import useAutocomplete from "@mui/material/useAutocomplete";
import { styled } from "@mui/system";
import { Props } from "../types/inputAutoCompete";
import { formatarString } from "../Hook/formtString";

const Label = styled("label")({
  display: "block",
});

const Input = styled("input")(({ theme }) => ({
  width: 200,
  backgroundColor: "#fff",
  color: "#000",
  ...theme.applyStyles("dark", {
    backgroundColor: "#000",
    color: "#fff",
  }),
}));

const Listbox = styled("ul")(({ theme }) => ({
  width: 200,
  margin: 0,
  padding: 0,
  zIndex: 1,
  position: "absolute",
  listStyle: "none",
  backgroundColor: "#fff",
  overflow: "auto",
  maxHeight: 200,
  border: "1px solid rgba(0,0,0,.25)",
  "& li.Mui-focused": {
    backgroundColor: "#4a8df6",
    color: "white",
    cursor: "pointer",
  },
  "& li:active": {
    backgroundColor: "#2977f5",
    color: "white",
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "#000",
  }),
}));

export default function UseAutocomplete(props: Props) {
  //prettier-ignore
  const { flashCardNames, flashCardsInformation, setFlashCardsInformation } = props;

  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: flashCardNames,
    getOptionLabel: (option) => option.flashCardName,
  });

  return (
    <div>
      <div {...getRootProps()}>
        <Label {...getInputLabelProps()}>Nome flash card</Label>
        <Input
          {...getInputProps()}
          sx={{ backgroundColor: "black", width: "100%", color: "white" }}
          placeholder="Digite o nome do flash card"
          value={flashCardsInformation.flashCardName}
          onChange={(e) =>
            setFlashCardsInformation({
              ...flashCardsInformation,
              flashCardName: e.target.value,
            })
          }
        />
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox
          onClick={(e) =>
            setFlashCardsInformation({
              ...flashCardsInformation,
              flashCardName: (e.target as HTMLElement).textContent ?? "",
            })
          }
          {...getListboxProps()}
          sx={{
            backgroundColor: "black",
            padding: 2,
            textAlign: "center",
            borderRadius: 5,
            color: "white",
            marginTop: 10,
          }}
        >
          {groupedOptions
            .filter((option) =>
              formatarString(option.flashCardName).includes(
                formatarString(flashCardsInformation.flashCardName)
              )
            )
            .map((option, index) => {
              const { key, ...optionProps } = getOptionProps({ option, index });
              return (
                <li
                  key={key}
                  {...optionProps}
                  className="mb-3 p-1 rounded-[20px]"
                >
                  {option.flashCardName}
                </li>
              );
            })}
        </Listbox>
      ) : null}
    </div>
  );
}
