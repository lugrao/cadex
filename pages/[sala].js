// import Layout from "../components/Layout";
// import Nav from "../components/Nav";
// import Redactar from "../components/Redactar";
// import Capitulo from "../components/Capitulo";
// import Footer from "../components/Footer";
// import SinData from "../components/SinData";
// import useSwr from "swr";
// import { useRouter } from "next/router";

// const fetcher = (url) => fetch(url).then((res) => res.json());

// const dev = process.env.NODE_ENV !== "production";
// const url = dev ? "http://localhost:3000/" : "https://cadex.now.sh/";

// export default function Historia() {
//   const router = useRouter();
//   const idHistoria = router.query.id;

//   const { data, error } = useSwr(`${url}api/historia/${idHistoria}`, fetcher, {
//     refreshInterval: 1,
//   });
//   if (error) return <SinData texto="Ocurrió algún error." error={error} />;
//   if (!data) return <SinData texto="Cargando..." />;

//   const historia = data.historia;

//   function agregarCapitulo(nuevoCapitulo) {
//     fetch(`${url}api/publicar/${idHistoria}`, {
//       method: "post",
//       body: JSON.stringify(nuevoCapitulo),
//     });
//     location.reload();
//   }

//   return (
//     <Layout>
//       <div id="app" className="container">
//         <Nav sala={data.salaNombre} />
//         <div className="flecha-abajo">
//           <a href={`#capitulo-${historia.length}`}>↓</a>
//         </div>
//         {historia.map((capitulo, index) => {
//           return (
//             <Capitulo
//               key={index}
//               titulo={index + 1}
//               contenido={capitulo.contenido}
//             />
//           );
//         })}
//         <Redactar alPublicar={agregarCapitulo} />
//         <Footer />
//       </div>
//     </Layout>
//   );
// }

//////////////////////////////////////////////////////////////////////////////////////////////////////
import { useRouter } from "next/router";
import Home from "./index";

export default function Sala() {
  const router = useRouter();
  const sala = router.query.sala;


  return <Home sala={sala} />;
}
