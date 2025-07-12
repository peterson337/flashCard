import React, { SetStateAction } from "react";

export type Props = {
  flashCardNames: FlashCards[];
  setFlashCardsInformation: React.Dispatch<
    SetStateAction<FlashCardsInformation>
  >;
  flashCardsInformation: FlashCardsInformation;
};

export type FlashCardsInformation = {
  flashCardName: string;
  front: string;
  back: string;
};

export type FlashCards = {
  flashCardName: string;
  flashCards: FlashCard;
  id: number;
};

export type FlashCard = {
  front: string;
  back: string;
  id: number;
}[];
