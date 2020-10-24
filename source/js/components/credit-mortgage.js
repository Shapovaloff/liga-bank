import CalcSummer from './calc-summer';
import CalcPayment from './calc-payment';
import CalcTerm from './calc-term';

var Selector = {
  MORTGAGE_CONTAINER: '.credit__slide--mortgage',
};

class CreditMortgage {
  constructor() {
    this.blocks = {
      calcSummer: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + window.Selector.SUMMER_CALC),
      calcPayment: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + window.Selector.PAYMENT_CALC),
      calcTerm: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + window.Selector.TERM_CALC),
      optionInput: document.querySelector(Selector.MORTGAGE_CONTAINER + ' ' + window.Selector.OPTION_INPUT),
    };

    this.onCalcSummer = function () {
      this.value = this.CalcSummer.getInputValueNum();
      this.CalcPayment.set(this.value);
      this.getResetOfChange();
    }.bind(this);

    this.onPaymentCalc = function () {
      this.payment = this.CalcPayment.getInputValueNum();
      this.getResetOfChange();
    }.bind(this);

    this.onCalcTerm = function () {
      this.term = this.CalcTerm.getInputValueInMonth();
      this.getResetOfChange();
    }.bind(this);

    this.onChangeOption = function () {
      this.getResetOfChange();
    }.bind(this);
  }

  getCalcsInit() {
    this.CalcSummer = new CalcSummer(this.blocks.calcSummer);
    this.CalcSummer.init();
    this.CalcTerm = new CalcTerm(this.blocks.calcTerm);
    this.CalcTerm.init();
    this.value = this.CalcSummer.getInputValueNum();
    this.CalcPayment = new CalcPayment(this.blocks.calcPayment, this.value);
    this.CalcPayment.init();
    this.minPercentPayment = this.CalcPayment.getMinPercent();
  }

  getCalcsDestroy() {
    this.CalcSummer.destroy();
    this.CalcTerm.destroy();
    this.CalcPayment.destroy();
    this.CalcSummer = null;
    this.CalcTerm = null;
    this.CalcPayment = null;
  }

  getInnerParameters() {
    this.payment = this.CalcPayment.getInputValueNum();
    this.getSummerCredit();
    this.percentPayment = this.CalcPayment.getInterestPercentPayment();
    this.term = this.CalcTerm.getInputValueInMonth();
    this.interestRate = (this.percentPayment < this.rateTreshold) ? (this.rateMax / 12) / 100 : (this.rateMin / 12) / 100;
  }

  getResetOfChange() {
    this.getInnerParameters();
    this.renderResult();
  }

  getSummerCredit() {
    this.bonus = this.blocks.optionInput.checked ? parseInt(this.blocks.optionInput.dataset.bonus, 10) : 0;
    this.sumCredit = this.value - this.bonus - this.payment;
  }

  getMonthPayment() {
    return Math.round(this.sumCredit * (this.interestRate + (this.interestRate / (Math.pow(this.interestRate + 1, this.term) - 1))));
  }

  getIncome() {
    return this.getMonthPayment() * 100 / 45;
  }

  getAddEventListener() {
    this.blocks.calcSummer.addEventListener('summer', this.onCalcSummer);
    this.blocks.calcPayment.addEventListener('payment', this.onPaymentCalc);
    this.blocks.calcTerm.addEventListener('term', this.onCalcTerm);
    this.blocks.optionInput.addEventListener('change', this.onChangeOption);
  }

  getRemoveEventListener() {
    this.blocks.calcSummer.removeEventListener('summer', this.onCalcSummer);
    this.blocks.calcPayment.removeEventListener('payment', this.onPaymentCalc);
    this.blocks.calcTerm.removeEventListener('term', this.onCalcTerm);
    this.blocks.optionInput.removeEventListener('change', this.onChangeOption);
  }

  getResultValue() {
    return {
      summer: Math.round(this.sumCredit),
      rate: (this.interestRate * 12 * 100).toFixed(2),
      monthPayment: Math.round(this.getMonthPayment()),
      income: Math.round(this.getIncome()),
      paymentThreshold: this.paymentTreshold,
      startPayment: this.CalcPayment.getInputValueString(),
      term: this.CalcTerm.getInputValueString(this.CalcTerm.getInputValueInMonth() / 12),
      summerString: this.CalcSummer.getInputValueString(),
    };
  }

  getResultInitParameters() {
    return {
      nameInfo: this.nameInfo,
      nameResult: this.nameResult,
      formTarget: this.formTarget,
      formSummerName: this.formSummerName,
      tresholdInfo: this.paymentTreshold,
    };
  }

  setMainParameters(parameters, result) {
    this.Result = result;
    this.parameters = parameters;
    this.nameResult = this.parameters.nameResult;
    this.nameInfo = this.parameters.nameInfo ? this.parameters.nameInfo : false;
    this.formSummerName = this.parameters.formSummer;
    this.formTarget = this.parameters.nameTarget;
    this.paymentTreshold = parameters.paymentThreshold ? parseInt(this.parameters.paymentThreshold, 10) : 0;
    this.rateTreshold = parseInt(this.parameters.rateTreshold, 10);
    this.income = parseInt(this.parameters.income, 10);
    this.rateMin = parseFloat(this.parameters.rateMin);
    this.rateMax = parseFloat(this.parameters.rateMax);
  }

  renderResult() {
    this.Result.renderResult(this.getResultValue());
  }

  init() {
    this.getCalcsInit();
    this.getInnerParameters();
    this.getAddEventListener();
    this.Result.setText(this.getResultInitParameters());
    this.renderResult();
  }

  destroy() {
    this.getRemoveEventListener();
    this.getCalcsDestroy();
  }
}

export {CreditMortgage};
