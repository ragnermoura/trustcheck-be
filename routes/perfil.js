const express = require("express");
const router = express.Router();
const perfilController = require("../controllers/perfilController");
const { imageUpload } = require("../helpers/file-uploader");


router.get("/", perfilController.obterPerfil);
router.get("/:id_perfil", perfilController.obterPerfilPorId);
router.patch("/edit", perfilController.atualizarPerfil);
router.delete("/delete", perfilController.excluirPerfil);
router.post("/cadastro", perfilController.cadastrarPerfil);
router.patch("/upload-rg/:id_perfil", imageUpload.single('pdf_rg'), perfilController.uploadRg);
router.patch("/upload-cnpj/:id_perfil", imageUpload.single('pdf_cnpj'), perfilController.uploadCnpj);
router.get("/getRg/:id_perfil", perfilController.getRg);
router.get("/getCnpj/:id_perfil", perfilController.getCnpj);


module.exports = router;