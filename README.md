# ini-reader
Reads from an INI file

```
var ini = require('ini-reader');
var config = ini.open('C:/myfile.ini');
var section = config.section('MY_SECTION');
console.log(section.get('my_value'));
```

```
[MY_SECTION]
my_value=foo
```