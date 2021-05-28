import Layout from "./Layout"
import Nav from "./Nav"
import { Grid, Spinner } from "@chakra-ui/core"
import Footer from "./Footer"

export default function PaginaSinData() {
  return (
    <Layout>
      <Grid gap={20} justifyContent="center">
        <Nav />
        <Spinner
          display="grid"
          thickness="4px"
          speed="0.25s"
          emptyColor="gray.200"
          color="yellow.500"
          size="xl"
          margin="7rem auto"
        />
      </Grid>
    </Layout>
  )
}
