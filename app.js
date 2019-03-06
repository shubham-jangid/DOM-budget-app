//budget controller
var budgetController = (function() {
  var Expense = function(id, destination, value) {
    this.id = id;
    this.description = destination;
    this.value = value;
  };

  var Income = function(id, destination, value) {
    this.id = id;
    this.description = destination;
    this.value = value;
  };

  data = {
    allItems: {
      exp: [],
      inc: []
    },
    total: {
      exp: 0,
      inc: 0
    }
  };

  return {
    additem: function(type, desc, val) {
      var newItem, Id;

      if (data.allItems[type].length > 0) {
        Id = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        Id = 0;
      }

      if (type === "inc") {
        newItem = new Expense(Id, desc, val);
      } else if (type === "exp") {
        newItem = new Income(Id, desc, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
    data: data
  };
})();

// UI controller
var UIController = (function() {
  var DOMString = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputBtn: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list"
  };

  return {
    getInput: function() {
      return {
        type: document.querySelector(DOMString.inputType).value, // will be either inc or exp
        description: document.querySelector(DOMString.inputDescription).value,
        value: document.querySelector(DOMString.inputValue).value
      };
    },
    DOMString: DOMString,
    addListItem: function(obj, type) {
      var HTML, newHtml, element;
      if (type == "inc") {
        element = DOMString.incomeContainer;
        HTML =
          '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type == "exp") {
        element = DOMString.expenseContainer;
        HTML =
          '<div class="item clearfix" id="%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      newHtml = HTML.replace("%id%", obj.id);
      newHtml = newHtml.replace("%description%", obj.description);
      newHtml = newHtml.replace("%value%", obj.value);

      document.querySelector(element).insertAdjacentHTML("beforeend", newHtml);
    },
    clearFields: function() {
      document.querySelector(DOMString.inputDescription).value = "";
      document.querySelector(DOMString.inputValue).value = "";
      document.querySelector(DOMString.inputDescription).focus();
    }
  };
})();

// global app controller
var controller = (function(budgetCtrl, UIctrl) {
  var ctrlAddItem = function() {
    // get the field input data
    var input = UIctrl.getInput();

    // add the input to the budget controller
    var newInput = budgetCtrl.additem(
      input.type,
      input.description,
      input.value
    );

    // add item to the UI
    UIctrl.addListItem(newInput, input.type);

    //clear fielsd
    UIctrl.clearFields();
  };

  var setupEventListner = function() {
    document
      .querySelector(UIctrl.DOMString.inputBtn)
      .addEventListener("click", ctrlAddItem);

    document.addEventListener("keypress", event => {
      if (event.keyCode == 13 || event.which == 13) ctrlAddItem();
    });
  };

  return {
    init: function() {
      console.log("application started");
      setupEventListner();
    }
  };
})(budgetController, UIController);

controller.init();
