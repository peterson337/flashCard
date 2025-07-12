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

export type Props = {
  flashCards: FlashCards[];
  setFlashCards: (params: FlashCards[]) => void;
};
