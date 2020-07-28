import Link from "next/link";

import {
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
      <Box justifySelf="center" w={["110px", "200px","400px"]}>
        <Select
          size="sm"
          onChange={props.cambiarHistoria}
          value={props.salaURL}
        >
          {props.salasEnInicio &&
            props.salasEnInicio.map((sala, index) => {
              return (
                <option key={index} value={sala.salaURL}>
                  {sala.salaNombre}
                </option>
              );
            })}
        </Select>
      </Box>

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
              <MenuItem>
                <Link href="index">
                  <a>Inicio</a>
                </Link>
              </MenuItem>
              {!props.cargando &&
                (props.usuario ? (
                  <MenuItem>
                    <Link href="api/auth/logout">
                      <a>Logout</a>
                    </Link>
                  </MenuItem>
                ) : (
                  <MenuItem>
                    <Link href="api/auth/login">
                      <a>Login</a>
                    </Link>
                  </MenuItem>
                ))}
            </MenuList>
          </React.Fragment>
        )}
      </Menu>
    </Grid>
  );
}

function NavVieja({ usuario, cargando }) {
  return (
    <nav id="navbar">
      <h1>Cadex</h1>
      <Link href="index">
        <a>Inicio</a>
      </Link>
      {!cargando &&
        (usuario ? (
          <Link href="api/auth/logout">
            <a>Logout</a>
          </Link>
        ) : (
          <Link href="api/auth/login">
            <a>Login</a>
          </Link>
        ))}
      {usuario && (
        <div className="usuario">
          <p>{usuario.name}</p>
          <img src={usuario.picture} />
        </div>
      )}
      <style jsx>{`
        .usuario {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .usuario p {
          justify-self: right;
          padding-right: 10px;
        }
        img {
          width: 40px;
        }
      `}</style>
    </nav>
  );
}
