const db = require('../models');

module.exports = {
  findAll: (req, res) => {
    db.findAll({}).then((result) => {
      res.json(result);
    });
  },
  findOne: (req, res) => {
    res.json({
      msg: `Find One: ${req.params.id}`,
    });
  },
  create: (req, res) => {
    res.json({
      msg: 'Create One',
    });
  },
  update: (req, res) => {
    res.json({
      msg: 'Update One: ${req.params.id}',
    });
  },
  delete: (req, res) => {
    res.json({
      msg: `Delete One: ${req.params.id}`,
    });
  },
};
