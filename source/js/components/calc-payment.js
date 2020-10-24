import {getStringOfNumb} from './utils';

class CalcPayment {
  constructor(block, value) {
    this.element = block;
    if (typeof (Event) === 'function') {
      this.event = new Event('payment');
    } else {
      this.event = document.createEvent('Event');
      this.event.initEvent('payment', true, true);
    }
    this.input = this.element.querySelector(window.Selector.INPUT);
    this.sumCredit = parseInt(value, 10);
    this.percent = parseInt(this.input.dataset.percent, 10);
    this.currentPercent = this.percent;
    this.value = parseInt(value, 10) * this.percent / 100;
    this.min = parseInt(value, 10) * this.percent / 100;
    this.prefix = this.input.dataset.prefix;
    this.input.value = this.getInputValueString();
    this.rangeStep = parseInt(this.input.dataset.rangeStep, 10);
    this.range = this.element.querySelector(window.Selector.RANGE);
    this.rangeScale = this.element.querySelector(window.Selector.RANGE_SCALE);
    this.rangePrefix = '%';
    this.rangeInfo = this.element.querySelector(window.Selector.RANGE_INFO_LEFT);
    this.rangeInfo.innerHTML = this.currentPercent + this.rangePrefix;
    this.rangeBar = this.element.querySelector(window.Selector.RANGE_BAR);
    this.coefficient = this.rangeStep * 100 / (100 - this.percent);
    this.rangeParameters = {};

    this.onChange = function () {
      this.value = Math.round(Math.min(Math.max(this.input.value, this.min), this.sumCredit));
      this.input.setAttribute('value', this.value);
      this.input.value = this.value;
      this.getRangeInfo();
      this.currentPercent = this.getInterestPercentPayment();
      this.getShiftRange(Math.min(((100 - this.percent) / this.rangeStep - (100 - this.currentPercent) / this.rangeStep) * this.coefficient, this.rangeParameters.maxRangeStyle));
      this.element.dispatchEvent(this.event);
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';
      this.input.setAttribute('value', this.getInputValueString());
      this.input.value = this.getInputValueString();
      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.onChange);
      this.getRangeInfo();
    }.bind(this);

    this.onFocus = function () {
      this.input.type = 'number';
      this.input.value = this.value;
      this.input.setAttribute('step', this.sumCredit * this.rangeStep / 100);
      this.input.setAttribute('value', this.value);
      this.input.addEventListener('blur', this.onBlur);
      this.input.addEventListener('change', this.onChange);
    }.bind(this);

    this.onMouseUp = function (evt) {
      evt.preventDefault();
      window.removeEventListener('mousemove', this.onMouseMove);
      window.removeEventListener('mouseup', this.onMouseUp);
    }.bind(this);

    this.onMouseDownRange = function (evt) {
      if (evt.which !== 1) {
        return;
      }
      this.getRangeParameters();
      this.rangeParameters.rangeClickCoordinate = evt.offsetX;
      this.rangeParameters.mouseStartPos = this.rangeParameters.rangeStartCoordinates + this.rangeParameters.rangeClickCoordinate;
      window.addEventListener('mousemove', this.onMouseMove);
      window.addEventListener('mouseup', this.onMouseUp);
    }.bind(this);

    this.onMouseMove = function (evt) {
      evt.preventDefault();
      this.rangeParameters.mouseShift = evt.clientX - this.rangeParameters.mouseStartPos;
      this.rangeParameters.rangePercent = (this.rangeParameters.rangeStartShift + this.rangeParameters.mouseShift) * 100 / this.rangeParameters.widthRangeBar;
      this.rangeParameters.styleValue = Math.max(Math.min(this.roundToRange(this.rangeParameters.rangePercent), 100), 0);
      this.getShiftRange(Math.min(this.rangeParameters.styleValue, this.rangeParameters.maxRangeStyle));
      this.currentPercent = Math.round(((100 - this.percent) / this.rangeStep - (100 - this.rangeParameters.styleValue) / this.coefficient) * this.rangeStep) + this.percent;
      this.resetParameter();
      this.element.dispatchEvent(this.event);
    }.bind(this);


