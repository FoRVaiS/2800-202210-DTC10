const homeGetController = (_, res) => {
  res.render('pages/index/index.ejs');
};

module.exports = { homeGetController };
