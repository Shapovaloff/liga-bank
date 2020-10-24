import {getStringOfNumb} from './utils';

var Selector = {
  BTN_MIN: '.calculate__btn[data-target="min"]',
  BTN_PLUS: '.calculate__btn[data-target="plus"]',
  INPUT: '.calculate__input',
  ERROR: '.formArea__error'
};

var Class = {
  ERROR: 'formArea__error',
};

class CalcSummer {
  constructor(block) {
    this.element = block;
    if (typeof (Event) === 'function') {
      this.event = new Event('summer');
    } else {
      this.event = document.createEvent('Event');
      this.event.initEvent('summer', true, true);
    }
    this.input = this.element.querySelector(Selector.INPUT);
    this.value = parseInt(this.input.dataset.value, 10);
    this.min = parseInt(this.input.dataset.min, 10);
    this.max = parseInt(this.input.dataset.max, 10);
    this.step = parseInt(this.input.dataset.step, 10);
    this.prefix = this.input.dataset.prefix;
    this.error = this.input.dataset.errorMessage;
    this.btnMin = this.element.querySelector(Selector.BTN_MIN);
    this.btnPlus = this.element.querySelector(Selector.BTN_PLUS);

    this.onClickBtn = function (evt) {
      if (evt.target === this.btnMin) {
        this.value = Math.max(this.value -= this.step, this.min);
      }
      if (evt.target === this.btnPlus) {
        this.value = Math.min(this.value += this.step, this.max);
      }
      this.input.value = this.getInputValueString();
      this.input.setAttribute('value', this.getInputValueString());
      this.element.classList.remove(Class.ERROR);
      this.element.dispatchEvent(this.event);
    }.bind(this);

    this.onChange = function () {
      if (this.min < this.input.value && this.input.value < this.max) {
        this.value = Math.round(this.input.value);
        this.element.dispatchEvent(this.event);
      }
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';
      if (this.input.value < this.min || this.input.value > this.max) {
        this.input.value = this.error;
        this.input.setAttribute('value', this.error);
      }

      if (this.input.value > this.min && this.input.value < this.max) {
        this.value = parseInt(this.input.value, 10);
        this.input.setAttribute('value', this.getInputValueString());
        this.input.value = this.getInputValueString();
      }

      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.onChange);
    }.bind(this);

    this.onFocus = function () {
      this.element.classList.remove(Class.ERROR);
      this.input.type = 'number';
      this.input.value = this.value;
      this.input.setAttribute('value', this.value);
      this.input.setAttribute('step', this.step);
      this.input.addEventListener('blur', this.onBlur);
      this.input.addEventListener('change', this.onChange);
    }.bind(this);
  }

  getInputValueString() {
    this.numbOfString = getStringOfNumb(this.value);
    return this.numbOfString + ' ' + this.prefix;
  }

  getInputValueNum() {
    return this.value;
  }

  init() {
    this.btnMin.addEventListener('click', this.onClickBtn);
    this.btnPlus.addEventListener('click', this.onClickBtn);
    this.input.addEventListener('focus', this.onFocus);
  }

  destroy() {
    this.btnMin.removeEventListener('click', this.onClickBtn);
    this.btnPlus.removeEventListener('click', this.onClickBtn);
    this.input.removeEventListener('focus', this.onFocus);
  }
}

export default CalcSummer;
