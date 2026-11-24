# API local de mantenimiento de productos

API REST con Node.js + Express. Incluye datos de prueba y guarda los cambios en `data/products.json` para conservarlos al reiniciar el servidor.

## Ejecutar
Requisito: Node.js 18 o superior.

```bash
npm install
npm run dev
```
API: `http://localhost:3000`

## Producto
```json
{
  "id": 1,
  "category": "Laptops",
  "name": "Laptop Lenovo IdeaPad 3",
  "stock": 12,
  "imageUrl": "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800"
}
```
El ID se genera automáticamente. Stock debe ser entero >= 0.

## Endpoints
| Método | URL | Acción |
|---|---|---|
| GET | `/api/products` | Listar |
| GET | `/api/products/:id` | Consultar uno |
| POST | `/api/products` | Registrar |
| PUT | `/api/products/:id` | Actualizar |
| PATCH | `/api/products/:id` | Actualizar parcialmente |
| DELETE | `/api/products/:id` | Eliminar |
| GET | `/api/products/categories` | Listar categorías |

Filtros: `/api/products?category=Laptops` o `/api/products?search=mouse`.

## Ejemplo POST (Postman / Thunder Client)
Método POST, URL `http://localhost:3000/api/products`, header `Content-Type: application/json`, body:

```json
{
  "category": "Accesorios",
  "name": "Mouse gamer RGB",
  "stock": 25,
  "imageUrl": "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800"
}
```

## Conectar desde React
```js
const respuesta = await fetch("http://localhost:3000/api/products");
const resultado = await respuesta.json();
setProductos(resultado.data);
```

## Pruebas en PowerShell
```powershell
Invoke-RestMethod http://localhost:3000/api/products
```
```powershell
$body = @{ category="Audio"; name="Parlante Bluetooth"; stock=10; imageUrl="https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800" } | ConvertTo-Json
Invoke-RestMethod -Uri http://localhost:3000/api/products -Method Post -ContentType "application/json" -Body $body
```

**Nota:** es un backend local de práctica con persistencia en archivo JSON, no una base de datos de producción.
