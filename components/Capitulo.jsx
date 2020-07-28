import { useState, useEffect } from "react";
import Toast from "./Toast";
import {
  Box,
  Heading,
  Text,
  Button,
  ButtonGroup,
  IconButton,
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/core";

export default function Capitulo(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [textoEditable, setTextoEditable] = useState(props.contenido);
  const [pocosCaracteres, setPocosCaracteres] = useState(false);
  console.log("props.usuario: " + props.usuario);
  if (props.usuario) {
    console.log("props.usuario.sub: " + props.usuario.sub);
  }
  console.log("props.idUsuario: " + props.idUsuario);
  useEffect(() => {
    if (pocosCaracteres) {
      toast(Toast.pocosCaracteres);
      setTimeout(() => {
        setPocosCaracteres(false);
      }, 2000);
    }
  }, [pocosCaracteres]);

  function eliminar() {
    const capitulo = {
      idHistoria: props.idHistoria,
      idCapitulo: props.idCapitulo,
    };

    fetch(`/api/eliminar-capitulo/`, {
      method: "post",
      body: JSON.stringify(capitulo),
    });
  }

  function actualizarCapitulo() {
    const capitulo = {
      idHistoria: props.idHistoria,
      idCapitulo: props.idCapitulo,
      contenido: textoEditable,
    };
    if (capitulo.contenido.length > 4) {
      fetch(`/api/editar-capitulo`, {
        method: "post",
        body: JSON.stringify(capitulo),
      });
      onClose();
    } else {
      setPocosCaracteres(true);
    }
  }

  return (
    <>
      <Box m="10px 5px" p={5} shadow="sm">
        <Heading fontSize="xs" color="#cccccc" mb="20px">
          {props.titulo}
        </Heading>

        <Text mt={4} lineHeight="1.5" whiteSpace="pre-wrap">
          {props.contenido}
        </Text>

        {props.usuario && props.usuario.sub === props.idUsuario && (
          <ButtonGroup
            display="flex"
            justifyContent="flex-end"
            size="sm"
            mt="15px"
          >
            <IconButton icon="edit" onClick={onOpen} />
            <IconButton icon="delete" onClick={eliminar} />
          </ButtonGroup>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Editar</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                value={textoEditable}
                maxLength="400"
                onChange={(e) => {
                  setTextoEditable(e.target.value);
                  if (e.target.value.length === 400)
                    toast(Toast.muchosCaracteres);
                }}
                isInvalid={pocosCaracteres ? "true" : "false"}
                size="xl"
                rows="10"
              />
            </ModalBody>

            <ModalFooter>
              <Button variantColor="yellow" mr={3} onClick={actualizarCapitulo}>
                Aceptar
              </Button>
              <Button
                onClick={() => {
                  setTextoEditable(props.contenido);
                  onClose();
                }}
              >
                Cancelar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
