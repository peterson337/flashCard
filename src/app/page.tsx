"use client";
import React from "react";
import Modal from "./components/Modal";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FlashCards } from "./types/Home";
import BtnRedirect from "./components/btnRedirect";

export default function Home() {
  const [flashCards, setFlashCards] = React.useState<FlashCards[]>([]);

  //prettier-ignore
  React.useEffect(() => setFlashCards(JSON.parse(localStorage.getItem("flashCards") || "[]")), []);
  // <p>Nenhum flash card encontrado!</p>
  return (
    <section className="section">
      <div className="content">
        {flashCards.length === 0 ? (
          <p>Nenhum flash card encontrado!</p>
        ) : (
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Nome dos flash cards</TableCell>
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
                        {item.flashCardName}
                      </TableCell>
                      <TableCell align="right">
                        <div className="groupButtons">
                          <BtnRedirect
                            color="inherit"
                            router={`/pages/flash-card/${item.id}`}
                            btnText="Acessar"
                          />

                          <Button variant="contained" color="success">
                            Editar
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
