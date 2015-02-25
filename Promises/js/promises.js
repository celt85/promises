(function () {
    "use strict";

    var common = new Common();
    var consts = new Consts();

    WinJS.UI.Pages.define("/pages/promises.html", {
        ready: function (element, options) {

            setupChart1(element);

            setupChart2(element);

            setupChart3(element);

            setupResetButton(element);
        }
    });

    function taskSync() {
        common.delay(consts.DELAY_IN_MILISECONDS);
    }

    function taskAsync() {
        var seconds = 0;
        var intervalId = window.setInterval(function () {
            seconds++;
            if (seconds >= consts.DELAY_IN_SECONDS) {
                window.clearInterval(intervalId);
            }
        }, 1000);
    }

    function taskAsyncPromise() {
        return new WinJS.Promise(function (complete, error, progress) {
            var seconds = 0;
            var intervalId = window.setInterval(function () {
                seconds++;
                progress(seconds);
                if (seconds >= consts.DELAY_IN_SECONDS) {
                    window.clearInterval(intervalId);
                    complete();
                }
            }, 1000);
        });
    }

    function setupChart1(element) {
        var chart = element.querySelector(consts.FIRST_CHART_SELECTOR);

        var button = chart.querySelector(consts.BUTTON_SELECTOR);
        button.onclick = function (e) {
            common.clearVelues(chart);

            common.disableButton(button);

            taskSync();
            common.setVelues(chart,
                consts.VALUE_FOR_A,
                consts.VALUE_FOR_B,
                consts.VALUE_FOR_C,
                consts.VALUE_FOR_D);

            common.enableButton(button);
        };
    }

    function setupChart2(element) {
        var chart = element.querySelector(consts.SECOND_CHART_SELECTOR);

        var button = chart.querySelector(consts.BUTTON_SELECTOR);
        button.onclick = function (e) {
            common.clearVelues(chart);

            common.disableButton(button);

            taskAsync();
            common.setVelues(chart,
                consts.VALUE_FOR_A,
                consts.VALUE_FOR_B,
                consts.VALUE_FOR_C,
                consts.VALUE_FOR_D);

            common.enableButton(button);
        };
    }

    function setupChart3(element) { 
        var chart = element.querySelector(consts.THIRD_CHART_SELECTOR);

        var button = chart.querySelector(consts.BUTTON_SELECTOR);
        button.onclick = function (e) {
            common.clearVelues(chart);

            common.disableButton(button);
            taskAsyncPromise().done(
                function () { common.enableButton(button) },
                null,
                function (s) {
                    common.setVelues(chart,
                        common.percent(consts.VALUE_FOR_A, s),
                        common.percent(consts.VALUE_FOR_B, s),
                        common.percent(consts.VALUE_FOR_C, s),
                        common.percent(consts.VALUE_FOR_D, s));
                });
        };
    }

    /****** NO IMPORTANT FUNCTIONS *****/

    function setupResetButton(element) {
        element.querySelector(consts.RESET_BUTTON_SELECTOR).onclick = function (e) {
            common.clearVelues(element.querySelector(consts.FIRST_CHART_SELECTOR));
            common.clearVelues(element.querySelector(consts.SECOND_CHART_SELECTOR));
            common.clearVelues(element.querySelector(consts.THIRD_CHART_SELECTOR));
        };
    }

    

})();