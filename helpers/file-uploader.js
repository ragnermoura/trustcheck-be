const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "avatar";

    if (req.baseUrl.includes('logo')) {
      folder = "logo";
    } else if (req.baseUrl.includes('user')) {
      folder = "avatar";
    }else if (req.baseUrl.includes('perfil')) {
      folder = "documentos";
    }
    

    cb(null, `public/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|pdf|jpeg|pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png, jpg ou Pdf!"));
    }
    cb(undefined, true);
  },
});

module.exports = { imageUpload };