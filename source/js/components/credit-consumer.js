import CalcSummer from './calc-summer';
import CalcTerm from './calc-term';

var Selector = {
  CONSUMER_CONTAINER: '.credit__slide--consumer',
};

class CreditConsumer {
  constructor() {
    this.blocks = {
      calcSummer: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + window.Selector.SUMMER_CALC),
      calcTerm: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + window.Selector.TERM_CALC),
      optionInput: document.querySelector(Selector.CONSUMER_CONTAINER + ' ' + window.Selector.OPTION_INPUT),
    };

    this.onCalcSummer = function () {
      this.value = this.CalcSummer.getInputValueNum();
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
  }

  getCalcsDestroy() {
    this.CalcSummer.destroy();
    this.CalcTerm.destroy();
    this.CalcSummer = null;
    this.CalcTerm = null;
  }

  getInnerParameters() {
    this.term = this.CalcTerm.getInputValueInMonth();
    this.sumCredit = this.value;
    this.rateOption = this.blocks.optionInput.checked ? this.parameters.rateBonus : 0;
    this.interestRate = (this.rateMin - this.rateOption) / 12 / 100;
    if (this.sumCredit < this.summerTresholdMin) {
      this.interestRate = (this.rateMax - this.rateOption) / 12 / 100;
    }
    if (this.sumCredit >= this.summerTresholdMin && this.sumCredit < this.summerTreshold) {
      this.interestRate = (this.rate - this.rateOption) / 12 / 100;
    }
  }

  getResetOfChange() {
    this.getInnerParameters();
    this.renderResult();
  }

  getMonthPayment() {
    return Math.round(this.sumCredit * (this.interestRate + (this.interestRate / (Math.pow(this.interestRate + 1, this.term) - 1))));
  }

  getIncome() {
    return this.getMonthPayment() * 100 / 45;
  }

  getAddEventListener() {
    this.blocks.calcSummer.addEventListener('summer', this.onCalcSummer);
    this.blocks.calcTerm.addEventListener('term', this.onCalcTerm);
    this.blocks.optionInput.addEventListener('change', this.onChangeOption);
  }

  getRemoveEventListener() {
    this.blocks.calcSummer.removeEventListener('summer', this.onCalcSummer);
    this.blocks.calcTerm.removeEventListener('term', this.onCalcTerm);
    this.blocks.optionInput.addEventListener('change', this.onChangeOption);
  }

  getResultStartParameters() {
    return {
      nameForm: this.parameters.nameForm,
      nameInfo: this.parameters.nameInfo,
      nameResult: this.parameters.nameResult,
      paymentThreshold: 0,
    };
  }

  getResultValue() {
    return {
      summer: Math.round(this.sumCredit),
      rate: (this.interestRate * 12 * 100).toFixed(2),
      monthPayment: Math.round(this.getMonthPayment()),
      income: Math.round(this.getIncome()),
      paymentThreshold: this.paymentTreshold,
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
    this.summerTreshold = parseInt(this.parameters.summerTreshold, 10);
    this.summerTresholdMin = parseInt(this.parameters.summerTresholdMin, 10);
    this.income = parseInt(this.parameters.income, 10);
    this.rateMin = parseFloat(this.parameters.rateMin);
    this.rateMax = parseFloat(this.parameters.rateMax);
    this.rate = parseFloat(this.parameters.rate);
    this.rateBonus = parseFloat(this.parameters.rateBonus);
    this.paymentTreshold = parameters.paymentThreshold ? parseInt(this.parameters.paymentThreshold, 10) : 0;
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

export {CreditConsumer};
