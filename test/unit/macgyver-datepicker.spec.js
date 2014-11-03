describe("Mac datepicker", function() {
  var $compile, $rootScope, equalsDate;
  $compile = null;
  $rootScope = null;
  equalsDate = null;
  beforeEach(module("Mac.Datepicker"));

  beforeEach(inject(function(_$compile_, _$rootScope_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    equalsDate = function(d1, d2, message) {
      d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
      d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
      expect(d1.toString()).toBe(d2.toString());
    };
  }));

  describe("basic initialization", function() {
    it("should be replaced with template", function() {
      var element;
      element = $compile("<mac-datepicker ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      expect(element.hasClass("mac-date-time")).toBe(true);
    });
  });

  describe("options", function() {
    it("should set options using attributes", function() {
      var element;
      element = $compile("<mac-datepicker mac-datepicker-append-text='test' ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      expect(element.datepicker("option", "appendText")).toBe("test");
    });
    it("should set dateFormat correctly", function() {
      var element;
      element = $compile("<mac-datepicker mac-datepicker-date-format='yyyy/mm/dd' ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      expect(element.datepicker("option", "dateFormat")).toBe("yyyy/mm/dd");
    });
  });

  describe("defaultDate", function() {
    it("should set defaultDate to null", function() {
      var date, element;
      date = new Date();
      element = $compile("<mac-datepicker ng-model='date'></mac-datepicker>")($rootScope);
      $("body").append(element);
      $rootScope.$digest();
      element.val("").datepicker("show").trigger($.Event("keydown", {
        keyCode: 13
      }));
      equalsDate(element.datepicker("getDate"), date);
    });
    it("should set defaultDate with numerical value", function() {
      var date, element;
      $rootScope.defaultDate = 2;
      date = new Date();
      date.setDate(date.getDate() + 2);
      element = $compile("<mac-datepicker mac-datepicker-default-date='defaultDate' ng-model='date'></mac-datepicker>")($rootScope);
      $("body").append(element);
      $rootScope.$digest();
      element.val("").datepicker("show").trigger($.Event("keydown", {
        keyCode: 13
      }));
      equalsDate(element.datepicker("getDate"), date);
    });
    it("should set defaultDate with numerical value", function() {
      var date, element;
      $rootScope.defaultDate = "-3d";
      date = new Date();
      date.setDate(date.getDate() - 3);
      element = $compile("<mac-datepicker mac-datepicker-default-date='defaultDate' ng-model='date'></mac-datepicker>")($rootScope);
      $("body").append(element);
      $rootScope.$digest();
      element.val("").datepicker("show").trigger($.Event("keydown", {
        keyCode: 13
      }));
      equalsDate(element.datepicker("getDate"), date);
    });
  });

  describe("min/max", function() {
    it("should set the min date correctly", function() {
      var date, element;
      date = new Date();
      date.setMonth(date.getMonth() - 6);
      $rootScope.minDate = date;
      element = $compile("<mac-datepicker mac-datepicker-min-date='minDate' ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      return equalsDate(element.datepicker("option", "minDate"), date);
    });
    it("should set the min date correctly", function() {
      var date, element;
      date = new Date();
      date.setMonth(date.getMonth() - 6);
      $rootScope.maxDate = date;
      element = $compile("<mac-datepicker mac-datepicker-max-date='maxDate' ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      equalsDate(element.datepicker("option", "maxDate"), date);
    });
  });

  describe("validation", function() {
    it("should set to invalid", function() {
      var element;
      $rootScope.model = "01/01/2014";
      element = $compile("<mac-datepicker ng-model='model'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      expect(element.hasClass("ng-valid")).toBeTruthy();
      $rootScope.model = "13/01/2014";
      $rootScope.$digest();
      return expect(element.hasClass("ng-invalid")).toBeTruthy();
    });
    it("should not validate for date", function() {
      var element;
      $rootScope.model = "01/01/2014";
      element = $compile("<mac-datepicker ng-model='model'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      expect(element.hasClass("ng-valid")).toBeTruthy();
      $rootScope.model = "";
      $rootScope.$digest();

      expect(element.hasClass("ng-valid")).toBeTruthy();
      expect(element.hasClass("ng-valid-date")).toBeTruthy();
    });
  });

  describe("view -> model", function() {
    var $sniffer, changeInputValue;
    $sniffer = null;
    changeInputValue = function() {};
    beforeEach(inject(function(_$sniffer_) {
      $sniffer = _$sniffer_;
      changeInputValue = function(element, value) {
        element.val(value);
        return element.trigger(($sniffer.hasEvent("input") ? "input" : "change"));
      };
    }));
    it("should update model", function() {
      var element;
      $rootScope.model = "01/01/2014";
      element = $compile("<mac-datepicker ng-model='model'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      changeInputValue(element, "10/21/2015");
      expect($rootScope.model).toBe("10/21/2015");
    });
  });
  
  describe("callbacks", function() {
    it("should call on select callback and set the model", function() {
      var date, element;
      date = new Date();
      $rootScope.model = "";
      element = $compile("<mac-datepicker ng-model='model'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      $("body").append(element);

      element.val("").datepicker("show").trigger($.Event("keydown", {
        keyCode: 13
      }));

      $rootScope.$digest();

      equalsDate(new Date($rootScope.model), date);
    });

    it("should call on close", function() {
      var closedDate, date, element;
      closedDate = "";
      date = new Date();
      $rootScope.onClose = function(onCloseDate) {
        closedDate = onCloseDate;
      };
      element = $compile("<mac-datepicker mac-datepicker-on-close='onClose(date)' ng-model='date'></mac-datepicker>")($rootScope);
      $rootScope.$digest();
      $("body").append(element);

      element.val("").datepicker("show").trigger($.Event("keydown", {
        keyCode: 13
      }));

      equalsDate(new Date(closedDate), date);
    });
  });
});
