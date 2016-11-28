const fs = require('fs');
const lodash = require('lodash');

const DB_CONFIG_PATH = 'db.config.json';
const TEST_ENV_CONFIG = {
  test: {
    username: '',
    password: '',
    database: 'testdb',
    dialect: 'sqlite',
    storage: 'testdb.sqlite',
    logging: false
  }
};

const createConfigFile = function() {
  fs.writeFile(DB_CONFIG_PATH, JSON.stringify(TEST_ENV_CONFIG), function(err) {
    if (err) {
      console.error(err);
      console.log(`'${DB_CONFIG_PATH}' creation failed`);
      throw err;
    }
    console.log(`'${DB_CONFIG_PATH}' was created!\n`);
  });
}

// will create 'db.config.json' if it doesn't exist
fs.access(DB_CONFIG_PATH, fs.F_OK, function(err) {
  if (!err) {
    const currentConfig = require(`./../../${DB_CONFIG_PATH}`);
    if (!lodash.isEqual(currentConfig, TEST_ENV_CONFIG)) {
      const configBackup = `${DB_CONFIG_PATH}.${new Date().getTime()}`;
      // config file is found -> move/backup it
      fs.rename(DB_CONFIG_PATH, configBackup, function(err) {
        if (err) {
          console.error(err);
          console.log(`'Can't rename ${DB_CONFIG_PATH}'to '${configBackup}'`);
          throw err;
        }
        console.log(`'New ${DB_CONFIG_PATH}' was renamed to '${configBackup}'`);
        createConfigFile();
      });
    } else {
      console.log(`Existing config file '${DB_CONFIG_PATH}' is configured ` +
      "for running integration tests, so we will use it without changes");
    }
  } else {
    createConfigFile();
  }
});
