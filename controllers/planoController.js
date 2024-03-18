const express = require("express");
const Plano = require("../models/tb_plano");
const ItemPlano = require("../models/tb_plano_item");


const criarPlano = async (req, res) => {
  try {
    const { titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, dias_free, tag, ofertas } = req.body;
    const plano = await Plano.create({ titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, dias_free, tag });

   
    if (ofertas && ofertas.length > 0) {
      const itensPlano = ofertas.map(oferta => {
        return {
          item: oferta,
          id_plano: plano.id_plano 
        };
      });

      await ItemPlano.bulkCreate(itensPlano);
    }

    res.status(201).send(plano);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const buscarTodosPlanos = async (req, res) => {
  try {
    const planos = await Plano.findAll({
      include: [{
        model: ItemPlano, 
        as: 'itensPlano',
      }]
    });
    res.send(planos);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const buscarTodosItens = async (req, res) => {
  try {
    const items = await ItemPlano.findAll();
    res.send(items);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const buscarPlanoPorId = async (req, res) => {
  try {
      const id_plano = req.params.id_plano;
      const planos = await Plano.findByPk(id_plano, {
          include: [{
              model: ItemPlano,
              as: 'ItensPlano',
          }]
      });
      res.send(planos);
  } catch (error) {
      res.status(500).send({ error: error.message });
  }
};
const atualizarPlano = async (req, res) => {
  try {
    const id_plano = req.paraid_plano;
    const { titulo_plano, subtitulo_plano, valor_plano_consulta, valor_plano_mes, dias_free, tag } = req.body;

    const plano = await Plano.findByPk(id_plano);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }

    plano.titulo_plano = titulo_plano;
    plano.subtitulo_plano = subtitulo_plano;
    plano.valor_plano_consulta = valor_plano_consulta;
    plano.valor_plano_mes = valor_plano_mes;
    plano.dias_free = dias_free;
    plano.tag = tag;

    await plano.save();

    res.send({ mensagem: "Plano atualizado com sucesso!", plano });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
const deletarPlano = async (req, res) => {
  try {
    const id_plano = req.params.id_plano;
  
    await ItemPlano.destroy({
      where: {
        id_plano: id_plano
      }
    });

    const plano = await Plano.findByPk(id_plano);
    if (!plano) {
      return res.status(404).send({ mensagem: "Plano não encontrado." });
    }

    await plano.destroy();
    res.send({ mensagem: "Plano e itens relacionados deletados com sucesso!" });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  criarPlano,
  buscarTodosPlanos,
  buscarPlanoPorId,
  atualizarPlano,
  deletarPlano,
  buscarTodosItens
};
