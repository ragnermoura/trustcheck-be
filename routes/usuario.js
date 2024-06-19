const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuariosController");
const { uploadFields } = require("../helpers/file-uploader");


router.get("/", userController.obterUsuarios);
router.get("/:id_user", userController.obterUsuarioPorId);
router.patch("/edit", userController.atualizarUsuario);
router.patch("/plano", userController.atualizarDadosUsuario);
router.patch("/status", userController.atualizarStatusUsuario);

router.delete("/delete/:id_user", userController.excluirUsuario);
router.post("/cadastro", uploadFields, userController.cadastrarUsuario);
router.post("/cadastro/simples", uploadFields, userController.cadastrarUsuarioSimples);
router.post("/documentos/:id_user", uploadFields, userController.cadastrarUsuario);





module.exports = router;