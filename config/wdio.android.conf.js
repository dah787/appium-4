const config = require('./wdio.shared.conf');
const path = require('path');

// Runner Configuration
// config.port = 4723; // >>> moved below to config.services

// Specify Test Files
config.specs = [
  path.join(process.cwd(),'test/specs/android/android.sample.js')
  // path.join(process.cwd(),'test/specs/android/ab-ts-01p.spec.js')
  // path.join(process.cwd(),'test/specs/android/ab-ts-02p.spec.js')
];

// Capabilities
config.capabilities = [{
  'appium:platformName': 'Android',
  'appium:platformVersion': '13',
  'appium:deviceName': 'Pixel 7 api 33',
  'appium:automationName': 'UiAutomator2',
  // 'appium:app': path.join(process.cwd(), 'app/android/ApiDemos-debug.apk'),
  'appium:app': path.join(process.cwd(), 'app/android/Apexbank-1.0.74-debug.apk'),
  'appium:autoGrantPermissions': true
}],

// Test runner services < Test Configurations
// config.services = ['appium']; // >>> moved below to config.services
config.services = [['appium', {
  args: {
    address: 'localhost',
    port: 4723,
  },
  logPath: './'
}]];

config.mochaOpts = {
  ui: 'bdd',
  timeout: 240000 //60000
};

exports.config = config;

// npx wdio config/wdio.android.conf.js