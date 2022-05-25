function loadSkeleton(){
    console.log($('#navbarPlaceholder').load('./pages/index/index.ejs'));
    console.log($('#footerPlaceholder').load('./pages/index/index.ejs'));
}
loadSkeleton();