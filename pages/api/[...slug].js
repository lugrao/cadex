import nextConnect from "next-connect"
import middleware from "../../middleware/database"
import { ObjectId } from "mongodb"

const _ = require("lodash")

const handler = nextConnect()
handler.use(middleware)

handler.get(async (req, res) => {
  const {
    query: { slug },
  } = req

  switch (slug[0]) {
    case "sala":
      try {
        let historia = await req.db.collection("historias").findOne({
          salaURL: slug[1],
        })
        res.json(historia)
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break

    case "salas":
      try {
        let historias = await req.db
          .collection("historias")
          .findOne({ _id: ObjectId("5ebbfeabf739b325f0112064") })
        res.json(historias)
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break

    case "salas-en-inicio":
      try {
        let salasEnInicio = await req.db
          .collection("historias")
          .findOne({ _id: ObjectId("5ed9bf659c3f650008f325bf") })
        res.json(salasEnInicio)
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break
  }
})

handler.post(async (req, res) => {
  const {
    query: { slug },
  } = req

  let data = req.body
  data = JSON.parse(data)

  switch (slug[0]) {
    case "publicar":
      try {
        await req.db.collection("historias").updateOne(
          {
            salaURL: slug[1],
          },
          {
            $push: {
              historia: {
                _id: ObjectId(),
                contenido: data.contenido,
                idUsuario: data.idUsuario,
              },
            },
          }
        )
        res.send("capítulo publicado")
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break

    case "nueva-historia":
      let salaNombre = data.salaNombre
      let salaURL = data.salaURL

      try {
        await req.db.collection("historias").insertOne({
          salaNombre: salaNombre,
          salaURL: salaURL,
          enInicio: data.enInicio,
          historia: [],
        })
      } catch (error) {
        console.log(error)
        res.send(error)
        break
      }

      try {
        await req.db.collection("historias").updateOne(
          {
            _id: ObjectId("5ebbfeabf739b325f0112064"),
          },
          {
            $push: {
              URLsDeSalas: salaURL,
            },
          }
        )
      } catch (error) {
        console.log(error)
        res.send(error)
        break
      }

      if (data.enInicio) {
        try {
          await req.db.collection("historias").updateOne(
            {
              _id: ObjectId("5ed9bf659c3f650008f325bf"),
            },
            {
              $push: {
                salasEnInicio: {
                  salaNombre: salaNombre,
                  salaURL: salaURL,
                },
              },
            }
          )
        } catch (error) {
          console.log(error)
          res.send(error)
          break
        }
      }
      res.send("historia creada")
      break

    case "eliminar-capitulo":
      const idHistoria = data.idHistoria
      const idCapitulo = data.idCapitulo

      try {
        await req.db.collection("historias").updateOne(
          { _id: ObjectId(idHistoria) },
          {
            $pull: {
              historia: {
                _id: ObjectId(idCapitulo),
              },
            },
          }
        )
        res.send("capítulo eliminado")
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break

    case "editar-capitulo":
      const contenidoNuevo = data.contenido
      const idDeHistoria = data.idHistoria
      const idDeCapitulo = data.idCapitulo

      try {
        await req.db.collection("historias").updateOne(
          {
            _id: ObjectId(idDeHistoria),
            "historia._id": ObjectId(idDeCapitulo),
          },
          {
            $set: {
              "historia.$.contenido": contenidoNuevo,
            },
          }
        )
        res.send("capítulo actualizado")
      } catch (error) {
        console.log(error)
        res.send(error)
      }
      break
  }
})

export default handler
