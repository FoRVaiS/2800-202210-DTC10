const homeController = (_, res) => {
  res.render('pages/index/index.ejs');
};

module.exports = { homeController };
