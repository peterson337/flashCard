"use client";
import React, { Fragment } from "react";
import "../../../style/flashCard.css";
import { FlashCards } from "../../../types/Home";
import Button from "@mui/material/Button";
import { AiFillSound } from "react-icons/ai";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import BtnRedirect from "../../../components/btnRedirect";
import { useParams } from "next/navigation";
import { formatarString } from "../../../Hook/formtString";

export default function Page() {
  const params = useParams();
  const [flashCard, setFlashCard] = React.useState<FlashCards | null>(null);
  const [isShowBack, setIsShowBack] = React.useState<boolean>(false);
  //prettier-ignore
  const [userAnswerStatus, setUserAnswerStatus] = React.useState<"correct" | "wrong" | "">("");
  //prettier-ignore

  const [flashcardPosition, setFlashcardPosition] = React.useState(0);

  const refTitleInput = React.useRef("");

  const idFlashCard = params.id;

  const wordToTranslate = flashCard?.flashCards[flashcardPosition].back;

  //prettier-ignore
  const lastCard = flashCard?.flashCards?.length ? flashCard.flashCards.length - 1 : 0;

  console.log(flashCard?.flashCards[flashcardPosition]);

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

    console.log(refTitleInput.current);
  };

  React.useEffect(() => {
    //prettier-ignore
    const localStorageGet = JSON.parse(localStorage.getItem("flashCards") || "[]");

    setFlashCard(localStorageGet[Number(idFlashCard)]);
  }, [idFlashCard]);

  const changeCard = (params: "prev" | "next") => {
    setIsShowBack(false);
    setUserAnswerStatus("");
    refTitleInput.current = "";
    setFlashcardPosition(
      params === "prev" ? flashcardPosition - 1 : flashcardPosition + 1
    );
  };

  //   console.log(flashCard?.flashCards.length);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGElement>) =>
    setAnchorEl(event.currentTarget as unknown as HTMLElement);

  const handleClose = () => setAnchorEl(null);

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

                <AiFillSound
                  className="text-2xl cursor-pointer"
                  id="demo-positioned-button"
                  aria-controls={open ? "demo-positioned-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                />

                <Menu
                  id="demo-positioned-menu"
                  aria-labelledby="demo-positioned-button"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <a
                    href={`https://translate.google.com/?sl=en&tl=pt&text=${wordToTranslate}&op=translate`}
                    target="_blank"
                  >
                    <MenuItem onClick={handleClose}>Google tradutor</MenuItem>
                  </a>
                  <a
                    href={`https://www.google.com/search?q=how+how+to+pronounce+${wordToTranslate}&oq=how&gs_lcrp=EgZjaHJvbWUqCAgAEEUYJxg7MggIABBFGCcYOzIHCAEQLhiABDIGCAIQRRg9MgYIAxBFGD0yBggEEEUYPTIGCAUQRRhBMgYIBhBFGEEyBggHEEUYQdIBCDEwMDdqMGo3qAIAsAIA&sourceid=chrome&ie=UTF-8`}
                    target="_blank"
                  >
                    <MenuItem onClick={handleClose}>How to pronounce</MenuItem>
                  </a>
                </Menu>
              </div>
            )}
            {
              //prettier-ignore
              flashCard && flashCard.flashCards.map((item, index) => {
                return (
                  <Fragment key={index}>
                    {index === flashcardPosition && (
                      <div className="stylePadrao">
                        <p className="text-center text-2xl">{item.front}</p>
                        <input
                          type="text"
                          placeholder="Digite sua resposta"
                          autoFocus
                          disabled={isShowBack}
                          //prettier-ignore
                          onChange={(e) =>(refTitleInput.current = e.target.value)}
                        />
                        <Button variant="contained" onClick={sendAnswer} disabled={isShowBack}>
                          Enviar resposta
                        </Button>
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
