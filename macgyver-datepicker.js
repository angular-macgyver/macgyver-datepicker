/*
@chalk overview
@name Datepicker
@description
A directive for creating a datepicker on text input using jquery ui. Time input can use any `ng-` attributes support by text input type.

@dependencies
- jQuery
- jQuery UI datepicker

@param {String}     ng-model The model to store the selected date
Clearing model by setting it to null or '' will clear the input field
@param {Function}   mac-datepicker-on-select Function called before setting the value to the model
  - `date` - {String} Selected date from the datepicker
  - `instance` - {Object} Datepicker instance
@param {String}     mac-datepicker-on-close Function called before closing datepicker
  - `date` - {String} Selected date from the datepicker
  - `instance` - {Object} Datepicker instance
@param {String}     mac-datepicker-append-text          The text to display after each date field
@param {Boolean}    mac-datepicker-auto-size            Automatically resize the input to accommodate dates in the current dateFormat
@param {Boolean}    mac-datepicker-change-month         Whether the month should be rendered as a dropdown instead of text
@param {Boolean}    mac-datepicker-change-year          Whether the year should be rendered as a dropdown instead of text
@param {Boolean}    mac-datepicker-constrain-input-type Constrain characters allowed by the current dateFormat
@param {String}     mac-datepicker-current-text         Text to display for the current day link
@param {String}     mac-datepicker-date-format          The format for parse and displayed dates
@param {Expression} mac-datepicker-default-date         Date to highligh on first opening if the field is blank {Date|Number|String}
@param {String}     mac-datepicker-duration             Control the speed at which the datepicker appears
@param {Integer}    mac-datepicker-first-day            Set the first day of the week. Sunday is 0, Monday is 1
@param {Expression} mac-datepicker-max-date             The maximum selectable date {Date|Number|String}
@param {Expression} mac-datepicker-min-date             The minimum selectable date {Date|Number|String}
@param {Integer}    mac-datepicker-number-of-months     The number of months to show at once
@param {String}     mac-datepicker-show-on              When the datepicker should appear
@param {Integer}    mac-datepicker-year-range           The range of years displayed in the year drop-down
@param {Boolean}    ng-disabled                         Enable or disable datepicker
 */

(function() {'use strict';
angular.module("Mac.Datepicker", []).directive("macDatepicker", [
  "$parse", function($parse) {
    var defaults, extendAttributes;
    defaults = {
      appendText: "",
      autoSize: false,
      changeMonth: false,
      changeYear: false,
      constrainInputType: true,
      currentText: "Today",
      dateFormat: "mm/dd/yy",
      defaultDate: null,
      duration: "normal",
      firstDay: 0,
      maxDate: null,
      minDate: null,
      numberOfMonths: 1,
      showOn: "focus",
      yearRange: "c-10:c+10"
    };

    extendAttributes = function(attributes) {
      var key, macKey, output, value, _ref, _ref1;
      output = {};
      for (key in defaults) {
        if (!defaults.hasOwnProperty(key)) continue;
        value = defaults[key];
        macKey = "macDatepicker" + key.charAt(0).toUpperCase() + key.substring(1);
        output[key] = attributes[macKey] != null ? attributes[macKey] || true : value;
        if ((_ref = output[key]) === "true" || _ref === "false") {
          output[key] = output[key] === "true";
        } else if (((_ref1 = output[key]) != null ? _ref1.length : void 0) > 0 && !isNaN(+output[key])) {
          output[key] = +output[key];
        }
      }
      return output;
    };

    return {
      restrict: "E",
      require: "ngModel",
      replace: true,
      template: '<input type="text" class="mac-date-time"/>',
      link: function($scope, element, attrs, ngModelCtrl) {
        var datepickerValidator, onClose, onSelect, opts, setOptions;
        opts = extendAttributes(attrs);
        onSelect = $parse(attrs.macDatepickerOnSelect);
        onClose = $parse(attrs.macDatepickerOnClose);
        datepickerValidator = function(value) {
          var e;
          if (!value) {
            ngModelCtrl.$setValidity("date", true);
            return value;
          }
          try {
            $.datepicker.parseDate(opts.dateFormat, value);
            ngModelCtrl.$setValidity("date", true);
            return value;
          } catch (_error) {
            e = _error;
            ngModelCtrl.$setValidity("date", false);
            return void 0;
          }
        };
        ngModelCtrl.$formatters.push(datepickerValidator);
        ngModelCtrl.$parsers.push(datepickerValidator);
        opts.onSelect = function(date, instance) {
          return $scope.$apply(function() {
            if (typeof onSelect === "function") {
              onSelect($scope, {
                date: date,
                instance: instance
              });
            }
            ngModelCtrl.$setViewValue(date);
            return ngModelCtrl.$render();
          });
        };
        opts.onClose = function(date, instance) {
          return $scope.$apply(function() {
            return typeof onClose === "function" ? onClose($scope, {
              date: date,
              instance: instance
            }) : void 0;
          });
        };
        element.datepicker(opts);
        setOptions = function(name, value) {
          if (value != null) {
            return element.datepicker("option", name, value);
          }
        };
        if (attrs.macDatepickerDefaultDate != null) {
          $scope.$watch(attrs.macDatepickerDefaultDate, function(value) {
            return setOptions("defaultDate", value);
          });
        }
        if (attrs.macDatepickerMaxDate != null) {
          $scope.$watch(attrs.macDatepickerMaxDate, function(value) {
            return setOptions("maxDate", value);
          });
        }
        if (attrs.macDatepickerMinDate != null) {
          return $scope.$watch(attrs.macDatepickerMinDate, function(value) {
            return setOptions("minDate", value);
          });
        }
      }
    };
  }
]);
})();
