const config = require('./wdio.shared.conf');
const path = require('path');
require('dotenv').config();

// Browserstack Credentials
config.user = process.env.BS_USER;
config.key = process.env.BS_KEY;

// Runner Configuration
// config.port = 4723;

// Specify Test Files
config.specs = [
  // '../test-0/specs/android/android.sample.js'
  path.join(process.cwd(),'test-0/specs/android/android.sample.js')
];

// Capabilities
config.capabilities = [{
  platformName: 'Android',
  'appium:platformVersion': '14.0',
  'appium:deviceName': 'Google Pixel 8',
  'appium:automationName': 'UiAutomator2',
  'appium:app': "bs://c31361490f10e98fb42b6fa3954b5d29b2a33a2c",
  'appium:autoGrantPermissions': true
}];


// Test runner services < Test Configurations
config.services = ['browserstack'];

exports.config = config;

// npx wdio config/wdio.android.bs.conf.js