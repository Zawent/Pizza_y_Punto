export const pizzasBase = [
  {
    nombre: "Pizza Margarita",
    categoria: "tradicional",
    precio: 20000,
    ingredientes: ["Mozzarella", "Tomate"]
  },
  {
    nombre: "Pizza Pepperoni",
    categoria: "especial",
    precio: 25000,
    ingredientes: ["Mozzarella", "Tomate", "Pepperoni"]
  },
  {
    nombre: "Pizza Vegana",
    categoria: "vegana",
    precio: 23000,
    ingredientes: ["Tofu", "Pimentón", "Champiñones"]
  }
];

export async function seedPizzas(db) {
  const col = db.collection("pizzas");
  const count = await col.countDocuments();
  if (count > 0) {
    console.log("ℹ️ Pizzas ya existen. No se insertan.");
    return;
  }

  const ingredientesCol = db.collection("ingredientes");
  const ingredientesDB = await ingredientesCol.find().toArray();

  const getId = (nombre) => {
    const ing = ingredientesDB.find(i => i.nombre === nombre);
    if (!ing) throw new Error(`Ingrediente no encontrado: ${nombre}`);
    return ing._id;
  };

  const pizzas = pizzasBase.map(pizza => ({
    ...pizza,
    ingredientes: pizza.ingredientes.map(getId)
  }));

  const res = await col.insertMany(pizzas);
  console.log(`✅ Pizzas insertadas: ${res.insertedCount}`);
}
