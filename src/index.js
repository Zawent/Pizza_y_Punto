import { conectarDB } from "./database/connection.js";
import { seedIngredientes } from "./seed/seedIngredientes.js";
import { seedPizzas } from "./seed/seedPizzas.js";
import { seedClientes } from "./seed/seedClientes.js";
import { seedRepartidores } from "./seed/seedRepartidores.js";
import { seedPedidos } from "./seed/seedPedidos.js"; // Ignorar por ahora

try {
  const db = await conectarDB();

  await seedIngredientes(db);
  await seedPizzas(db);
  await seedClientes(db);
  await seedRepartidores(db);
  await seedPedidos(db); // Ignorar por ahora

  process.exit();
} catch (error) {
  console.error("❌ Error al ejecutar seeders:", error.message);
  process.exit(1);
}
