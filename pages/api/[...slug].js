import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import { ObjectId } from "mongodb";

const _ = require("lodash");

const handler = nextConnect();
handler.use(middleware);

handler.get(async (req, res) => {
  const {
    query: { slug },
  } = req;

  switch (slug[0]) {
    case "sala":
      try {
        let historia = await req.db.collection("historias").findOne({
          salaURL: slug[1],
        });
        res.json(historia);
      } catch (err) {
        console.log(err)
      }
      
      break;
    case "salas":
      let historias = await req.db
        .collection("historias")
        .findOne({ _id: ObjectId("5ebbfeabf739b325f0112064") });
      res.json(historias);
      break;
    case "salas-en-inicio":
      let salasEnInicio = await req.db
        .collection("historias")
        .findOne({ _id: ObjectId("5ed9bf659c3f650008f325bf") });
      res.json(salasEnInicio);
  }
});

handler.post(async (req, res) => {
  const {
    query: { slug },
  } = req;

  let data = req.body;
  data = JSON.parse(data);

  switch (slug[0]) {
    case "publicar":
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
      );
      res.send("ok");
      break;
    case "nueva-historia":
      let salaNombre = data.salaNombre;
      let salaURL = data.salaURL;
      await req.db.collection("historias").insertOne({
        salaNombre: salaNombre,
        salaURL: salaURL,
        enInicio: data.enInicio,
        historia: [],
      });
      await req.db.collection("historias").updateOne(
        {
          _id: ObjectId("5ebbfeabf739b325f0112064"),
        },
        {
          $push: {
            URLsDeSalas: salaURL,
          },
        }
      );
      if (data.enInicio) {
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
          },
          (err, result) => {
            if (err) res.send(err);
            res.send("Historia creada con éxito.");
          }
        );
      }

      res.send("piola");
      break;
    case "eliminar-capitulo":
      const idHistoria = data.idHistoria;
      const idCapitulo = data.idCapitulo;
      await req.db.collection("historias").updateOne(
        { _id: ObjectId(idHistoria) },
        {
          $pull: {
            historia: {
              _id: ObjectId(idCapitulo),
            },
          },
        },
        (err, result) => {
          if (err) console.log(err);
          res.send("capítulo eliminado");
        }
      );
      break;
    case "editar-capitulo":
      const contenidoNuevo = data.contenido;
      const idDeHistoria = data.idHistoria;
      const idDeCapitulo = data.idCapitulo;
      await req.db.collection("historias").updateOne(
        { _id: ObjectId(idDeHistoria), "historia._id": ObjectId(idDeCapitulo) },
        {
          $set: {
            "historia.$.contenido": contenidoNuevo,
          },
        },
        (err, result) => {
          if (err) res.send(err);
          res.send("capítulo actualizado");
        }
      );
  }
});

export default handler;
