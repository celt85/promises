function Common()
{
    var consts = new Consts();

    this.setVelues = function (element, a, b, c, d) {
        element.querySelector(".A").value = a;
        element.querySelector(".B").value = b;
        element.querySelector(".C").value = c;
        element.querySelector(".D").value = d;
    }

    this.clearVelues = function(element) {
        this.setVelues(element, 0, 0, 0, 0);
    }

    this.delay = function(time) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + time);
    }

    this.percent = function(value, part) {
        // var ratio = Math.round(Math.random(), 2);
        return (value / consts.DELAY_IN_SECONDS) * part;
    }

    this.disableButton = function(button) {
        button.disabled = "disabled";
    }

    this.enableButton = function(button) {
        button.disabled = "";
    }
}