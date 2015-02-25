(function () {
    "use strict";

    var common = new Common();
    var consts = new Consts();

    WinJS.UI.Pages.define("/pages/errors.html", {
        ready: function (element, options) {

            setupChart(element);
        }
    });

    function setupChart(element) {
        var chart = element.querySelector(consts.FIRST_CHART_SELECTOR);

        var button = chart.querySelector(consts.BUTTON_SELECTOR);
        button.onclick = function (args) {
            common.clearVelues(chart);

            taskAsyncPromise(consts.DELAY_IN_SECONDS).then(
                function () { Windows.UI.Popups.MessageDialog("Done").showAsync(); },
                null,
                function (s) {
                    common.setVelues(chart,
                        common.percent(consts.VALUE_FOR_A, s),
                        common.percent(consts.VALUE_FOR_B, s),
                        common.percent(consts.VALUE_FOR_C, s),
                        common.percent(consts.VALUE_FOR_D, s));
                });
        };

        var errorButton = chart.querySelector(consts.ERROR_BUTTON_SELECTOR);
        errorButton.onclick = function (args) {
            common.clearVelues(chart);

            taskAsyncPromise('text').then(
                function () { Windows.UI.Popups.MessageDialog("Done").showAsync(); },
                function (e) { Windows.UI.Popups.MessageDialog("Error: " + e).showAsync(); },
                function (s) {
                    common.setVelues(chart,
                        common.percent(consts.VALUE_FOR_A, s),
                        0,
                        0,
                        0);
                });
        };

        var errorButton2 = chart.querySelector(consts.SECOND_ERROR_BUTTON_SELECTOR);
        errorButton2.onclick = function (args) {
            common.clearVelues(chart);

            var p = taskAsyncPromise(consts.DELAY_IN_SECONDS);
            var q = anotherTaskAsync(true);
            // var p = taskAsyncPromise('text');
            // WinJS.Promise.timeout(4000, p);
            p.then(
                    function() { return anotherTaskAsync(false); },
                    null,
                    function(s) { common.setVelues(chart, common.percent(consts.VALUE_FOR_A, s), 0, 0, 0); }
                ).done(
                    function(r) { Windows.UI.Popups.MessageDialog("OK: " + r).showAsync().done(); },
                    function(e) { Windows.UI.Popups.MessageDialog("Error: " + e).showAsync().done(); }
                );
        };
    }

    function anotherTaskAsync(isSuccess) {
        return new WinJS.Promise(function (c, e, p) {
            if (isSuccess) {
                c("You did it men!");
            }
            else {
                e('Something went wrong!');
            }
        });
    }

    function taskAsyncPromise(timeout) {
        return new WinJS.Promise(function (complete, error, progress) {
            var seconds = 0;
            if (isNaN(timeout)) {
                // throw "Timeout should be a number, but has value: " + timeout;
                error("Timeout should be a number, but has value: " + timeout);
            }
            else {
                var intervalId = window.setInterval(function () {
                    seconds++;
                    progress(seconds);
                    if (seconds >= timeout) {
                        window.clearInterval(intervalId);
                        complete();
                    }
                }, 1000);
            }
        });
    }
})();