import { Request, Response, Router} from "express"
import { Usuario, UsuarioModel } from './../model/usuario';
import { UsuarioService } from './../service/usuarioService';

export const usuarioRouter = Router();

usuarioRouter.get("/", async (req: Request, res: Response) => {
    try{
        const insereUsuario = new UsuarioModel({
            username: "Teste",
            password: "123"
        });    
        await insereUsuario.save();

        const usuarios: Usuario[] =
            await UsuarioService.listar(req.query);
        res.json(usuarios)
    }catch (e) {
        console.log(e);
        res.status(400).json({ message: "usuarioRouter: não existem usuários cadastrados" })
    }
});

usuarioRouter.get("/:id", async (req: Request, res: Response) => {
    try{
        const usuario: Usuario | null =
            await UsuarioService.consultar(req.params.id);
        res.json(usuario)
    }catch (e) {
        console.log(e);
        res.status(400).json({ message: "usuarioRouter: usuario não encontrado" })
    }
});


usuarioRouter.post("/", async (req: Request, res: Response) => {
    const usuario: Usuario | null =
        await UsuarioService.criar(req.body);
    res.json(usuario)
});

usuarioRouter.put("/:id", async (req: Request, res: Response) => {
    try{
        await UsuarioService.atualizar(req.params.id, req.body);
        const usuario: Usuario | null = 
            await UsuarioService.consultar(req.params.id);
        res.status(200).json({ message: "usuario atualizado com sucesso", usuario })
  
    }catch(e){
        console.log(e)
        res.status(400).json({ message: "usuario nao encontrado" })
    }  
});

usuarioRouter.delete("/:id", async (req: Request, res: Response) => {
    try{
      await UsuarioService.remover(req.params.id).catch(err => {
        console.log(err);
      });
      res.status(200).json()
  
    }catch(e){
        console.log(e)
        res.status(400).json({message: "nao encontrado"})
    }
});