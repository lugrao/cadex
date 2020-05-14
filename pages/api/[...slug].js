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
    case "historia":
      let historia = await req.db.collection("historias").findOne({
        salaURL: slug[1],
      });
      res.json(historia);
      break;
    case "historias":
      let historias = await req.db.collection("historias").findOne({ _id: ObjectId("5ebbfeabf739b325f0112064") });
      res.json(historias);
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
            },
          },
        }
      );     
      res.send("ok");
      break;
    case "nueva-historia":
      let salaNombre = data.sala;
      let salaURL = (_.kebabCase(_.deburr(salaNombre)));
      salaURL = salaURL.toLowerCase();
      await req.db.collection("historias").insertOne({ salaNombre: salaNombre, salaURL: salaURL, historia: [] });
      await req.db.collection("historias").updateOne(
        {
          _id: ObjectId("5ebbfeabf739b325f0112064")
        },
        {
          $push: {
            URLsDeSalas: salaURL            
          }
        }
      )
      res.send("piola");
  }
});

export default handler;
