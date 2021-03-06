var Body = exports.Body = require("./lib/body");
var Errors = exports.Errors = require("./lib/error");
var Session = exports.Session = require("./lib/session");
var Validate = exports.Validate = require("./lib/validate");

var Path = require("path");
var Static = exports.static = require("serve-static");
exports.favicon = require("serve-favicon");
exports.__dirname = __dirname;

exports.util = function(app) {
  // Expose helper modules in templates
  app.locals.Path = require("path");
  app.locals.URL = require("url");
  app.locals.Util = require("util");

  // Give the template engine the request object
  app.use(function(req, res, next) {
    res.locals.req = req;
    next();
  });

  // Static Assets
  app.use("/delight-assets", Static(Path.resolve(__dirname, "assets")));
};

exports.errors = function(app, options) {
  app.use(Errors.notFound);
  app.use(Errors(options));
};

exports.body = function(app, options) {
  app.use(Body.reader(options));
  app.use(Body.json(options));
  app.use(Body.urlencoded(options));
};

exports.session = function(app, options) {
  app.use(Session.express(options));
};

exports.validate = function(app, options) {
  app.use(Validate.body(options));
  app.use(Validate.query(options));
  app.use(Validate.params(options));
};
