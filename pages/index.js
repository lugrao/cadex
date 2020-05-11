import Layout from "../components/Layout";
import Navbar from "../components/Navbar";
import Redactar from "../components/Redactar";
import Capitulo from "../components/Capitulo";
import Footer from "../components/Footer";
import NoDataPage from "../components/NoDataPage";
import useSwr from "swr";
import Router from "next/router";

const fetcher = (url) => fetch(url).then((res) => res.json());

const dev = process.env.NODE_ENV !== "production";
const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

export default function Home() {
  const { data, error } = useSwr("api/historias", fetcher);
  if (error) return <div>Ocurrió algún error.</div>;
  if (!data) return <NoDataPage/> ;

  const historia = data.historia;
  
  function agregarCapitulo(nuevoCapitulo) {
    fetch(`${url}api/historias`, {
      method: "post",
      body: JSON.stringify(nuevoCapitulo),
    });
    location.reload();
  }

  return (
    <Layout>
      <div id="app" className="container">
        <Navbar />
        <div className="flecha-abajo"><a href={`#capitulo-${historia.length - 1}`}>↓</a></div>
        {historia.map((capitulo, index) => {
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
