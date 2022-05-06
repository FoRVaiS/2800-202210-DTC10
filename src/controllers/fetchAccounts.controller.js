const data = require('../__database__');

const fetchAccountsPostController = (_, res) => {
  res.status(200).json({
    success: true,
    users: data?.users ?? {},
  });
};

module.exports = { fetchAccountsPostController };
