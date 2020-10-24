import CalcSummer from './calc-summer';
import CalcPayment from './calc-payment';
import CalcTerm from './calc-term';

var Selector = {
  CAR_CONTAINER: '.credit__slide--car',
  OPTION_INPUT_CASCO: '.js-option-casco input',
  OPTION_INPUT_HEALTH: '.js-option-health input',
};

class CreditCar {
  constructor() {
    this.blocks = {
      calcSummer: document.querySelector(Selector.CAR_CONTAINER + ' ' + window.Selector.SUMMER_CALC),
      calcPayment: document.querySelector(Selector.CAR_CONTAINER + ' ' + window.Selector.PAYMENT_CALC),
      calcTerm: document.querySelector(Selector.CAR_CONTAINER + ' ' + window.Selector.TERM_CALC),
      optionInputCasco: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.OPTION_INPUT_CASCO),
      optionInputHealth: document.querySelector(Selector.CAR_CONTAINER + ' ' + Selector.OPTION_INPUT_HEALTH),
    };

    this.onCalcSummer = function () {
      this.value = this.CalcSummer.getInputValueNum();
      this.CalcPayment.set(this.value);
      this.getResetOfChange();
    }.bind(this);

    this.onCalcPayment = function () {
      this.payment = this.CalcPayment.getInputValueNum();
      this.getResetOfChange();
    }.bind(this);

    this.onCalcTerm = function () {
      this.term = this.CalcTerm.getInputValueInMonth();
      this.getResetOfChange();
    }.bind(this);

    this.onChangeOptionCasco = function () {
      this.statusCasco = this.blocks.optionInputCasco.checked;
      this.getResetOfChange();
    }.bind(this);

    this.onChangeOptionHealth = function () {
      this.statusHealth = this.blocks.optionInputHealth.checked;
      this.getResetOfChange();
    }.bind(this);
  }

  getResetOfChange() {
    this.getInnerParameters();
    this.renderResult();
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
    this.statusCasco = this.blocks.optionInputCasco.checked;
    this.statusHealth = this.blocks.optionInputHealth.checked;

    if (!this.statusCasco || !this.statusHealth) {
      this.interestRate = this.rateBonusMin / 12 / 100;
    }

    if (this.statusCasco && this.statusHealth) {
      this.interestRate = this.rateBonusMax / 12 / 100;
    }
    if (!this.statusCasco && !this.statusHealth) {
      this.interestRate = (this.value < this.rateTreshold) ? (this.rateMax / 12) / 100 : (this.rateMin / 12) / 100;
    }
  }

  getSummerCredit() {
    this.sumCredit = this.value - this.payment;
  }

  getMonthPayment() {
    return Math.round(this.sumCredit * (this.interestRate + (this.interestRate / (Math.pow(this.interestRate + 1, this.term) - 1))));
  }

  getIncome() {
    return this.getMonthPayment() * 100 / 45;
  }

  getAddEventListener() {
    this.blocks.calcSummer.addEventListener('summer', this.onCalcSummer);
    this.blocks.calcPayment.addEventListener('payment', this.onCalcPayment);
    this.blocks.calcTerm.addEventListener('term', this.onCalcTerm);
    this.blocks.optionInputCasco.addEventListener('change', this.onChangeOptionCasco);
    this.blocks.optionInputHealth.addEventListener('change', this.onChangeOptionHealth);
  }

  getRemoveEventListener() {
    this.blocks.calcSummer.removeEventListener('summer', this.onCalcSummer);
    this.blocks.calcPayment.removeEventListener('payment', this.onCalcPayment);
    this.blocks.calcTerm.removeEventListener('term', this.onCalcTerm);
    this.blocks.optionInputCasco.removeEventListener('change', this.onChangeOptionCasco);
    this.blocks.optionInputHealth.removeEventListener('change', this.onChangeOptionHealth);
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
    this.rateBonusMin = parseFloat(this.parameters.minBonus);
    this.rateBonusMax = parseFloat(this.parameters.maxBonus);
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

export {CreditCar};
