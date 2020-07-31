import { useRouter } from "next/router";
import Home from "./index";

export default function Sala() {
  const router = useRouter();
  const sala = router.query.sala;

  return <Home sala={sala} />;
}
