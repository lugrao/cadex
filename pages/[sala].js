import { useRouter } from "next/router";
import Inicio from "./index";

export default function Sala() {
  const router = useRouter();
  const sala = router.query.sala;

  return <Inicio sala={sala} />;
}
