(function () {
    "use strict";

    var common = new Common();
    var consts = new Consts();

    WinJS.UI.Pages.define("/pages/chaining.html", {
        ready: function (element, options) {

            var chart = element.querySelector(consts.FIRST_CHART_SELECTOR);

            setupShowButton(chart);
            setupGroupButton(chart);
        }
    });

    function taskAsyncPromise(value) {
        return new WinJS.Promise(function (complete, error, progress) {
            var seconds = 0;
            if (isNaN(value))
            {
                throw "Value must be a number!";
            }
            var intervalId = window.setInterval(function () {
                seconds++;
                var v = common.percent(value, seconds);
                progress(v);
                if (seconds >= consts.DELAY_IN_SECONDS) {
                    window.clearInterval(intervalId);
                    complete();
                }
            }, 1000);
        });
    }

    function setupShowButton(chart)
    {
        var button = chart.querySelector(consts.BUTTON_SELECTOR);
        button.onclick = function (e) {
            common.clearVelues(chart);

            common.disableButton(button);
            taskAsyncPromise(consts.VALUE_FOR_A)
                .then(function () { return taskAsyncPromise(consts.VALUE_FOR_B); },
                    null,
                    function (v) { common.setVelues(chart, v, 0, 0, 0); }
                )
                .then(function () { return taskAsyncPromise(consts.VALUE_FOR_C); },
                    null,
                    function (v) { common.setVelues(chart, 0, v, 0, 0); }
                )
                .then(function () { return taskAsyncPromise(consts.VALUE_FOR_D); },
                    null,
                    function (v) { common.setVelues(chart, 0, 0, v, 0); }
                )
                .done(function () { common.enableButton(button) },
                    null,
                    function (v) { common.setVelues(chart, 0, 0, 0, v); }
                )
        }
    }

    function setupGroupButton(chart) {
        var button = chart.querySelector(consts.GROUP_BUTTON_SELECTOR);
        button.onclick = function (e) {
            common.clearVelues(chart);
            common.disableButton(button);

            var promises = {
                p1: taskAsyncPromise(consts.VALUE_FOR_A),
                p2: taskAsyncPromise(consts.VALUE_FOR_B),
                p3: taskAsyncPromise(consts.VALUE_FOR_C),
                p4: taskAsyncPromise(consts.VALUE_FOR_D)
            };

            WinJS.Promise.join(promises)
                .then(function () { common.enableButton(button); },
                    function (e) { Windows.UI.Popups.MessageDialog(e.p3).showAsync(); },
                    function (v) { common.setVelues(chart, v.p1, v.p2, v.p3, v.p4); }
                );
        }
    }
})();