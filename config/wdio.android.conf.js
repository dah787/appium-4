// https://stackoverflow.com/questions/38660022/curly-brackets-braces-in-node-js-require-statement
const config = require('./wdio.shared.conf');
const path   = require('path');
const SGen   = require('../test/screens/android/general.screen'); // screen > General

// Runner Configuration
// config.port = 4723; // >>> moved below to config.services

// Specify Test Files
config.specs = [
  // path.join(process.cwd(),'test/specs/android/android.sample.js')
  // path.join(process.cwd(),'test/specs/android/ts-01p.spec.js')
  path.join(process.cwd(),'test/specs/android/ts-02p.spec.js')
];

// Capabilities
config.capabilities = [{
  'platformName': 'Android',
  'appium:platformVersion': '13',
  'appium:deviceName': 'Pixel 7 api 33',
  'appium:automationName': 'UiAutomator2',
  // 'appium:app': path.join(process.cwd(), 'app/android/ApiDemos-debug.apk'),
  'appium:app': path.join(process.cwd(), 'app/android/Apexbank-1.0.78_DEVAN-188-debug.apk'),
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

config.mochaOpts = {
  ui: 'bdd',
  timeout: 240000
};

config.afterTest = async function(test, context, { error /*, result, duration, passed, retries*/}) {
  if (error) {
    await SGen.makeDir();
    // await driver.takeScreenshot();
    const testNum = test.title.slice(0, test.title.indexOf(':'));
    await driver.saveScreenshot('_screen-shots/failureScreen_' + testNum + '.png');
  }
};

videoReports();
async function videoReports() { // все отчеты, кроме Аллюр
  const video = require('wdio-video-reporter');
  config.reporters = ['spec',
    [video, { // https://www.npmjs.com/package/wdio-video-reporter
      logLevel: 'silent', // trace | debug | info | warn | error | silent
      outputDir: '_screen-video',  // Default: undefined
      saveAllVideos: false,         // false  If true, also saves videos for successful test cases
      videoSlowdownMultiplier: 3,   // 3 - Higher to get slower videos, lower for faster videos [Value 1-100]
      videoRenderTimeout: 9,        // 5 - Max seconds to wait for a video to finish rendering
      videoFormat: 'mp4',           // Default: webm
      screenshotIntervalSecs: 0.1,  // Default: undefined (minumum 0.5s)
      // videoScale: '2400:trunc(ow/a/2)*2'  // Default: '1200:trunc(ow/a/2)*2'
    }]
  ];
}

// allureRoports();
// async function allureRoports() { // все отчеты, включая Аллюр

//   const video = require('wdio-video-reporter');
//   const allure = require('allure-commandline');

//   config.reporters = ['spec',
//     ['allure', {
//       outputDir: '_allure-results', // 'allure-results'
//       disableWebdriverStepsReporting: false, //true,
//       disableWebdriverScreenshotsReporting: false //true
//     }],
//     [video, { // https://www.npmjs.com/package/wdio-video-reporter
//       logLevel: 'silent', // trace | debug | info | warn | error | silent
//       outputDir: '_video-results',  // Default: undefined
//       saveAllVideos: false,         // false  If true, also saves videos for successful test cases
//       videoSlowdownMultiplier: 3,   // 3 - Higher to get slower videos, lower for faster videos [Value 1-100]
//       videoRenderTimeout: 9,        // 5 - Max seconds to wait for a video to finish rendering
//       videoFormat: 'mp4',           // Default: webm
//       screenshotIntervalSecs: 0.1,  // Default: undefined (minumum 0.5s)
//       // videoScale: '2400:trunc(ow/a/2)*2'  // Default: '1200:trunc(ow/a/2)*2'
//       }]
//   ];

//   config.onComplete = async function(/*exitCode, config, capabilities, results*/) {
//     const reportError = new Error('Could not generate Allure report')
//     const generation = allure(['generate', '_allure-results', '--clean', '-o', '_allure-report'])
//     return new Promise((resolve, reject) => {
//       const generationTimeout = setTimeout(() => reject(reportError), 5000)
  
//       generation.on('exit', function(exitCode) {
//         clearTimeout(generationTimeout)
//         if (exitCode !== 0) {
//           return reject(reportError)
//         }
//         console.log('Allure report successfully generated')
//         resolve()
//       })
//     })
//   };


// }

exports.config = config;

// npx wdio config/wdio.android.conf.js