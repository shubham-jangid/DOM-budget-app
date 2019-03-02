//budget controller
var budgetController = (function() {})();

// UI controller
var UIController = (function() {
  var DOMString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMString.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMString.inputDescription).value,
        value: document.querySelector(DOMString.inputValue).value
      };
    },
    DOMString: DOMString
  };
})();

// global app controller
var controller = (function(budgetCtrl, UIctrl) {
  var setupEventListner = function() {
    document
      .querySelector(UIctrl.DOMString.inputBtn)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", event => {
      if (event.keyCode == 13 || event.which == 13) ctrlAddItem();
    });
  };

  var ctrlAddItem = function() {
    var input = UIctrl.getInput();
    console.log(input);
  };

  return {
    init: function() {
      console.log("application started");
      setupEventListner();
    }
  };
})(budgetController, UIController);

controller.init();
