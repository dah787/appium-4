// const WithoutBabelScreen = require('../android/android.sample');
// import BabelScreen from '../android/android.sample';

describe('iOS tests', () => {
  // WithoutBabelScreen.
  // BabelScreen.
  it.only('ios-tc-001p: Find element by predicate string', async () => {

              // Ошибка для теста
              await $('aaa').click();

    // const alertText = 'name == "Alert Views"';
    const alertText = 'value BEGINSWITH[c] "alert"';
    await $(`-ios predicate string:${alertText}`).click();

    const labelText = 'name CONTAINS "Sim"';
    await $(`-ios predicate string:${labelText}`).click();
    
    await expect(await driver.getAlertText()).toContain('A Short Title Is Best');
  })

  it('Find element by class chain', async () => {
    const alertText = '**/XCUIElementTypeStaticText[`name == "Alert Views"`]';
    await $(`-ios class chain:${alertText}`).click();

    const labelText = '**/XCUIElementTypeStaticText[`name CONTAINS "Sim"`]';
    await $(`-ios class chain:${labelText}`).click();

    await expect(await driver.getAlertText()).toContain('A Short Title Is Best');
  })

  it('Find element by xpath - 2', async () => {
    // xpath - '//tagname[@attribute=value]'
    await $(`//*[@name="Alert Views"]`).click();
    await $(`//*[@label="Simple"]`).click();
    await expect(await driver.getAlertText()).toContain('A Short Title Is Best');
  })

  it('Find element by xpath - 1', async () => {
    // xpath - '//tagname[@attribute=value]'
    await $(`//XCUIElementTypeStaticText[@name="Alert Views"]`).click();
    await $(`//XCUIElementTypeStaticText[@label="Simple"]`).click();
    await expect(await driver.getAlertText()).toContain('A Short Title Is Best');
  })

  it('Find element by tag name (class, type)', async () => {
    console.log(`\nXCUIElementTypeStaticText-0 = ${await $('XCUIElementTypeStaticText').getText()}\n`);
    console.log(`\nXCUIElementTypeStaticText-1 = ${await $$('XCUIElementTypeStaticText')[1].getText()}\n`);

    const textElements = await $$('XCUIElementTypeStaticText');
    
    for (let index = 0; index < textElements.length; index++) {
      console.log(`\nXCUIElementTypeStaticText-${index} = ${await textElements[index].getText()}\n`);
    }
  })
  
  it('Find element by accessibility id', async () => {
    await $(`~Alert Views`).click();
    await $(`~Simple`).click();
    await expect(await driver.getAlertText()).toContain('A Short Title Is Best');
  })

  it.only('Pause', async () => {
    await driver.pause(2000);
  })

})