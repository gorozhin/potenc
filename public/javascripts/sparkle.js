import * as $ from 'jquery';

export function Sparkle() {
    var e = {
        totalStars: 90,

        verticalSlot: {
            start: 0,
            end: null
        },
        leftSlot: {
            start: 0,
            end: null
        },
        rightSlot: {
            start: null,
            end: null
        },
        starPng: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAQAAACR313BAAAAS0lEQVQYGZXBQRGAIABFwVeCJBIG00AbwkgRKfE8c/kz7sLBQmIlsZE4SJwkPiRuTharze50udXX5XR4e1k4uUlcJE4SO4mNxIs/PsnOKsJwHzXnAAAAAElFTkSuQmCC"
    };
    var b = null;
    var d = [];
    var i = false;
    var k = function(l) {
        f(l);
        c();
        setTimeout(g, 0);
        $(window).on("resize", function() {
            i = false;
            f()
        });
        $(window).on("focus", function() {
            i = false;
            g()
        });
        $(window).on("blur", function() {
            i = true
        })
    };
    var f = function(o) {
        if (typeof o !== "undefined") {
            b = $(o)
        } else {
            if (b === null) {
                b = $("body > div").first()
            }
        }
        var m = b.width();
        var l = $(window).width();
        var n = l;

        e.leftSlot.start = 0;
        e.leftSlot.end = n;
        e.rightSlot.start = n + m;
        e.rightSlot.end = l - 5;
        e.verticalSlot.end = $(window).height() - e.verticalSlot.start
    };
    var c = function() {
        for (var l = 0; l < e.totalStars; l++) {
            h(l)
        }
    };
    var h = function(o) {
        var m = document.createElement("div");
        m.id = "star" + o;
        var n = a();
        m.style.cssText = "position:fixed;width:15px;height:15px;left:" + n.x + "px;top:" + n.y + "px;opacity:1";
        var l = document.createElement("img");
        l.src = e.starPng;
        m.appendChild(l);
        document.body.insertBefore(m, document.body.lastChild);
        d.push(m)
    };
    var a = function() {
        var m = {
            x: null,
            y: null
        };
        var l = Math.random() < 0.5 ? e.leftSlot : e.rightSlot;
        m.x = Math.floor(l.start + Math.random() * (l.end - l.start));
        m.y = Math.floor(e.verticalSlot.start + Math.random() * (e.verticalSlot.end - e.verticalSlot.start));
        return m
    };
    var g = function() {
        var n,
            m = d.length;
        for (n = 0; n < m; n++) {
            j(d[n])
        }
    };
    var j = function(m) {
        var l = 250 + Math.random() * 250;
        $(m).animate({
            opacity: 0
        }, l, function() {
            if (i === true) {
                return
            }
            var n = a();
            n.x -= 7;
            n.y -= 7;
            m.style.cssText = "position:fixed;width:15px;height:15px;left:" + n.x + "px;top:" + n.y + "px;opacity:1";
            j(m)
        })
    };
    return {
        init: k
    }
};

