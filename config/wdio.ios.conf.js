const config = require('./wdio.shared.conf');
const path = require('path');

// Runner Configuration
// config.port = 4723; // >>> moved below to config.services

// Specify Test Files
config.specs = [
  // '../test-0/specs/ios/ios.sample.js'
  path.join(process.cwd(),'test-0/specs/ios/ios.sample.js')
];

// Capabilities
config.capabilities = [{
  'appium:platformName': 'iOS',
  'appium:platformVersion': '17.2',
  'appium:deviceName': 'iPhone 15',
  'appium:automationName': 'XCUITest',
  'appium:app': path.join(process.cwd(), 'app/ios/UIKitCatalog.app')
}];

// Test runner services < Test Configurations
// config.services = ['appium']; // >>> moved below to config.services
config.services = [['appium', {
  args: {
    address: 'localhost',
    port: 4723,
  },
  logPath: './logs/'
}]];

config.mochaOpts = {
  ui: 'bdd',
  timeout: 240000 //60000
};

exports.config = config;

// npx wdio config/wdio.ios.conf.js