const renderHomePage = (req, res) => {
  if (!req.session.isAuthenticated) return res.redirect('/login');

  res.render("pages/index/index.ejs");
};

module.exports = { renderHomePage };
