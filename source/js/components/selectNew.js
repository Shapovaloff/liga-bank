// import $ from 'jquery';
// import 'select2';
//
// var select = function () {
//   var NAME_RANGE = 'Срок кредита';
//   var ID_RANGE = 'term';
//   var NAME_RANGE_INITIAL = 'Первоначальный взнос';
//   var ID_INITIAL = 'contribution';
//
//   var Selector = {
//     SELECT_INPUT: '.js-select',
//     ELEMENT_SLOT: '.element__slot',
//     CONTAINER_CREDIT_SUMMER: '.js-credit-container',
//     MAIN_CALC_CONTAINER: '.js-main-calc-container',
//   };
//
//   var getStringOfNumb = function (num) {
//     var stringOfNum = num.toString();
//     return stringOfNum.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, '$1' + ' ');
//   };
//
//
//
//   var createTemplateSummary = function (summerMortrage, percent, monthPayments, requiredIncome) {
//     return '<div class="credit__box credit__box--offer grayBox">' +
//       '<div class="credit__boxContent">' +
//       '<p class="grayBox__title">Наше предложение</p>' +
//       '<div class="grayBox__grid">' +
//       '<div class="grayBox__row">' +
//       '<div class="grayBox__cell">' +
//       '<p class="grayBox__value">' +
//       getStringOfNumb(summerMortrage) + ' рублей' +
//       '</p>' +
//       '<p class="grayBox__caption">Сумма ипотеки</p>' +
//       '</div>' +
//       '<div class="grayBox__cell grayBox__cell--small">' +
//       '<p class="grayBox__value">' +
//       (percent * 100).toString() + '%' +
//       '</p>' +
//       '<p class="grayBox__caption">Процентная ставка</p>' +
//       '</div>' +
//       '</div>' +
//       '<div class="grayBox__row">' +
//       '<div class="grayBox__cell js-result-month">' +
//       '<p class="grayBox__value">' +
//       getStringOfNumb(monthPayments) + ' рублей' +
//       '</p>' +
//       '<p class="grayBox__caption">Ежемесячный платеж</p>' +
//       '</div>' +
//       '<div class="grayBox__cell grayBox__cell--small">' +
//       '<p class="grayBox__value">' +
//       getStringOfNumb(requiredIncome) + ' рублей' +
//       '</p>' +
//       '<p class="grayBox__caption">Необходимый доход</p>' +
//       '</div>' +
//       '</div>' +
//       '</div>' +
//       '<button class="grayBox__btn btn btn--w100 js-result-calculation" type="button">Оформить заявку</button>' +
//       '</div>' +
//       '</div>';
//   };
//
//   var createTemplateCalc = function (nameCalc, valueCalc, minCalc, maxCalc) {
//     return '<div class="formArea js-calculate">' +
//       '<label class="formArea__label" for="price">' + nameCalc + '</label>' +
//       '<div class="formArea__slot">' +
//       '<div class="calculate">' +
//       '<button class="calculate__btn" type="button" aria-label="уменьшить" data-target="min"></button>' +
//       '<div class="calculate__area">' +
//       '<input class="calculate__input" id="price" data-current-value="' + valueCalc + '" type="text" value="' + getStringOfNumb(valueCalc) + ' рублей">' +
//       '</div>' +
//       '<button class="calculate__btn calculate__btn--plus" type="button" data-target="plus" aria-label="увеличить"></button>' +
//       '</div>' +
//       '</div>' +
//       '<div class="formArea__caption">' +
//       '<p>От <span>' + getStringOfNumb(minCalc) + '</span> до <span>' + getStringOfNumb(maxCalc) + '</span> рублей</p>' +
//       '</div>' +
//       '</div>';
//   };
//
//   var createTemplateRangeCalc = function (valueRange, minRange, maxRange, prefixRange, id, name) {
//     var stringMin = prefixRange ? '<p class="range__captionLeft">' + minRange + ' ' + prefixRange + '</p>' : '<p class="range__captionLeft">' + minRange + '%</p>';
//     var stringMax = maxRange ? '<p class="range__captionRight">' + maxRange + ' ' + prefixRange + '</p>' : '';
//     var stringInput = prefixRange ? '<input class="calculate__input" id="' + id + '" data-current-value="' + valueRange + '" type="text" value="' + getStringOfNumb(valueRange) + ' ' + prefixRange + '">' : '<input class="calculate__input" id="' + id + '" data-current-value="' + valueRange + '" type="text" value="' + getStringOfNumb(valueRange) + ' рублей">';
//     return '<div class="formArea js-range-calculate">' +
//       '<label class="formArea__label" for="' + id + '">' + name + '</label>' +
//       '<div class="formArea__slot">' +
//       '<div class="calculate">' +
//       '<div class="calculate__area">' +
//       stringInput +
//        '</div>' +
//       '</div>' +
//       '</div>' +
//       '<div class="formArea__caption">' +
//       '<div class="range">' +
//       '<div class="range__bar">' +
//       '<button class="range__btn" type="button" aria-label="ползунок"></button>' +
//       '</div>' +
//       '<div class="range__caption">' +
//       stringMin + stringMax +
//       '</div>' +
//       '</div>' +
//       '</div>' +
//       '</div>';
//   };
//
//   var createTemplateOption = function (valueOption, nameOption) {
//     return '<label class="option js-option-mortgage">' +
//       '<input class="option__input" type="checkbox" value="' + valueOption + '" checked>' +
//       '<span class="option__element"></span>' +
//       '<span class="option__label">' + nameOption + '</span>' +
//       '</label>';
//   };
//
//   var createTemplateOptionGroup = function (optionGroup) {
//     var optionGroupHtml = '';
//     for (var i = 0; i < optionGroup.length; i++) {
//       optionGroupHtml += createTemplateOption(optionGroup[i].valueOption, optionGroup[i].nameOption);
//     }
//
//     return '<div class="credit__option">' +
//     optionGroupHtml +
//     '</div>';
//   };
//
//   var createTemplateGroupCalc = function (mainCalc, rangeCalcInitial, rangeCalc) {
//     var htmlCalc = createTemplateCalc(mainCalc.nameCalc, mainCalc.valueCalc, mainCalc.minCalc, mainCalc.maxCalc);
//     var htmlRangeInitial = '';
//     if (rangeCalcInitial) {
//       htmlRangeInitial = '<li class="element__listItem">' + createTemplateRangeCalc(rangeCalcInitial.valueRange, rangeCalcInitial.minRange, rangeCalcInitial.maxRange, rangeCalcInitial.prefixRange, rangeCalcInitial.id, rangeCalcInitial.name) + '</li>';
//     }
//
//     var htmlRangeCalc = '<li class="element__listItem">' + createTemplateRangeCalc(rangeCalc.valueRange, rangeCalc.minRange, rangeCalc.maxRange, rangeCalc.prefixRange, rangeCalc.id, rangeCalc.name) + '</li>';
//
//     return '<div class="credit__element credit__element--calc">' +
//       '<div class="element">' +
//       '<p class="element__label">Шаг 2. Введите параметры кредита</p>' +
//       '<div class="element__slot">' +
//       '<ul class="element__list">' +
//       '<li class="element__listItem">' +
//       htmlCalc +
//       '</li>' +
//       htmlRangeInitial + htmlRangeCalc +
//       '</ul>' +
//       '</div>' +
//       '</div>' +
//       '</div>';
//   };
//
//   class MortgageClass {
//     constructor(obj) {
//       this.value = parseInt(obj.startValue, 10);
//       this.min = parseInt(obj.min, 10);
//       this.max = parseInt(obj.max, 10);
//       this.step = parseInt(obj.step, 10);
//       this.percent = parseInt(obj.startPercent, 10);
//       this.rateMin = parseFloat(obj.rateMin);
//       this.rateMax = parseFloat(obj.rateMax);
//       this.rateThreshold = parseInt(obj.rateThreshold, 10);
//       this.valueError = parseInt(obj.valueError, 10);
//       this.minTerm = parseInt(obj.minTerm, 10);
//       this.maxTerm = parseInt(obj.maxTerm, 10);
//       this.stepTerm = parseInt(obj.stepTerm, 10);
//       this.optionValue = parseInt(obj.optionValue, 10);
//       this.optionStatus = obj.optionStatus;
//       this.optionName = obj.optionName;
//       this.calcName = obj.calcName;
//       this.resultName = obj.resultName;
//       this.infoName = obj.infoName;
//       this.totalName = obj.totalName;
//       this.totalSummerName = obj.totalSummerName;
//       this.prefixTerm = obj.prefixTerm;
//     }
//
//     setSumBonus() {
//       this.sumBonus = (this.optionStatus === 'true') ? this.optionValue : 0;
//     }
//
//     setCountMonth(value) {
//       var term = Math.min(Math.max(value, this.minTerm), this.maxTerm);
//       this.term = term * 12;
//     }
//
//     setTemplate(value) {
//       this.minTemplate = value * (this.percent / 100);
//       this.maxTemplate = value - this.sumBonus - this.valueError;
//       this.sumMortrage = this.value - this.minTemplate - this.sumBonus;
//     }
//
//     setRate() {
//       this.rate = (this.percent < this.rateThreshold) ? this.rateMax / 100 : this.rateMin / 100;
//       this.interestRate = this.rate / 12;
//     }
//
//     setMonthPayment() {
//       this.monthPayment = Math.round(this.sumMortrage * (this.interestRate + (this.interestRate / (Math.pow(this.interestRate + 1, this.term) - 1))));
//     }
//
//     setRequiredIncome() {
//       this.requiredIncome = Math.round(this.monthPayment * 100 / 45);
//     }
//
//     getTemplateSummer() {
//       return createTemplateSummary(this.sumMortrage, this.rate, this.monthPayment, this.requiredIncome);
//     }
//
//     getTemplateGroupCalc(parametersMainCalc, parametersRangeCalInitial, parametersRangeCalc) {
//       return createTemplateGroupCalc(parametersMainCalc, parametersRangeCalInitial, parametersRangeCalc);
//     }
//
//
//     getTemplateOptionGroup(parametersOptionGroup) {
//
//       return createTemplateOptionGroup(parametersOptionGroup);
//     }
//
//     getSummer() {
//       if (!this.summer) {
//         this.summer = createElement(this.getTemplateSummer());
//       }
//
//       return this.summer;
//     }
//
//     getCalcGroup() {
//       if (!this.calkGroup) {
//         var parametersMainCalc = {
//           nameCalc: this.calcName,
//           valueCalc: this.value,
//           minCalc: this.min,
//           maxCalc: this.max,
//         };
//
//         var parametersRangeCalc = {
//           valueRange: this.term / 12,
//           minRange: this.minTerm,
//           maxRange: this.maxTerm,
//           prefixRange: 'лет',
//           name: NAME_RANGE,
//           id: ID_RANGE
//         };
//
//         var parametersRangeCalInitial = {
//           valueRange: this.minTemplate,
//           minRange: this.percent,
//           maxRange: false,
//           prefixRange: false,
//           name: NAME_RANGE_INITIAL,
//           id: ID_INITIAL,
//         };
//
//         this.calkGroup = createElement(this.getTemplateGroupCalc(parametersMainCalc, parametersRangeCalInitial, parametersRangeCalc));
//       }
//
//       return this.calkGroup;
//     }
//
//     getOptionGroup() {
//       if (!this.optionGroup) {
//         var parametersOptionGroup = [
//           {
//             valueOption: this.optionValue,
//             nameOption: this.optionName,
//           },
//         ];
//         this.optionGroup = createElement(this. getTemplateOptionGroup(parametersOptionGroup));
//       }
//
//       return this.optionGroup;
//     }
//
//     removeElement(name) {
//       this[name] = null;
//     }
//
//     refreshParams() {
//       this.setSumBonus();
//       this.setTemplate(this.value);
//       this.setCountMonth(this.minTerm);
//       this.setRate();
//       this.setMonthPayment();
//       this.setRequiredIncome();
//     }
//
//     start() {
//       this.refreshParams();
//       creditSummerContainer.insertAdjacentElement('beforeend', this.getSummer());
//       mainCalcContainer.insertAdjacentElement('beforeend', this.getCalcGroup());
//       mainCalcContainer.insertAdjacentElement('beforeend', this.getOptionGroup());
//     }
//
//     refreshSummer() {
//       creditSummerContainer.removeChild(this.summer);
//       this.removeElement('summer');
//       creditSummerContainer.insertAdjacentElement('beforeend', this.getSummer());
//     }
//
//     destroy() {
//       mainCalcContainer.removeChild(this.optionGroup);
//       mainCalcContainer.removeChild(this.calkGroup);
//       creditSummerContainer.removeChild(this.summer);
//       this.removeElement('optionGroup');
//       this.removeElement('calkGroup');
//       this.removeElement('summer');
//     }
//   }
//
//   var selectInput = document.querySelector(Selector.SELECT_INPUT);
//
//   if (!window.credit) {
//     return false;
//   }
//
//   var selectSlot = selectInput.closest(Selector.ELEMENT_SLOT);
//   var creditSummerContainer = document.querySelector(Selector.CONTAINER_CREDIT_SUMMER);
//   var mainCalcContainer = document.querySelector(Selector.MAIN_CALC_CONTAINER);
//   var obj = {};
//   var old = false;
//
//   $(selectInput).select2({
//     minimumResultsForSearch: Infinity,
//     width: 'off',
//     theme: 'bank',
//     dropdownParent: $(selectSlot),
//     placeholder: selectInput.getAttribute('name'),
//   });
//
//   $(selectInput).on('select2:select', function () {
//     var checkedOption = document.querySelector('option[value=' + selectInput.value + ']');
//     var calcParameters = checkedOption.dataset;
//
//     old = selectInput.value;
//
//     obj[
//
//       ];
//
//     // if (startClass) {
//     //   if (startClass === 'mortgage') {
//     //     mortgageCalc.destroy();
//     //   }
//     //
//     //   if (startClass === 'car') {
//     //     carCalc.destroy();
//     //   }
//     // }
//     //
//     // if (selectInput.value === 'mortgage') {
//     //   console.log('потреб');
//     //   var mortgageCalc = new MortgageClass(calcParameters);
//     //   mortgageCalc.start();
//     // }
//     //
//     // if (selectInput.value === 'car') {
//     //   console.log('авто');
//     //   var carCalc = new MortgageClass(calcParameters);
//     //   carCalc.start();
//     // }
//     //
//     // startClass = selectInput.value;
//
//   });
//
//   return selectInput;
// };
//
// export default select;
