const express = require('express');
const Ticket = require('../models/tb_ticket');
const Usuario = require('../models/tb_usuarios');

const obterTickets = async (req, res) => {
  try {
    const tickets = await Ticket.findAll({
      include: [{ model: Usuario }]
    });
    return res.status(200).send(tickets);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const obterTicketPorId = async (req, res) => {
  try {
    const ticket = await Ticket.findByPk(req.params.id_ticket, {
      include: [{ model: Usuario }]
    });
    if (ticket) {
      return res.status(200).send(ticket);
    } else {
      return res.status(404).send({ message: 'Ticket não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const criarTicket = async (req, res) => {
  try {
    const novoTicket = await Ticket.create(req.body);
    return res.status(201).send(novoTicket);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const atualizarTicket = async (req, res) => {
  try {
    const atualizado = await Ticket.update(req.body, {
      where: { id_ticket: req.params.id_ticket }
    });
    if (atualizado[0]) {
      return res.status(200).send({ message: 'Ticket atualizado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Ticket não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deletarTicket = async (req, res) => {
  try {
    const deletado = await Ticket.destroy({
      where: { id_ticket: req.params.id_ticket }
    });
    if (deletado) {
      return res.status(200).send({ message: 'Ticket deletado com sucesso' });
    } else {
      return res.status(404).send({ message: 'Ticket não encontrado' });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = {
  obterTickets,
  obterTicketPorId,
  criarTicket,
  atualizarTicket,
  deletarTicket
};
