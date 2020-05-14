import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Redactar from "../components/Redactar";
import Capitulo from "../components/Capitulo";
import Footer from "../components/Footer";
import SinData from "../components/SinData";
import useSwr from "swr";
import Router from "next/router";

const sala = "principal";

const fetcher = (url) => fetch(url).then((res) => res.json());

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Home() {
  const { data, error } = useSwr(`api/historia/${sala}`, fetcher);
  if (error) return <SinData texto= "Ocurrió algún error."/>;
  if (!data) return <SinData texto="Cargando..."/> ;

  const historia = data.historia;
  
  function agregarCapitulo(nuevoCapitulo) {
    fetch(`${url}api/publicar/${sala}`, {
      method: "post",
      body: JSON.stringify(nuevoCapitulo),
    });
    location.reload();
  }

  return (
    <Layout>
      <div id="app" className="container">
        <Navbar sala={data.salaNombre} />
        <div className="flecha-abajo"><a href={`#capitulo-${historia.length}`}>↓</a></div>
        {historia.map((capitulo, index) => {
          return (
            <Capitulo
              key={index}
              titulo={index + 1}
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
