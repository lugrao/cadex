import Layout from "../components/Layout"
import Nav from "../components/Nav"
import SinData from "../components/SinData"
import { useState } from "react"
import { useFetchUser } from "../lib/user"
import useSwr from "swr"
import _ from "lodash"
import Router from "next/router"
import {
  Box,
  Text,
  Button,
  Grid,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Checkbox,
  Heading,
} from "@chakra-ui/core"

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function NuevaHistoria() {
  const { user, loading } = useFetchUser()
  const [nombreDeSala, setNombreDeSala] = useState("")
  const [urlDeSala, setUrlDeSala] = useState("")
  const [urlNoDisponible, setUrlNoDisponible] = useState(false)
  const [enInicio, setEnInicio] = useState(true)
  const [redireccionando, setRedireccionando] = useState(false)
  const { data, error } = useSwr(`api/salas`, fetcher)

  function actualizarNombreDeSala(event) {
    const sala = event.target.value
    const urlDeSala = _.kebabCase(_.deburr(sala)).toLowerCase()
    setNombreDeSala(sala)
    setUrlDeSala(urlDeSala)
    chequearUrl(urlDeSala)
  }

  function chequearUrl(urlDeUsuario) {
    setUrlNoDisponible(false)
    const urlsDeDb = data.URLsDeSalas
    urlsDeDb.forEach((url) => {
      if (url === urlDeUsuario) {
        return setUrlNoDisponible(true)
      }
    })
  }

  function crearNuevaHistoria() {
    if (urlDeSala) {
      try {
        fetch(`api/nueva-historia/`, {
          method: "post",
          body: JSON.stringify({
            salaNombre: nombreDeSala,
            salaURL: urlDeSala,
            enInicio: enInicio,
          }),
        })
      } catch (error) {
        console.log(error)
      }
      setRedireccionando(true)
    } else {
      return setUrlNoDisponible(true)
    }
  }

  if (redireccionando) {
    setTimeout(() => {
      Router.push(`/${urlDeSala}`)
    }, 3500)
    return <SinData />
  }
  if (error) return <h5>Ocurrió algún error.</h5>
  if (!data) return <SinData />

  return (
    <Layout>
      <Nav nuevaHistoria={true} usuario={user} />
      <Grid
        maxW="33rem"
        p="5rem 10px"
        gridTemplateColumns="minmax(10rem, 30rem)"
        m="0 auto"
      >
        <Box p="40px" shadow="sm">
          <Heading size="lg" m="20px 0 40px">
            Crear nueva historia
          </Heading>
          <FormControl isInvalid={urlNoDisponible}>
            <FormLabel htmlFor="nombre-de-sala">Nombre de la sala:</FormLabel>
            <Input
              type="text"
              id="nombre-de-sala"
              value={nombreDeSala}
              onChange={actualizarNombreDeSala}
            />
            <FormErrorMessage position="absolute">
              URL no disponible
            </FormErrorMessage>
            <Text mt="40px">
              La URL de tu sala será
              <b>{` https://cadex.vercel.app/`}</b>
              <b
                style={urlNoDisponible ? { color: "red" } : { color: "green" }}
              >
                {urlDeSala}
              </b>
            </Text>
            <Box mt="40px">
              <Checkbox
                variantColor="green"
                defaultIsChecked={enInicio}
                onChange={() => {
                  setEnInicio(!enInicio)
                }}
              >
                Mostrar sala en el Inicio
              </Checkbox>
            </Box>

            <Button
              mt="50px"
              variantColor="yellow"
              type="submit"
              onClick={!urlNoDisponible ? crearNuevaHistoria : undefined}
            >
              Crear
            </Button>
          </FormControl>
        </Box>
      </Grid>
    </Layout>
  )
}
