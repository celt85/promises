(function () {
    "use strict";

    var DELAY_IN_SECONDS = 3;
    var DELAY_IN_MILISECONDS = DELAY_IN_SECONDS * 1000;

    var VALUE_FOR_A = 90;
    var VALUE_FOR_B = 50;
    var VALUE_FOR_C = 70;
    var VALUE_FOR_D = 28;

    var FIRST_CHART_SELECTOR = "#chart_1";
    var SECOND_CHART_SELECTOR = "#chart_2";
    var THIRD_CHART_SELECTOR = "#chart_3";

    var BUTTON_SELECTOR = "button";
    var RESET_BUTTON_SELECTOR = "#reset";
    var PROGRESS_SELECTOR = "progress";

    WinJS.UI.Pages.define("/pages/promises.html", {
        ready: function (element, options) {

            setupChart1(element);

            setupChart2(element);

            setupChart3(element);

            setupResetButton(element);
        }
    });

    function taskSync() {
        delay(DELAY_IN_MILISECONDS);
    }

    function taskAsync() {
        var seconds = 0;
        var intervalId = window.setInterval(function () {
            seconds++;
            if (seconds >= DELAY_IN_SECONDS) {
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
                if (seconds >= DELAY_IN_SECONDS) {
                    window.clearInterval(intervalId);
                    complete();
                }
            }, 1000);
        });
    }

    function setupChart1(element) {
        var chart = element.querySelector(FIRST_CHART_SELECTOR);

        var button = chart.querySelector(BUTTON_SELECTOR);
        button.onclick = function (e) {
            clearVelues(chart);

            disableButton(button);

            taskSync();
            setVelues(chart, VALUE_FOR_A, VALUE_FOR_B, VALUE_FOR_C, VALUE_FOR_D);

            enableButton(button);
        };
    }

    function setupChart2(element) {
        var chart = element.querySelector(SECOND_CHART_SELECTOR);

        var button = chart.querySelector(BUTTON_SELECTOR);
        button.onclick = function (e) {
            clearVelues(chart);

            disableButton(button);

            taskAsync();
            setVelues(chart, VALUE_FOR_A, VALUE_FOR_B, VALUE_FOR_C, VALUE_FOR_D);

            enableButton(button);
        };
    }

    function setupChart3(element) { 
        var chart = element.querySelector(THIRD_CHART_SELECTOR);

        var button = chart.querySelector(BUTTON_SELECTOR);
        button.onclick = function (e) {
            clearVelues(chart);

            disableButton(button);
            taskAsyncPromise().done(
                function () { enableButton(button) },
                null,
                function (s) {
                    setVelues(chart, percent(VALUE_FOR_A, s), percent(VALUE_FOR_B, s), percent(VALUE_FOR_C, s), percent(VALUE_FOR_D, s));
                });
        };
    }

    /****** NO IMPORTANT FUNCTIONS *****/

    function setupResetButton(element) {
        element.querySelector(RESET_BUTTON_SELECTOR).onclick = function (e) {
            clearVelues(element.querySelector(FIRST_CHART_SELECTOR));
            clearVelues(element.querySelector(SECOND_CHART_SELECTOR));
            clearVelues(element.querySelector(THIRD_CHART_SELECTOR));
        };
    }

    function setVelues(element, a, b, c, d) {
        element.querySelector(".A").value = a;
        element.querySelector(".B").value = b;
        element.querySelector(".C").value = c;
        element.querySelector(".D").value = d;
    }

    function clearVelues(element) {
        setVelues(element, 0, 0, 0, 0);
    }

    function delay(time) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + time);
    }

    function percent(value, part) {
        // var ratio = Math.round(Math.random(), 2);
        return (value / DELAY_IN_SECONDS) * part;
    }

    function disableButton(button) {
        button.disabled = "disabled";
    }

    function enableButton(button) {
        button.disabled = "";
    }

})();