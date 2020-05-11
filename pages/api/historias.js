import nextConnect from "next-connect";
import middleware from "../../middleware/database";
import {
  ObjectId
} from "mongodb";

const handler = nextConnect();



handler.use(middleware);

handler.get(async (req, res) => {
  let historia = await req.db.collection("historias").findOne({
    _id: ObjectId("5eb99961741bec6d1e8d9a37")
  });
  res.json(historia);
  console.log(historia);
});

handler.post(async (req, res) => {
  let data = req.body;
  data = JSON.parse(data);
  console.log(data);
  await req.db.collection("historias").updateOne({
    _id: ObjectId("5eb99961741bec6d1e8d9a37")
  }, {
    $push: {
      historia: {
        _id: ObjectId(),
        contenido: data.contenido
      }
    }
  });
  res.send("ok");
});

export default handler;