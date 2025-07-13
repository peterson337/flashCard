import React from "react";
import "../../style/Home.css";
import Button from "@mui/material/Button";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase";
import Link from "next/link";
import { cookies } from "next/headers";

export default async function Login({ params }: { params: { slug: string } }) {
  "use server";
  const validation = params.slug || "";

  const createAccount = async (formData: FormData) => {
    "use server";

    // const cookieStore = cookies();

    // const obj = {
    //   name: formData.get("name"),
    //   email: formData.get("email"),
    //   senha: formData.get("senha"),
    //   confirmarSenha: formData.get("confirmarSenha"),
    // };

    // const urlParam = formData.get("slug");

    // //prettier-ignore
    // const validation = urlParam === "create-account"? createUserWithEmailAndPassword : signInWithEmailAndPassword;

    // console.log(formData);

    // validation(auth, obj.email, obj.senha)
    //   .then(async (userCredential) => {
    //     console.log(userCredential.user);
    //     const user = userCredential.user;
    //     //prettier-ignore
    //     cookieStore.set("userId", JSON.stringify(user), {maxAge: 60 * 60 * 24});
    //     if (urlParam === "create-account") {
    //       await updateProfile(user, {
    //         displayName: obj.name,
    //       });
    //     }
    //   })

    //   .catch((error) => {
    //     console.error("Erro:", error.message);
    //   });
  };

  return (
    <section className="section">
      <div className="content">
        <h2 className="title">
          {validation === "login" ? "Login" : "Criar uma conta"}
        </h2>

        <form action={createAccount}>
          <div className="mb-3 flex flex-col">
            <label htmlFor="">Nome de usuário</label>
            <input type="text" name="name" placeholder="Nome de usuário" />
          </div>

          <div className="mb-3 flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={"test@hgn.com"}
            />
          </div>

          <div className="mb-3 flex flex-col">
            <label htmlFor="">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Senha"
              value={"123456789"}
            />
          </div>

          <div className="mb-3 flex flex-col">
            <label htmlFor="">Confirmar senha</label>
            <input
              type="password"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              value={"123456789"}
            />

            <input
              type="text"
              name="slug"
              className="hidden"
              value={validation}
            />
          </div>

          <Button type="submit" sx={{ width: "100%" }} variant="contained">
            {validation === "login" ? "Login" : "Criar conta"}
          </Button>

          <Link
            href={
              validation === "login" ? `/pages/create-account` : `/pages/login`
            }
          >
            {validation === "login"
              ? "Já tem uma conta? Clique aqui"
              : "Ainda não tem uma conta? Clique aqui"}
          </Link>
        </form>
      </div>
    </section>
  );
}
