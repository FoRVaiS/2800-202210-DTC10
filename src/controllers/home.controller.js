const homeController = (_, res) => {
  console.log('test');
  res.render('pages/index/index.ejs');
};

module.exports = { homeController };
