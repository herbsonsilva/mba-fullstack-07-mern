import {model, Schema, Document} from "mongoose";

const usuarioSchema = new Schema({
    username: {type: String},
    password: {type: String}
});

export interface Usuario extends Document {
    username: string;
    password: string;
}

export const UsuarioModel = model<Usuario>(
    "usuarios",
    usuarioSchema
);