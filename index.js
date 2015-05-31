var fs = require('fs');
var _ = require('underscore');
var ini = require('ini');

var section = function(obj) {
  return {
    value: function(property) {
      return ini_get_string_value(obj, property);
    }
  };
};

var ini_get_string_value = function(config, property) {
  var result = null;
  _.each(_.keys(config), function(key) {
    if (key.toLowerCase().trim() == property.toLowerCase().trim()) {
      result = config[key];
    }
  });
  return result;
};

exports.open = function(options) {
  if (_.isString(options)) {
    options = {
      file: options,
      encoding: 'utf-8'
    };
  } else {
    options = _.defaults(options || {}, {
      file: 'my.ini',
      encoding: 'utf-8'
    });
  }

  var ini_object = ini.parse(fs.readFileSync(options.file, options.encoding));

  return {
    get: function(property) {
      return new section(ini_get_string_value(ini_object, property));
    }
  };
};