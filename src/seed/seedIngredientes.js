import { ObjectId } from "mongodb";

export const ingredientes = [
  { _id: new ObjectId(), nombre: "Mozzarella", tipo: "queso", stock: 50 },
  { _id: new ObjectId(), nombre: "Tomate", tipo: "salsa", stock: 40 },
  { _id: new ObjectId(), nombre: "Pepperoni", tipo: "topping", stock: 30 },
  { _id: new ObjectId(), nombre: "Tofu", tipo: "queso", stock: 25 },
  { _id: new ObjectId(), nombre: "Pimentón", tipo: "topping", stock: 35 },
  { _id: new ObjectId(), nombre: "Champiñones", tipo: "topping", stock: 45 }
];

export async function seedIngredientes(db) {
  const col = db.collection("ingredientes");
  const count = await col.countDocuments();
  if (count > 0) {
    console.log("ℹ️ Ingredientes ya existen. No se insertan.");
    return;
  }

  const res = await col.insertMany(ingredientes);
  console.log(`✅ Ingredientes insertados: ${res.insertedCount}`);
}