    this.onTouchEnd = function (evt) {
      evt.preventDefault();
      this.range.removeEventListener('touchmove', this.onMouseMove);
      this.range.removeEventListener('touchend', this.onMouseUp);
    }.bind(this);

    this.onTouchStart = function (evt) {
      evt.preventDefault();
      this.getRangeParameters();
      this.rangeParameters.rangeClickCoordinate = evt.targetTouches[0].clientX;
      this.rangeParameters.mouseStartPos = evt.targetTouches[0].clientX;
      this.range.addEventListener('touchmove', this.onTouchMove);
      this.range.addEventListener('touchend', this.onTouchEnd);
    }.bind(this);


    this.onTouchMove = function (evt) {
      evt.preventDefault();
      this.rangeParameters.mouseShift = evt.targetTouches[0].clientX - this.rangeParameters.mouseStartPos;
      this.rangeParameters.rangePercent = (this.rangeParameters.rangeStartShift + this.rangeParameters.mouseShift) * 100 / this.rangeParameters.widthRangeBar;
      this.rangeParameters.styleValue = Math.max(Math.min(this.roundToRange(this.rangeParameters.rangePercent), 100), 0);
      this.getShiftRange(Math.min(this.rangeParameters.styleValue, this.rangeParameters.maxRangeStyle));
      this.currentPercent = Math.round(((100 - this.percent) / this.rangeStep - (100 - this.rangeParameters.styleValue) / this.coefficient) * this.rangeStep) + this.percent;
      this.resetParameter();
      this.element.dispatchEvent(this.event);
    }.bind(this);
  }

  getInputValueString() {
    this.numbOfString = getStringOfNumb(this.value);
    return this.numbOfString + ' ' + this.prefix;
  }

  getInputValueNum() {
    return this.value;
  }

  getMinPercent() {
    return this.percent;
  }

  destroy() {
    this.input.removeEventListener('focus', this.onFocus);
  }

  getInterestPercentPayment() {
    return this.value / this.sumCredit * 100;
  }

  getRangeInfo() {
    this.rangeInfo.innerText = Math.round(this.getInterestPercentPayment()) + this.rangePrefix;
  }

  getShiftRange(value) {
    this.range.style.left = value + '%';
    this.rangeScale.style.width = value + '%';
  }

  roundToRange(num) {
    return Math.round(num / this.coefficient) * this.coefficient;
  }

  getRangeParameters() {
    this.rangeParameters.widthRangeBar = this.rangeBar.clientWidth;
    this.rangeParameters.widthRange = this.range.clientWidth;
    this.rangeParameters.maxRangeStyle = Math.round((this.rangeParameters.widthRangeBar - this.rangeParameters.widthRange) * 100 / this.rangeParameters.widthRangeBar);
    this.rangeParameters.rangeBarLeftCoordinates = this.rangeBar.getBoundingClientRect().left;
    this.rangeParameters.rangeStartCoordinates = this.range.getBoundingClientRect().left;
    this.rangeParameters.rangeStartShift = this.rangeParameters.rangeStartCoordinates - this.rangeParameters.rangeBarLeftCoordinates;
  }

  init() {
    this.getRangeParameters();
    this.input.addEventListener('focus', this.onFocus);
    this.range.addEventListener('mousedown', this.onMouseDownRange);
    this.range.addEventListener('touchstart', this.onTouchStart);
  }

  destroy() {
    this.input.removeEventListener('focus', this.onFocus);
    this.range.removeEventListener('mousedown', this.onMouseDownRange);
    this.range.removeEventListener('touchstart', this.onTouchStart);
  }

  resetParameter() {
    this.rangeInfo.innerHTML = this.currentPercent + this.rangePrefix;
    this.value = this.sumCredit * this.currentPercent / 100;
    this.input.value = this.getInputValueString();
  }

  set(value) {
    this.sumCredit = parseInt(value, 10);
    this.value = this.sumCredit * this.currentPercent / 100;
    this.min = parseInt(value, 10) * this.percent / 100;
    this.input.value = this.getInputValueString();
  }
}

export default CalcPayment;
