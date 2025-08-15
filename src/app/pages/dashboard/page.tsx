"use client";
import React from "react";
import Modal from "../../components/Modal";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FlashCards } from "../../types/Home";
import BtnRedirect from "../../components/btnRedirect";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { saveDB } from "../../Hook/salveDB";
import Stack from "@mui/material/Stack";
import LoadingCircular from "../../components/LoadingCircular";

export default function Dashboard() {
  const [flashCards, setFlashCards] = React.useState<FlashCards[]>([]);
  const [isReRender, setIsReRender] = React.useState<boolean>(false);
  const [editMode, setEditMode] = React.useState<null | number>(null);
  const [TextInput, setTextInput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  //prettier-ignore
  React.useEffect(() => {
  const getFlashCardsDB = async () => {
    const querySnapshot = await getDocs(collection(db, "flashCards"));
    querySnapshot.forEach((doc) => setFlashCards(doc.data().cards || []));
    setIsLoading(false);
  };

  getFlashCardsDB();
  }, [isReRender]);

  const deleteListFlashCards = (id: number) => {
    //prettier-ignore
    const isDeleteFlashCard = confirm("Deseja excluir este flash card? Esta ação não pode ser desfeita")
    if (isDeleteFlashCard) {
      //prettier-ignore
      const NewListFlashCards = flashCards.filter((item: FlashCards) => item.id !== id);
      saveDB(NewListFlashCards as unknown as FlashCards);
      setIsReRender(!isReRender);
    }
  };

  const updateListFlashCards = (id: number) => {
    const NewListFlashCards = flashCards.filter((item: FlashCards) => {
      if (item.id === id) {
        return (item.flashCardName = TextInput);
      }
      return item;
    });

    saveDB(NewListFlashCards as unknown as FlashCards);
    setIsReRender(!isReRender);
  };

  return (
    <section className="section">
      <div className="content">
        <h2 className="title">Lista de flash cards</h2>
        {isLoading ? (
          <Stack spacing={2} direction="row" alignItems="center">
            <p className="text-2xl">Carregando as listas de flash cards:</p>
            <LoadingCircular />
          </Stack>
        ) : flashCards.length === 0 ? (
          <p>Nenhum flash card encontrado!</p>
        ) : (
          <TableContainer component={Paper} sx={{ maxHeight: 650 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome das listas de flash cards</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {flashCards &&
                  flashCards.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {editMode !== item.id ? (
                          <>{item.flashCardName}</>
                        ) : (
                          <input
                            type="text"
                            value={TextInput}
                            onChange={(e) => setTextInput(e.target.value)}
                            autoFocus={true}
                            onKeyDown={(e) =>
                              e.key === "Enter" && updateListFlashCards(item.id)
                            }
                          />
                        )}
                      </TableCell>
                      <TableCell align="right">
                        <div className="groupButtons">
                          <BtnRedirect
                            color="inherit"
                            router={`/pages/flash-card/${item.id}`}
                            btnText="Acessar"
                          />

                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => {
                              if (editMode === item.id) {
                                updateListFlashCards(item.id);
                                setEditMode(null);
                              } else {
                                setEditMode(item.id);
                                setTextInput(item.flashCardName);
                              }
                            }}
                          >
                            {editMode === item.id ? "Salvar" : "Editar"}
                          </Button>

                          <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                              editMode === item.id
                                ? setEditMode(null)
                                : deleteListFlashCards(item.id)
                            }
                          >
                            {editMode === item.id ? "Cancelar" : "Deletar"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
        <br />

        <Modal flashCards={flashCards} setFlashCards={setFlashCards} />
      </div>
    </section>
  );
}
