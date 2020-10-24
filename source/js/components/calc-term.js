class CalcTerm {
  constructor(block) {
    this.element = block;
    if (typeof (Event) === 'function') {
      this.event = new Event('term');
    } else {
      this.event = document.createEvent('Event');
      this.event.initEvent('term', true, true);
    }
    this.input = this.element.querySelector(window.Selector.INPUT);
    this.min = parseInt(this.input.dataset.min, 10);
    this.max = parseInt(this.input.dataset.max, 10);
    this.value = this.min;
    this.prefix = this.input.dataset.prefix.split(',');
    this.input.value = this.getInputValueString(this.value);
    this.range = this.element.querySelector(window.Selector.RANGE);
    this.rangeBar = this.element.querySelector(window.Selector.RANGE_BAR);
    this.rangeScale = this.element.querySelector(window.Selector.RANGE_SCALE);
    this.rangeStep = parseInt(this.input.dataset.rangeStep, 10);
    this.rangeInfoLeft = this.element.querySelector(window.Selector.RANGE_INFO_LEFT);
    this.rangeInfoRight = this.element.querySelector(window.Selector.RANGE_INFO_RIGHT);
    this.rangeInfoLeft.innerHTML = this.getInputValueString(this.min);
    this.rangeInfoRight.innerHTML = this.getInputValueString(this.max);
    this.coefficient = this.rangeStep * 100 / (this.max - this.min);
    this.rangeParameters = {};

    this.onChange = function () {
      this.value = Math.max(Math.min(this.input.value, this.max), this.min);
      this.input.value = this.value;
      this.getShiftRange(Math.min(100 - (this.max - this.value) * this.coefficient, this.rangeParameters.maxRangeStyle));
      this.element.dispatchEvent(this.event);
    }.bind(this);

    this.onBlur = function () {
      this.input.type = 'text';
      this.input.value = this.getInputValueString(this.value);
      this.input.removeEventListener('blur', this.onBlur);
      this.input.removeEventListener('change', this.onChange);
    }.bind(this);

    this.onFocus = function () {
      this.input.type = 'number';
      this.input.value = this.value;
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
      this.onRangerMove();
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
      this.rangeParameters.mouseShift = evt.targetTouches[0].clientX - this.rangeParameters.mouseStartPos;
      this.onRangerMove();
    }.bind(this);
  }

  onRangerMove() {
    this.rangeParameters.rangePercent = (this.rangeParameters.rangeStartShift + this.rangeParameters.mouseShift) * 100 / this.rangeParameters.widthRangeBar;
    this.rangeParameters.styleValue = Math.max(Math.min(this.roundToRange(this.rangeParameters.rangePercent), 100), 0);
    this.getShiftRange(Math.min(this.rangeParameters.styleValue, this.rangeParameters.maxRangeStyle));
    this.value = Math.round(((this.max - this.min) / this.rangeStep - (100 - this.rangeParameters.styleValue) / this.coefficient) * this.rangeStep) + this.min;
    this.resetParameter();
    this.element.dispatchEvent(this.event);
  }

  getInputValueString(value) {
    this.getCurrentPrefix(value);
    return value + ' ' + this.currentPrefix;
  }

  getInputValueInMonth() {
    return this.value * 12;
  }

  getCurrentPrefix(value) {
    this.count = value % 100;
    if (this.count >= 5 && this.count <= 20) {
      this.currentPrefix = this.prefix[2];
    } else {
      this.count = this.count % 10;
      if (this.count === 1) {
        this.currentPrefix = this.prefix[0];
      } else if (this.count >= 2 && this.count <= 4) {
        this.currentPrefix = this.prefix[1];
      } else {
        this.currentPrefix = this.prefix[2];
      }
    }
  }

  resetParameter() {
    this.input.value = this.getInputValueString(this.value);
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
}

export default CalcTerm;
