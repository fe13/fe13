class HomeController {
  index(req, res, next) {
    res.render('home/index', { message: 'Welcome' });
  }
}

module.exports = new HomeController();
