import { MongoClient } from "mongodb";

const url = 'mongodb://localhost:27017/';
const database_name = "pizza_y_punto";

const cliente = new MongoClient(url);

export async function conectarDB() {
  await cliente.connect();
  return cliente.db(database_name);
}

export function getClient() {
  return cliente;
}
