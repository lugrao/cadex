import nextConnect from "next-connect";
import middleware from "../../middleware/database";

const handler = nextConnect();



handler.use(middleware);

handler.get(async (req, res) => {
  let capitulos = await req.db.collection("capitulos").find().toArray();
  res.json(capitulos);
});

handler.post(async (req, res) => {
  let data = req.body;
  console.log(data);
  await req.db.collection("capitulos").save({"contenido": data});
  res.send("ok");
});

export default handler;