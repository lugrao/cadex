import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();



handler.use(middleware);

handler.get(async (req, res) => {
  let historia = await req.db.collection("historias").findOne({sala: "Principal"});
  res.json(historia);
  console.log(historia);
});

handler.post(async (req, res) => {
  let data = req.body;
  console.log(data);
  await req.db.collection("historias").updateOne({ sala: "Principal" }, { historia: [{ contenido: data }] });
  res.send("ok");
});

export default handler;