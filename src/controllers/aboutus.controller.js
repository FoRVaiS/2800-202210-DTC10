const renderAboutUsPage = (req, res) => {
    if (!req.session.isAuthenticated) return res.redirect('/login');
  
    res.render("pages/about us/aboutus.ejs");
  };
  
  module.exports = { renderAboutUsPage };
  