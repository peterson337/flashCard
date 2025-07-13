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
export default function Modal(props: Props) {
  const { flashCards, setFlashCards } = props;
  const [isOpenModal, setIsOpenModal] = React.useState(false);
  //prettier-ignore
  const [flashCardsInformation, setFlashCardsInformation] = React.useState<FlashCardsInformation>({
      flashCardName: "",
      front: "",
      back: "",
    });

  //prettier-ignore
  // React.useEffect(() =>  console.log('Atualização de flashCards'), [flashCards]);

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
      id: flashCards.length,
    };

    const updated = [...flashCards, newFlashCard];
    setFlashCards(updated);
    saveDB(updated as unknown as FlashCards); // usa os dados atualizados aqui
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

  setFlashCards(updated);
  saveDB(updated  as unknown as FlashCards);
};

  const criarFlashCard = () => {
    if (
      flashCardsInformation.flashCardName === "" ||
      flashCardsInformation.front === "" ||
      flashCardsInformation.back === ""
    )
      return;

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
        Abrir modal
      </Button>
    </>
  );
}
