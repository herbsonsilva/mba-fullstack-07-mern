import supertest from "supertest";
import mockingoose from "mockingoose";
import { UsuarioModel } from './../model/usuario';
import app from "../server";

test("[GET]/usuarios", async () => {
    const mockusuarios = [{
        _id: "aaaaaaaaaaaaaaaaaaaaaaaa",
        username: "12312",
        password: "123123123"
    }];
    mockingoose(UsuarioModel)
        .toReturn(mockusuarios, "find");
    const response = await supertest(app).get("/usuarios");
    expect(response.text).toBe(JSON.stringify(mockusuarios))
});