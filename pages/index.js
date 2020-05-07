import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Redactar from "../components/Redactar";
import Capitulo from "../components/Capitulo";
import Footer from "../components/Footer";
import useSwr from "swr";
import Router from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSwr("api/capitulos", fetcher);
  if (error) return <div>Ocurrió algún error.</div>;
  if (!data) return <div style={{ display: "none" }}>...</div>;
  
  function agregarCapitulo(nuevoCapitulo) {
    fetch("http://localhost:3000/api/capitulos", {
      method: "post",
      body: nuevoCapitulo,
    });
    location.reload();
  }

  return (
    <Layout>
      <div id="app" className="container">
        <Navbar />
        {data.map((capitulo, index) => {
          return (
            <Capitulo
              key={index}
              titulo={index}
              contenido={capitulo.contenido}
            />
          );
        })}
        <Redactar alPublicar={agregarCapitulo} />
        <Footer />
      </div>
    </Layout>
  );
}
