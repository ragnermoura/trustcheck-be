const express = require("express");
const router = express.Router();
const userController = require("../controllers/usuariosController");
const { imageUpload } = require("../helpers/file-uploader");


router.get("/", userController.obterUsuarios);
router.get("/:id_user", userController.obterUsuarioPorId);
router.patch("/edit", userController.atualizarUsuario);
router.patch("/dados", userController.atualizarDadosUsuario);
router.delete("/delete", userController.excluirUsuario);
router.post("/cadastro", userController.cadastrarUsuario);
router.patch("/upload-user-image/:id_user", imageUpload.single('avatar') ,userController.uploadImage);
router.get("/getImage/:id_user", userController.getImage);

router.post("/enviar-boas-vindas", userController.enviarBoasVindas);
router.post("/enviar-ativacao", userController.enviarAtivacao);

module.exports = router;