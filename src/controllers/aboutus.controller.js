const renderAboutUsPage = (req, res) => {
    if (!req.session.isAuthenticated) return res.redirect('/login');
  
    res.render("pages/error/error.ejs");
  };
  
  module.exports = { renderAboutUsPage };
  