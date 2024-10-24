const adminService = require("../services/adminService");
const Admin = require("../models/admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const adminController = {
  login: async (req, res) => {
    try {
      const { email, senha } = req.body;
      const admin = await Admin.findOne({ where: { email } });
      if (!admin) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const isValid = await bcrypt.compare(senha, admin.senha);
      if (!isValid) {
        return res.status(400).json({
          msg: "Email ou senha incorretos",
        });
      }

      const token = jwt.sign(
        {
          email: admin.email,
          nome: admin.nome,
        },
        process.env.SECRET,
        { expiresIn: "1hr" }
      );

      return res.status(200).json({
        msg: "Login realizado!",
        token,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        msg: "Acione o Suporte",
      });
    }
  },
  create: async (req, res) => {
    try {
      const { nome, senha, email } = req.body;

      const hashSenha = await bcrypt.hash(senha, 10);

      const adminCriado = await Admin.create({ nome, senha: hashSenha, email });

      return res.status(200).json({
        msg: "Admin criado com sucesso!",
        adm: adminCriado,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const { nome, senha, email } = req.body;

    console.log({ id });
    console.log({ nome, senha, email });

    try {
      const adminUpadte = await Admin.findByPk(id);
      if (adminUpadte == null) {
        return res.status(404).json({
          msg: "Admin não encontrado",
        });
      }

      const upadate = await adminUpadte.update({
        nome,
        senha,
        email,
      });

      if (upadate) {
        return res.status(200).json({
          msg: "Admin atualizado com sucesso",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  updateSenha: async (req, res) => {
    const { id } = req.params;
    const { senha } = req.body;

    console.log({ id });
    console.log({ senha });

    try {
      const senhaUpadte = await Admin.findByPk(id);
      if (senhaUpadte == null) {
        return res.status(404).json({
          msg: "Admin não encontrado",
        });
      }

      const hashSenha = await bcrypt.hash(senha, 10);

      const upadate = await senhaUpadte.update({
        senha: hashSenha,
      });

      if (upadate) {
        return res.status(200).json({
          msg: "Senha atualizada com sucesso",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Acione o suporte" });
    }
  },
  getAll: async (req, res) => {
    try {
      const admins = await adminService.getAll();
      return res.status(200).json({
        msg: "Todos os Admins: ",
        admins,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
  getOne: async (req, res) => {
    try {
      const admin = await adminService.getById(req.params.id);
      if (!admin) {
        return res.status(400).json({
          msg: "Admin não encontrado                                                                      ",
        });
      }
      return res.status(200).json({
        msg: "Admin encontrado",
        admin,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
  delete: async (req, res) => {
    try {
      const adminDeletedo = await adminService.delete(req.params.id);
      if (!adminDeletedo) {
        return res.status(400).json({
          msg: "Admin não encontrado",
        });
      }
      return res.status(200).json({
        msg: "Admin deletado com sucesso!",
      });
    } catch (error) {
      return res.status(500).json({
        msg: "Ocorreu um erro no servidor",
      });
    }
  },
};

module.exports = adminController;
