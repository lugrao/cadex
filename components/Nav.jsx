import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Image,
  Heading,
  Grid,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
} from "@chakra-ui/core";

export default function Nav(props) {
  const [salasEnInicio, setSalasEnInicio] = useState(false);

  useEffect(() => {
    if (props.enInicio) {
      fetch("api/salas-en-inicio")
        .then((res) => res.json())
        .then((data) => {
          setSalasEnInicio(data.salasEnInicio);
        });
    }
  }, [props.enInicio]);

  return (
    <Grid
      zIndex={1}
      pos="fixed"
      w="100%"
      h="3.5rem"
      alignItems="center"
      templateColumns="1fr 1.5fr 1fr"
      gap="15px"
      bg="black"
      boxShadow="2px 2px 1px #D69E2E"
    >
      <Heading
        as="h1"
        fontSize={["25px", "35px"]}
        color="yellow.50"
        bg="black"
        ml="15px"
        mb="2px"
        alignSelf="center"
        textShadow="3px 3px 1px #975A16"
      >
        <Link href="index">
          <a>cadex</a>
        </Link>
      </Heading>
      {props.enInicio ? (
        <Box justifySelf="center" w={["110px", "200px", "400px"]}>
          {props.salaNombre !== null && props.enInicio && (
            <Select
              size="sm"
              onChange={props.cambiarHistoria}
              value={props.salaURL}
            >
              {salasEnInicio &&
                salasEnInicio.map((sala, index) => {
                  return (
                    <option key={index} value={sala.salaURL}>
                      {sala.salaNombre}
                    </option>
                  );
                })}
            </Select>
          )}
        </Box>
      ) : (
        <Heading
          justifySelf="center"
          textAlign="center"
          fontSize={["15px", "17px", "20px"]}
          w="100%"
          mt={["2px", "6px", "5px"]}
          color="white"
          isTruncated={true}
        >
          {props.salaNombre}
        </Heading>
      )}

      <Menu>
        {({ isOpen }) => (
          <React.Fragment>
            <MenuButton
              justifySelf="end"
              marginRight="10px"
              size="sm"
              maxW="100px"
              isActive={isOpen}
              as={Button}
              rightIcon="chevron-down"
            >
              {isOpen ? "Menos" : "Más"}
            </MenuButton>
            <MenuList>
              <Link href="index">
                <a>
                  <MenuItem>
                    <p>Inicio</p>
                  </MenuItem>
                </a>
              </Link>
              {!props.nuevaHistoria && (
                <Link href="NuevaHistoria">
                  <a>
                    <MenuItem>
                      <p>Nueva historia</p>
                    </MenuItem>
                  </a>
                </Link>
              )}

              <Link
                href={
                  !props.cargandoUsuario && props.usuario
                    ? "api/auth/logout"
                    : "api/auth/login"
                }
              >
                <a>
                  <MenuItem display="grid" gridTemplateColumns="1fr 1fr">
                    <p>
                      {[
                        !props.cargandoUsuario && props.usuario
                          ? "Logout"
                          : "Login",
                      ]}
                    </p>
                    <Image
                      justifySelf="end"
                      size="25px"
                      mr="15px"
                      rounded="full"
                      src={
                        !props.cargandoUsuario && props.usuario
                          ? props.usuario.picture
                          : "/usuario.svg"
                      }
                      objectFit="cover"
                    />
                  </MenuItem>
                </a>
              </Link>
            </MenuList>
          </React.Fragment>
        )}
      </Menu>
    </Grid>
  );
}
