import { useRouter } from "next/router";
import Inicio from "./index";
import useSwr from "swr";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Sala() {
  const router = useRouter();
  const sala = router.query.sala;
  const [existeSala, setExisteSala] = useState(false);
  const { data, error } = useSwr(`api/salas`, fetcher);

  useEffect(() => {
    if (data) {
      setExisteSala(chequearSiExisteSala(data.URLsDeSalas));
    }
  }, [data]);

  function chequearSiExisteSala(salas) {
    let haySala = false;
    salas.forEach((salaUrl) => {
      if (salaUrl === sala) {
        haySala = true;
        return haySala;
      }
    });
    return haySala;
  }

  if (error) return <h5>Ocurrió algún error.</h5>;
  if (!data) return <Inicio sala={false} />;

  return <Inicio sala={sala} existeSala={existeSala} />;
}
