"use client";
import React, { Fragment } from "react";
import "../../../style/flashCard.css";
import Button from "@mui/material/Button";
import { useParams } from "next/navigation";
import { db } from "../../../firebase";
import { formatarString } from "../../../Hook/formtString";
import { FlashCards } from "../../../types/Home";
import BtnRedirect from "../../../components/btnRedirect";
import ExternalSearchDropdown from "../../../components/ExternalSearchDropdown";
import { collection, getDocs } from "firebase/firestore";
import { redirect } from "next/navigation";
import { saveDB } from "../../../Hook/salveDB";

export default function Page() {
  const params = useParams();
  const [flashCard, setFlashCard] = React.useState<FlashCards | null>(null);
  const [flashCards, setFlashCards] = React.useState([]);
  const [isShowBack, setIsShowBack] = React.useState<boolean>(false);

  //prettier-ignore
  const [userAnswerStatus, setUserAnswerStatus] = React.useState<"correct" | "wrong" | "">("");
  //prettier-ignore

  const [flashcardPosition, setFlashcardPosition] = React.useState(0);

  const refTitleInput = React.useRef("");

  const idFlashCard = params.id;

  //prettier-ignore
  const lastCard = flashCard?.flashCards?.length ? flashCard.flashCards.length - 1 : 0;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendAnswer();
  });

  const sendAnswer = () => {
    //prettier-ignore
    if (formatarString(refTitleInput.current) === formatarString(flashCard?.flashCards[flashcardPosition].back || "")) {
      setUserAnswerStatus("correct");
      setIsShowBack(true);
    } else {
      setUserAnswerStatus("wrong");
      setIsShowBack(true);
    }
  };

  const flashCardsSelected = (params: FlashCards[]) => {
    //prettier-ignore
    return params.filter((item: FlashCards) => item.id === Number(idFlashCard))[0];
  };

  const getFlashCardsDB = React.useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "flashCards"));

    querySnapshot.forEach((doc) => {
      setFlashCards(doc.data().cards || []);
      //prettier-ignore
      setFlashCard(flashCardsSelected(doc.data().cards) || []);
    });
  }, []);

  React.useEffect(() => {
    getFlashCardsDB();
  }, [idFlashCard, getFlashCardsDB]);

  const changeCard = (params: "prev" | "next") => {
    setIsShowBack(false);
    setUserAnswerStatus("");
    refTitleInput.current = "";
    //prettier-ignore
    setFlashcardPosition(params === "prev" ? flashcardPosition - 1 : flashcardPosition + 1);
  };

  const deleteFlashCard = (id: number) => {
    //prettier-ignore
    const isDeleteFlashCard = confirm("Deseja excluir este flash card? Esta ação não pode ser desfeita.")

    if (isDeleteFlashCard) {
      //prettier-ignore
      flashCards.filter((item: FlashCards) => { if (item.id === Number(idFlashCard)) item.flashCards.splice(id, 1)} );

      saveDB(flashCards as unknown as FlashCards);

      getFlashCardsDB();

      //prettier-ignore
      const quantidadeAtualDeFlashCards = flashCardsSelected(flashCards)

      if (quantidadeAtualDeFlashCards.flashCards.length === 0) redirect("/");
    }
  };
  return (
    <section className="section">
      <div className="content">
        <BtnRedirect
          color="error"
          router={"/"}
          btnText="Voltar para a página inicial"
        />

        {!isShowBack && <br />}

        {flashCard && (
          <>
            {/* <h2>{flashCard.flashCardName}</h2> */}
            {/*  //prettier-ignore */}
            {isShowBack && (
              <div className="flex flex-row items-center gap-3">
                <p
                  className="alert"
                  style={{
                    backgroundColor:
                      userAnswerStatus === "correct" ? "#00a63e" : "#c10007",
                  }}
                >
                  {userAnswerStatus === "correct"
                    ? "Resposta correta!"
                    : `Resposta errada! A resposta correta é: ${flashCard.flashCards[flashcardPosition].back}`}
                </p>

                <ExternalSearchDropdown
                  wordToTranslate={flashCard.flashCards[flashcardPosition].back}
                />
              </div>
            )}
            {
              //prettier-ignore
              flashCard && flashCard.flashCards.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {index === flashcardPosition && (
                      <div className="stylePadrao">

                        <span className="spanWordButton">
                          <p className="text-center text-2xl">{item.front}</p>
                          <ExternalSearchDropdown wordToTranslate={item.front}/>
                          </span>

                        <input
                          type="text"
                          placeholder="Digite sua resposta"
                          autoFocus
                          disabled={isShowBack}
                          //prettier-ignore
                          onChange={(e) =>(refTitleInput.current = e.target.value)}
                        />
                        <div>
                        <Button variant="contained" onClick={sendAnswer} disabled={isShowBack}>
                          Enviar resposta
                        </Button>
                         
                        &nbsp;&nbsp;&nbsp;&nbsp;

                        <Button variant="contained" color="error" onClick={() => deleteFlashCard(index)}>
                          Excluir flash card
                        </Button>
                        </div>
                      </div>
                    )}
                  </Fragment>
                );
              })
            }
          </>
        )}

        {isShowBack && (
          <div className="groupButton">
            <Button
              variant="contained"
              onClick={() => changeCard("prev")}
              color="error"
              disabled={flashcardPosition === 0}
            >
              Voltar no flash card anterior
            </Button>

            <Button
              variant="contained"
              onClick={() => changeCard("next")}
              color="success"
              disabled={flashcardPosition === lastCard}
            >
              Próximo flash card
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
