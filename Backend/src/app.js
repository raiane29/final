import express from "express";
import cors from "cors";
import conn from "./config/conn.js"
import path from 'path';
import { fileURLToPath } from 'url';


const __dirname = path.dirname(fileURLToPath(import.meta.url));

import Evento from "./models/eventoModel.js";
import Feedback from "./models/feedbackModel.js";
import Usuario from "./models/usuarioModel.js";
import Inscricao from "./models/inscricaoModel.js";

import eventoRouter from "./routes/eventoRouter.js";
import feedbackRouter from "./routes/feedbackRouter.js";
import usuarioRouter from "./routes/usuarioRouter.js";


const app = express();
const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

//3 middleswares para a api funcionar corretamente.
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Necessário para sincronizar os arquivos models no projeto
conn.sync(/*{ force: true }*/).then(() => {
    console.log('Conectado!')
}).catch((error) => console.error(error));

app.use("/eventos", eventoRouter)
app.use("/eventos/contato", feedbackRouter)
app.use("/eventos/usuarios", usuarioRouter)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((request, response) => {
    response.status(404).json({ message: "Rota não encontrada." });
});

export default app;