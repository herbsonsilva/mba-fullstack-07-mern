import express, { Application, Request, Response, NextFunction } from "express";
import { connect } from "mongoose";
import { usuarioRouter } from "./router/usuarioRouter";
import bodyParser from "body-parser";

const app: Application = express();
let counter: any = 0;

//MiddleWare
app.use(bodyParser.json());

//MiddleWare
app.use((req: Request, res: Response, next: NextFunction) => {
    counter ++
    console.log("Middleware:", new Date(), "Requisição Nr.: " + counter);
    next();
});

app.use("/usuarios", usuarioRouter);

app.listen(9090, async () => {
    await connect("mongodb://localhost:27017/iesp");
    console.log("Servidor Rodando...")
});

export default app