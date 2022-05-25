const renderSearchPage = (req, res) => {
    if (!req.session.isAuthenticated) return res.redirect('/login');
  
    res.render("pages/search/search.ejs");
  };
  
  module.exports = { renderSearchPage };
  