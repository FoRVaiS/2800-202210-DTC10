<<<<<<< HEAD
const homeGetController = (req, res) => {
  if (!req.session.isAuthenticated) return res.redirect("/login");
=======
const renderHomePage = (req, res) => {
  if (!req.session.isAuthenticated) return res.redirect('/login');
>>>>>>> dev

  res.render("pages/index/index.ejs");
};

module.exports = { renderHomePage };
