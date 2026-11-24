const fs = require("fs/promises");
const path = require("path");
const FILE = path.join(__dirname, "../../data/products.json");
const read = async () => JSON.parse(await fs.readFile(FILE, "utf8"));
const write = async data => fs.writeFile(FILE, JSON.stringify(data, null, 2), "utf8");

async function getAll({category, search}={}) {
  let data = await read();
  if (category) data = data.filter(p => p.category.toLowerCase() === category.toLowerCase());
  if (search) data = data.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  return data;
}
async function getById(id) { return (await read()).find(p => p.id === Number(id)); }
async function create(data) {
  const all = await read();
  const id = all.length ? Math.max(...all.map(p => p.id)) + 1 : 1;
  const item = {id, ...data}; all.push(item); await write(all); return item;
}
async function update(id, data) {
  const all = await read(), i = all.findIndex(p => p.id === Number(id));
  if (i < 0) return null;
  all[i] = {...all[i], ...data, id:Number(id)}; await write(all); return all[i];
}
async function remove(id) {
  const all = await read(), next = all.filter(p => p.id !== Number(id));
  if (next.length === all.length) return false;
  await write(next); return true;
}
async function categories() { return [...new Set((await read()).map(p=>p.category))].sort(); }
module.exports = {getAll,getById,create,update,remove,categories};