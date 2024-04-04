const Denuncia = require('../models/tb_denuncia');


exports.createDenuncia = async (req, res) => {
  try {
    const denuncia = await Denuncia.create(req.body);
    res.status(201).json(denuncia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDenuncias = async (req, res) => {
  try {
    const denuncias = await Denuncia.findAll();
    res.json(denuncias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDenunciaById = async (req, res) => {
  const id_denuncia = req.params.id_denuncia;
  try {
    const denuncia = await Denuncia.findByPk(id_denuncia);
    if (!denuncia) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    res.json(denuncia);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDenuncia = async (req, res) => {
  const id_denuncia = req.params.id_denuncia;
  try {
    const [updatedRows] = await Denuncia.update(req.body, {
      where: { id_denuncia },
    });
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    res.json({ message: 'Denúncia atualizada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDenuncia = async (req, res) => {
  const id_denuncia = req.params.id_denuncia;
  try {
    const deletedRows = await Denuncia.destroy({ where: { id_denuncia } });
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Denúncia não encontrada' });
    }
    res.json({ message: 'Denúncia excluída com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
