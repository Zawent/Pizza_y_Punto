import { ObjectId } from "mongodb";

export async function seedPedidos(db) {
    const col = db.collection("pedidos");
    const count = await col.countDocuments();
    if (count > 0) {
        console.log("ℹ️ Pedidos ya existen. No se insertan.");
        return;
    }

    const cliente = await db.collection("clientes").aggregate([{ $sample: { size: 1 } }]).next();
    if (!cliente) return console.log("❌ No hay clientes para crear pedidos.");

    const pizzas = await db.collection("pizzas").aggregate([{ $sample: { size: 2 } }]).toArray();
    if (pizzas.length < 1) return console.log("❌ No hay pizzas suficientes.");

    const repartidor = await db.collection("repartidores").findOne({ estado: "disponible" });
    if (!repartidor) return console.log("❌ No hay repartidores disponibles.");

    const pizzaIds = pizzas.map(p => p._id);
    const total = pizzas.reduce((sum, p) => sum + Number(p.precio), 0); // Usamos número JS

    const pedido = {
        _id: new ObjectId(),
        clienteId: cliente._id,
        pizzas: pizzaIds,
        total: total,
        fecha: new Date(),
        repartidorAsignado: repartidor._id
    };

    try {
        console.log("Pedido que se intentará insertar:", pedido);
        const res = await col.insertOne(pedido);
        console.log(`✅ Pedido insertado con ID: ${res.insertedId}`);
    } catch (err) {
        console.error("❌ Error al insertar pedido:", err);
    }
}
