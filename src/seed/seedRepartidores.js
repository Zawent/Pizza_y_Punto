import { ObjectId } from "mongodb";

export const repartidores = [
  { _id: new ObjectId(), nombre: "Juan Ramírez", zona: "Norte", estado: "disponible" },
  { _id: new ObjectId(), nombre: "Diana Torres", zona: "Sur", estado: "ocupado" },
  { _id: new ObjectId(), nombre: "Luis Gómez", zona: "Centro", estado: "disponible" }
];

export async function seedRepartidores(db) {
  const col = db.collection("repartidores");
  const count = await col.countDocuments();
  if (count > 0) {
    console.log("ℹ️ Repartidores ya existen. No se insertan.");
    return;
  }

  const res = await col.insertMany(repartidores);
  console.log(`✅ Repartidores insertados: ${res.insertedCount}`);
}
