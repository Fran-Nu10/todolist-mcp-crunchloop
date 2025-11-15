# TodoList API + MCP Server  
**Crunchloop – Jr AI Full Stack Developer Challenge**

Este proyecto implementa una API REST de listas de tareas (**C# + ASP.NET + EF Core + SQLite**) junto con un **servidor MCP en Node.js/TypeScript** que expone herramientas para que un cliente MCP (como Claude Desktop) pueda interactuar con la API mediante lenguaje natural.

El objetivo es permitir acciones como:
- Crear ítems
- Actualizar ítems
- Completar ítems
- Eliminar ítems
- Buscar listas por nombre  
todo mediante prompts como:
> "Crear un ítem en la lista Trabajo con la descripción 'Terminar informe'."

---

# 📌 Arquitectura

/backend-dotnet/ → API REST (C# + ASP.NET)
/mcp-server/ → Servidor MCP (Node.js + TypeScript)
/README.md → Documentación

yaml
Copiar código

---

# 🚀 Requisitos

### **Backend (API C#)**
- .NET SDK 8.0 o superior  
- No requiere instalación manual de SQLite (la DB se genera automáticamente)

### **MCP Server**
- Node.js 18+  
- npm 9+

---

# 🟩 Instalación y Ejecución

## 1️⃣ Clonar el repositorio

```bash
git clone <URL_DEL_REPO>
cd <carpeta-del-proyecto>
🟦 2️⃣ Ejecutar la API (backend-dotnet)
bash
Copiar código
cd backend-dotnet
dotnet restore
dotnet run
La API se iniciará en:

arduino
Copiar código
http://localhost:5083
✔ La base de datos SQLite se crea automáticamente al ejecutar la API.
✔ No se requiere configuración adicional.

🟧 3️⃣ Configurar el MCP Server
Ir a la carpeta:

bash
Copiar código
cd mcp-server
Copiar el archivo de variables:

bash
Copiar código
cp .env.example .env
Contenido esperado del .env:

ini
Copiar código
URL_API=http://localhost:5083
Instalar dependencias:

bash
Copiar código
npm install
Compilar:

bash
Copiar código
npm run build
Ejecutar el servidor MCP:

bash
Copiar código
npm run start
Esto lo deja esperando conexiones por STDIO, tal como exige MCP.

🤖 4️⃣ Conectar el MCP Server a Claude Desktop
Abrir Claude Desktop

Ir a Settings → MCP Servers

Click en Add New Server

En el campo “Command to run”, ingresar:

sql
Copiar código
npm start --prefix ./mcp-server
Guardar

Claude ahora podrá usar automáticamente tus tools.

🛠️ Tools disponibles (MCP)
Todos los tools están implementados con TypeScript + Zod + Axios y registrados en el servidor MCP.

✔ 1. find_list_by_name
Busca una lista por nombre y devuelve su ID.

✔ 2. create_todo_item
Crea un ítem en una lista específica.

✔ 3. update_todo_item
Actualiza la descripción de un ítem existente.

✔ 4. complete_todo_item
Marca un ítem como completado.

✔ 5. delete_todo_item
Elimina un ítem de una lista.

🧪 Ejemplos de uso en Claude Desktop
Crear un ítem:
nginx
Copiar código
Crear un ítem en la lista Trabajo con la descripción "Terminar informe".
Actualizar un ítem:
arduino
Copiar código
Actualizá el ítem 4 de la lista Trabajo con la descripción "Revisión final".
Completar un ítem:
Copiar código
Marcá como completado el ítem 6 de la lista Trabajo.
Eliminar un ítem:
Copiar código
Eliminá el ítem 7 de la lista Trabajo.
Claude traducirá automáticamente el prompt al tool correspondiente.

📁 Estructura de carpetas
pgsql
Copiar código
backend-dotnet/
  Controllers/
  Models/
  Dtos/
  TodoApi.csproj
  Program.cs

mcp-server/
  src/
    tools/
    api.ts
    register.ts
    server.ts
  dist/
  .env.example
  package.json
  tsconfig.json
🧩 Notas técnicas
API construida con ASP.NET Web API + EF Core

Base de datos: SQLite embebida

El MCP Server utiliza:

Node.js

TypeScript

modelcontextprotocol SDK

Axios

Zod

Los tools funcionan mediante comunicación STDIO, como define MCP.

🟦 Ejecución rápida (resumen)
bash
Copiar código
# Backend
cd backend-dotnet
dotnet run

# MCP Server
cd mcp-server
cp .env.example .env
npm install
npm run build
npm run start
