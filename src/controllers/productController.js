const db = require("../services/productService");
function validate(body, partial=false) {
  const errors=[], fields=["category","name","stock","imageUrl"];
  if (!partial) for (const f of fields) if (body[f] === undefined || body[f] === "") errors.push(`${f} es obligatorio.`);
  if (body.category !== undefined && (typeof body.category !== "string" || !body.category.trim())) errors.push("category debe ser texto.");
  if (body.name !== undefined && (typeof body.name !== "string" || !body.name.trim())) errors.push("name debe ser texto.");
  if (body.stock !== undefined && (!Number.isInteger(Number(body.stock)) || Number(body.stock)<0)) errors.push("stock debe ser entero mayor o igual a cero.");
  if (body.imageUrl !== undefined) {
    try { const u=new URL(body.imageUrl); if (!["http:","https:"].includes(u.protocol)) throw Error(); }
    catch { errors.push("imageUrl debe ser una URL http o https válida."); }
  }
  return errors;
}
exports.list=async(req,res,next)=>{try{const data=await db.getAll(req.query);res.json({total:data.length,data});}catch(e){next(e);}};
exports.detail=async(req,res,next)=>{try{const p=await db.getById(req.params.id);if(!p)return res.status(404).json({message:"Producto no encontrado."});res.json(p);}catch(e){next(e);}};
exports.create=async(req,res,next)=>{try{const errors=validate(req.body);if(errors.length)return res.status(400).json({message:"Datos inválidos",errors});const p=await db.create({category:req.body.category.trim(),name:req.body.name.trim(),stock:Number(req.body.stock),imageUrl:req.body.imageUrl.trim()});res.status(201).json({message:"Producto creado",data:p});}catch(e){next(e);}};
exports.update=async(req,res,next)=>{try{const errors=validate(req.body,true);if(errors.length)return res.status(400).json({message:"Datos inválidos",errors});const b={...req.body};if(b.category!==undefined)b.category=b.category.trim();if(b.name!==undefined)b.name=b.name.trim();if(b.stock!==undefined)b.stock=Number(b.stock);const p=await db.update(req.params.id,b);if(!p)return res.status(404).json({message:"Producto no encontrado."});res.json({message:"Producto actualizado",data:p});}catch(e){next(e);}};
exports.remove=async(req,res,next)=>{try{if(!await db.remove(req.params.id))return res.status(404).json({message:"Producto no encontrado."});res.json({message:"Producto eliminado."});}catch(e){next(e);}};
exports.categories=async(req,res,next)=>{try{res.json(await db.categories());}catch(e){next(e);}};