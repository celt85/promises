(function () {
    "use strict";

    var BUTTON_SELECTOR = "button";
    var FIRST_NUMBER_SELECTOR = "#firstNumber";
    var SECOND_NUMBER_SELECTOR = "#secondNumber";

    WinJS.UI.Pages.define("/pages/errors.html", {
        ready: function (element, options) {

            var firstNumber = element.querySelector(FIRST_NUMBER_SELECTOR);
            var secondNumber = element.querySelector(SECOND_NUMBER_SELECTOR);

            calculate(firstNumber, secondNumber);
        }
    });

    function calculate(firstNumber, secondNumber) {
        WinJS.Promise(function (complete, error, progress) {

            try {
                var result = firstNumber / secondNumber;
                complete(result)
            }
            catch (err) {

            }
        });
    }

})();