const config = require('./wdio.shared.conf');
const path = require('path');
const allure = require('allure-commandline');

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
  logPath: './_logs/'
}]];

config.reporters = ['spec',
  ['allure', {
    outputDir: '_allure-results', // 'allure-results'
    disableWebdriverStepsReporting: false, //true,
    disableWebdriverScreenshotsReporting: false //true
  }],
  // [video, {
  //   saveAllVideos: false,       // If true, also saves videos for successful test cases
  //   videoSlowdownMultiplier: 3, // Higher to get slower videos, lower for faster videos [Value 1-100]
  // }]
];

config.mochaOpts = {
  ui: 'bdd',
  timeout: 240000
};

config.afterTest = async function(test, context, { error /*, result, duration, passed, retries*/}) {
  if (error) {
    // await driver.takeScreenshot();
    const testNum = test.title.slice(0, test.title.indexOf(':'));
    await driver.saveScreenshot('.view-shots/screenFailure_' + testNum + '.png');
  }
};

config.onComplete = function(/*exitCode, config, capabilities, results*/) {
  const reportError = new Error('Could not generate Allure report')
  const generation = allure(['generate', '_allure-results', '--clean', '-o', '_allure-report'])
  return new Promise((resolve, reject) => {
    const generationTimeout = setTimeout(() => reject(reportError), 5000)

    generation.on('exit', function(exitCode) {
      clearTimeout(generationTimeout)
      if (exitCode !== 0) {
        return reject(reportError)
      }
      console.log('Allure report successfully generated')
      resolve()
    })
  })
};

exports.config = config;

// npx wdio config/wdio.android.conf.js