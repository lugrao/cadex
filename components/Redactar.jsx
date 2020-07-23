import { useState } from "react";
import { Textarea, Box, Button } from "@chakra-ui/core";

export default function Redactar(props) {
  const [escribir, setEscribir] = useState(false);
  const [contenido, setContenido] = useState({ contenido: "", idUsuario: "" });
  const [textAreaValue, setTextAreaValue] = useState("");
  const [pocosCaracteres, setPocosCaracteres] = useState(false);

  function desplegarTextArea() {
    setEscribir(!escribir);
  }

  function actualizarContenido(event) {
    setContenido({
      contenido: event.target.value,
      idUsuario: props.usuario ? props.usuario.sub : "",
    });
    setTextAreaValue(event.target.value);
  }

  function publicar() {
    if (contenido.contenido.length > 9) {
      fetch(`/api/publicar/${props.urlSala}`, {
        method: "post",
        body: JSON.stringify(contenido),
      });

      setEscribir(false);
      setTextAreaValue("");
      setPocosCaracteres(false);
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <div id="redactar" className="redactar">
      <Box
        display="grid"
        m="10px 7px"
        maxW="30rem"
        p={5}
        // shadow="sm"
        // borderWidth="1px"
        id={props.id}
      >
        <Textarea
          size="lg"
          placeholder="Escribí el siguiente capítulo..."
          rows={escribir ? "4" : "2"}
          maxLength="300"
          className={
            pocosCaracteres ? "form-control is-invalid" : "form-control"
          }
          name="contenido"
          onClick={!escribir ? desplegarTextArea : null}
          onChange={actualizarContenido}
          value={textAreaValue}
        ></Textarea>
        <Button
          mt="7px"
          variantColor="green"
          id="btn-publicar"
          className="btn btn-warning"
          onClick={publicar}
        >
          Publicar
        </Button>
      </Box>

      {pocosCaracteres && (
        <div className="pocos-caracteres">
          Mínimo 10 caracteres. Dale que vos tenés talento.
        </div>
      )}
    </div>
  );
}
