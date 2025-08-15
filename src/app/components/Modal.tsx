"use client";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import React from "react";
import "../style/dashboard.css";
import { FlashCardsInformation, Props } from "../types/Home";
import UseAutocomplete from "./inputAutoComplete";
import { formatarString } from "../Hook/formtString";
import { saveDB } from "../Hook/salveDB";
import { FlashCards } from "../types/Home";
import Toast from "../components/Toast";
export default function Modal(props: Props) {
  const { flashCards, setFlashCards } = props;
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  //prettier-ignore
  const [flashCardsInformation, setFlashCardsInformation] = React.useState<FlashCardsInformation>({
      flashCardName: "",
      front: "",
      back: "",
    });
  const [isShowToast, setIsShowToast] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "right",
    text: "",
    type: "",
  });

  //prettier-ignore
  // React.useEffect(() =>  console.log('Atualização de flashCards'), [flashCards]);

  const functionPadrao = (updated: FlashCards[]) => {
  setIsShowToast({ ...isShowToast, open: true, text: "Flash card criado com sucesso!", type: "success" });
  setFlashCardsInformation({ ...flashCardsInformation, front: "", back: "" });
  setFlashCards(updated);
  saveDB(updated  as unknown as FlashCards);
  setTimeout(() => {
     setIsShowToast({ ...isShowToast, open: false, text: "", type: "" }); 
  }, 2000);
  }

  const updateFlashCards = (params: boolean) => {
    if (params) {
      const newFlashCard = {
        flashCardName: flashCardsInformation.flashCardName,
        flashCards: [
          {
            front: flashCardsInformation.front,
            back: flashCardsInformation.back,
            id: 0,
          },
        ],
        id: new Date().getTime(),
      };

      const updated = [...flashCards, newFlashCard];
      functionPadrao(updated);
      return;
    }

    const updated = flashCards.map((item) => {
      //prettier-ignore
      if (formatarString(item.flashCardName) === formatarString(flashCardsInformation.flashCardName)) {
      return {
        ...item,
        flashCards: [
          ...item.flashCards,
          {
            front: flashCardsInformation.front,
            back: flashCardsInformation.back,
            id: item.flashCards.length,
          },
        ],
      };
    }
      return item;
    });

    functionPadrao(updated);
  };

  const criarFlashCard = () => {
    console.log("Criar flash card");
    if (
      flashCardsInformation.flashCardName === "" ||
      flashCardsInformation.front === "" ||
      flashCardsInformation.back === ""
    ) {
      return;
    }

    //prettier-ignore
    const validation = flashCards.filter((item) => item.flashCardName === flashCardsInformation.flashCardName)

    if (validation.length === 0) {
      updateFlashCards(true);
      return;
    }

    updateFlashCards(false);
  };

  //prettier-ignore
  //! const saveLocalStorage = () => localStorage.setItem("flashCards", JSON.stringify([...flashCards]));

  return (
    <>
      <Dialog onClose={() => setIsOpenModal(false)} open={isOpenModal}>
        <Toast isShowToast={isShowToast} setIsShowToast={setIsShowToast} />
        <div className="container">
          <DialogTitle sx={{ textAlign: "center" }}>
            Criar flash card
          </DialogTitle>

          <div>
            <UseAutocomplete
              flashCardNames={flashCards}
              setFlashCardsInformation={setFlashCardsInformation}
              flashCardsInformation={flashCardsInformation}
            />
          </div>

          <div>
            <label>Frente</label>
            <input
              type="text"
              placeholder="Frente"
              value={flashCardsInformation.front}
              onChange={(e) =>
                setFlashCardsInformation({
                  ...flashCardsInformation,
                  front: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label>Verso</label>
            <input
              type="text"
              placeholder="verso"
              value={flashCardsInformation.back}
              onChange={(e) =>
                setFlashCardsInformation({
                  ...flashCardsInformation,
                  back: e.target.value,
                })
              }
            />
          </div>

          <Button variant="contained" onClick={criarFlashCard}>
            Criar flash card
          </Button>
        </div>
      </Dialog>

      <Button variant="contained" onClick={() => setIsOpenModal(true)}>
        Criar lista de flash cards
      </Button>
    </>
  );
}
