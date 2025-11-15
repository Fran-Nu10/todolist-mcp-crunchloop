import axios from "axios";

// uRL de la API C# que el MCP va a consumir
const API_URL = process.env.URL_API ?? "http://localhost:5083";

//cliente Axios que habla con la API
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json"
    }
});
