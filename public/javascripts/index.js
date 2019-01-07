let svg = require('svg.js');
let axios = require('axios');
let Sparkle = require('./sparkle').Sparkle;
let dots = [];

function coord (draw) {
    let h = draw.node.clientHeight;
    let w = draw.node.clientWidth;

    for (let i = 0; i <= w; i += w/10){
        draw.line(0, 0, 0, h).stroke({ width: 1,  color: '#F5F5F5'}).move(i, 0);
    }

    for (let i = 0; i <= h; i += h/10){
         draw.line(0, 0, w, 0).stroke({ width: 1,  color: '#F5F5F5'}).move(0, i);
    }
}

function printDot(draw, dot, d){
    d = d || 5;
    let h = draw.node.clientHeight;
    let w = draw.node.clientWidth;

    draw.circle(d).move(dot.x*w, (1-dot.y)*h).fill(dot.class ? '#ff5a8b' : '#4bb6ff');
}

function metrics(d1, d2) {
    let dx = d1.x - d2.x;
    let dy = d1.y - d2.y;

    return Math.sqrt(dx ** 2 + dy ** 2);
}


function defaultKernel(ro) {
    return 1 / (ro + 1);
}

function H(dot){
    return 0.1
}

function classify (dots, newDot, K, h){
    function gamma(dot){
        return 1 / metrics(newDot, dot);
    }


    dots.sort((x, y) => {
        let mx = metrics(newDot, x);
        let my = metrics(newDot, y);

        if (mx < my) return -1;
        else if (my < mx) return 1;
        else return 0;
    });


    let classes = [0, 0];

    for (let i = 0; i < dots.length; ++i) {
        let dot = dots[i];

        let score = gamma(dot) * K(metrics(newDot, dot) / h(dot));

        if (score == 0) {
            break;
        }

        classes[dot.class] += score;
    }

    let maxI = 0;
    let maxV = classes[maxI];

    for (let i = 0; i < classes.length; ++i){
        if (classes[i] > maxV) {
            maxV = classes[i];
            maxI = i;
        }
    }

    return maxI;
}

window.addEventListener('load', async () => {

    let res = await axios.get('/sample');
    let kInput = document.getElementById('kInput');
    dots = res.data;

    let draw = svg('drawing').size(1000, 1000);
    coord(draw);

    document.getElementById('clear').addEventListener('click', () => {
        draw.clear();
        coord(draw);

        dots.forEach(dot => {
                printDot(draw, dot);
         });
    });


    document.getElementById('fill').addEventListener('click', () => {
        draw.clear();
        coord(draw);
        let h = draw.node.clientHeight;
        let w = draw.node.clientWidth;
            for (let x = 0; x <= w; x += 10) {

                    for (let y = 0; y <= h; y += 10) {
                        let newDot = {
                            x: x / w,
                            y: 1 - (y / h),
                        };

                        newDot.class = classify(dots, newDot, defaultKernel, H);
                        printDot(draw, newDot);
                    }
            }

    });

    document.getElementById('sparkles').addEventListener('click', () => {
        var sparkle = new Sparkle();
        sparkle.init('#wrapper');
    });

    dots.forEach(dot => {
        printDot(draw, dot);
    });

    draw.node.addEventListener('click', function (e) {
        let newDot = {
            x : e.offsetX / draw.node.clientWidth,
            y : (1 - e.offsetY / draw.node.clientHeight),
        };

        newDot.class = classify(dots, newDot, defaultKernel, H);
        printDot(draw, newDot);

    });



    //console.log(draw);
});
