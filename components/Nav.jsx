import Link from "next/link";
import useSwr from "swr";
import SinData from "./SinData";
import Toast from "./Toast";

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
  useToast,
} from "@chakra-ui/core";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Nav(props) {
  const { data, error } =  useSwr(
    props.enInicio ? `api/salas-en-inicio` : null,
    fetcher
  );
  // const salasEnInicio = data.salasEnInicio;  
  const toast = useToast();
  

  if (error) return <SinData texto="Ocurrió algún error." />;
  if (!data) return <Grid pos="fixed" w="100%" h="3.5rem"></Grid>;
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
        textShadow="3px 3px 1px #975A16"
      >
        <Link href="index">
          <a>cadex</a>
        </Link>
      </Heading>

      {!props.enInicio ? (
        <Heading justifySelf="center" size="lg" color="white">
          {props.salaNombre}
        </Heading>
      ) : (
        <Box justifySelf="center" w={["110px", "200px", "400px"]}>
          <Select
            size="sm"
            onChange={props.cambiarHistoria}
            value={props.salaURL}
          >
            {data.salasEnInicio &&
              data.salasEnInicio.map((sala, index) => {
                return (
                  <option key={index} value={sala.salaURL}>
                    {sala.salaNombre}
                  </option>
                );
              })}
          </Select>
        </Box>
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

              <MenuItem onClick={()=>{toast(Toast.pronto)}}>
                <p>Nueva historia</p>
              </MenuItem>

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
