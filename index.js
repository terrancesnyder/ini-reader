var reader = exports;

var fs = require('fs');
var _ = require('underscore');
var ini = require('ini');

reader.open = function(options) {
  options = _.defaults(options || {}, {
    file: 'C:/strsystm/data/STORE.ini',
    encoding: 'utf-8'
  })

  // parse store ini file for configuration
  // of this system (and also grab common configuration)
  // TODO store ini should try environment variable first
  var ini_object = ini.parse(fs.readFileSync(options.file, options.encoding));

  return {
    get: function(property) {
      return new section(getIniValueIgnoringCase(ini_object, property));
    }
  };
};

var section = function(obj) {
  return {
    value: function(property) {
      return getIniValueIgnoringCase(obj, property);
    }
  };
};

var getIniValueIgnoringCase = function(config, property) {
  var result = null;
  _.each(_.keys(config), function(key) {
    if (key.toLowerCase().trim() == property.toLowerCase().trim()) {
      result = config[key];
    }
  });
  return result;
};