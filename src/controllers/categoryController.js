const Category = require('../models/Category');
const { Op } = require('sequelize');

module.exports = {
    async listar(req, res) {
        try {
            let{ limit = 12, page = 1, fields, use_in_menu} = req.query;

            limit = parseInt (limit);
            page = parseInt (page);

            const where = {};
            if (use_in_menu !== undefined) {
                where.use_in_menu = use_in_menu === 'true';
            }

            const options = {
                where,
                offset: limit === -1 ? undefined: (page - 1)*limit,
                limit: limit === -1 ? undefined : limit
            };

            if (fields) {
                options.attributes = fields.split(',');
            }

            const { rows, count } = await Category.findAndCountAll(options);

            res.status(200).json({
                data: rows,
                total: count,
                limit,
                page
            });
        } catch(error) {
            res.status(400).json({
                erro: 'Erro ao buscar categorias',
                detalhes: error.message
            });
        }
    },


    async buscarPorId(req, res) {
        try {
            const {id} = req.params;
            const categoria = await Category.findByPk(id);

            if (!categoria) {
                return res.status(404).json({erro: 'Categoria não encontrada' });
            }

            res.status(200).json(categoria);
        } catch (error) {
            res.status(400).json ({erro: 'Erro ao buscar categoria', detalhes: error.message});
        }
    },

    async criar(req, res) {
        try {
            const { name, slug, use_in_menu} = req.body;

            if (!name || !slug) {
                return res.status(400).json ({erro: 'Nome e slug são obrigatórios' });
            }

            const novaCategoria = await Category.create ({ name, slug, use_in_menu});
            res.status(201).json(novaCategoria);
        } catch (error) {
            res.status(400).json ({erro: 'Erro ao criar categoria', detalhes: error.message });
        }
    },

    async atualizar(req, res) {
        try {
            const {id} = req.params;
            const { name, slug, use_in_menu} = req.body;

            const categoria = await Category.findByPk(id);
            if (!categoria) {
                return res.status(404).json ({erro: 'Categoria não encontrada' });
            }

            categoria.name = name ?? categoria.name;
            categoria.slug = slug ?? categoria.slug;
            categoria.use_in_menu = use_in_menu ?? categoria.use_in_menu;

            await categoria.save();
            res.status(204).send();
        } catch (error) {
            res.status(400).json ({erro: 'Erro ao atualizar categoria', detalhes: error.message });
        }
    },

    async deletar(req, res) {
        try {
            const {id} = req.params;

            const categoria = await Category.findByPk(id);
            if(!categoria) {
                return res.status(404).json ({erro: 'Categoria não encontrada' });
            }

            await categoria.destroy();
            res.status(204).send();
        } catch (error) {
            res.status(400).json ({erro: 'Erro ao deletar categoria', detalhes: error.message});
        }
    }
};