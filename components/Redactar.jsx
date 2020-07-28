import { useState, useEffect } from "react";
import Toast from "./Toast";
import { Textarea, Box, Button, useToast } from "@chakra-ui/core";

export default function Redactar(props) {
  const toast = useToast();
  const [contenido, setContenido] = useState({ contenido: "", idUsuario: "" });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  useEffect(() => {
    if (pocosCaracteres) {
      toast(Toast.pocosCaracteres);
      setTimeout(() => {
        setPocosCaracteres(false);
      }, 2000);
    }
  }, [pocosCaracteres]);

  function actualizarContenido(event) {
    const texto = event.target.value;
    setContenido({
      contenido: texto,
      idUsuario: props.usuario ? props.usuario.sub : "",
    });
    setTextAreaValue(event.target.value);
    if (pocosCaracteres) setPocosCaracteres(false);
    if (texto.length === 400)
      toast(Toast.muchosCaracteres);
  }

  function publicar() {
    if (contenido.contenido.length > 4) {
      fetch(`/api/publicar/${props.urlSala}`, {
        method: "post",
        body: JSON.stringify(contenido),
      });
      setTextAreaValue("");
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <>
      <Box
        display="grid"
        gridTemplateRows="3fr 1fr"
        m="10px 7px"
        maxW="30rem"
        p={5}
        id={props.id}
      >
        <Textarea
          h="8rem"
          placeholder="Escribí el siguiente capítulo..."
          isInvalid={pocosCaracteres ? "true" : "false"}
          maxLength="400"
          className={
            pocosCaracteres ? "form-control is-invalid" : "form-control"
          }
          name="contenido"
          onChange={actualizarContenido}
          value={textAreaValue}
        ></Textarea>

        <Button
          mt="5px"
          variantColor="yellow"
          id="btn-publicar"
          className="btn btn-warning"
          onClick={publicar}
        >
          Publicar
        </Button>
      </Box>
    </>
  );
}
