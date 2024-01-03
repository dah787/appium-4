class TransferBetweenCardsScreen {

/* CONSTANTS */
titleScreen_TransferBetweenCards_Ru_Expected = 'Между своими счетами';



/* SELECTORS */
// экран Между своими счетами
get titleScreen_TransferBetweenCards_Ru(){
  return $('//android.widget.TextView[@text="Между своими счетами"]');}

// get buttons_CardsSelect(){
//   return $('//*[@resource-id="com.fincube.apexbank.debug:id/select_bank_card_layout"]').$$('android.view.ViewGroup');}

get button_OpenCardsList_From(){// поле Откуда (далее - окно Выберите карту (отправителя))
  // return $('//*[@resource-id="com.fincube.apexbank.debug:id/fromField_transferOwnCard"]');}
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/fromField_transferOwnCard"]').$('//*[@resource-id="com.fincube.apexbank.debug:id/select_bank_card_layout"]');}
get button_OpenCardsList_To(){// поле Куда (далее - окно Выберите карту (получателя))
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/toField_transferOwnCard"]');}

get text_CardNumber(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/selection_card_number"]');}
get text_CardBalance(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/selection_card_balance"]');}

get text_FromCardNumber(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/fromField_transferOwnCard"]').$('//*[@resource-id="com.fincube.apexbank.debug:id/selection_card_number"]');}

// get cardsList(){
//   return $('//*[@resource-id="com.fincube.apexbank.debug:id/layout"]').$$('android.widget.TextView');}

get input_TransferAmount(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/input"]');}
get text_TransferCommission(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/tv_help"]');}
get text_TransferTotalAmount(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/tvTotal_transferCard"]');}

get button_Continue(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/buttonContinue_transferOwnCard"]');}

// экран Перевод на карту > окно Платеж обрабатывается
get titleScreen_TransferProcessing(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/tvProcessing"]');}
get button_BackToHome(){// далее - экран Главный
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/btnBackToHome"]');}

// экран Перевод > экран (б/и) чека перевода на карту
get text_Amount(){
  return $('//*[@resource-id="com.fincube.apexbank.debug:id/tv_amount"]');}



/* EOF class */
}

module.exports = new TransferBetweenCardsScreen();