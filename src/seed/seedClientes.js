import { ObjectId } from "mongodb";

export const clientes = [
  { _id: new ObjectId(), nombre: "Ana López", telefono: "3001234567", direccion: "Calle 10 #45-23" },
  { _id: new ObjectId(), nombre: "Carlos Pérez", telefono: "3017654321", direccion: "Carrera 15 #30-50" },
  { _id: new ObjectId(), nombre: "Laura García", telefono: "3029876543", direccion: "Avenida 68 #22-19" }
];

export async function seedClientes(db) {
  const col = db.collection("clientes");
  const count = await col.countDocuments();
  if (count > 0) {
    console.log("ℹ️ Clientes ya existen. No se insertan.");
    return;
  }

  const res = await col.insertMany(clientes);
  console.log(`✅ Clientes insertados: ${res.insertedCount}`);
}
