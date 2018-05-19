var ctx = document.getElementById("myChart");

var chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            pointRadius: 0
        }]
    },
    options: {
        title: {
            display: true,
            text: "This chart should never be seen..."
        },
        elements: {
            line: {
                fill: false
            }
        }
    }
});

chart.update();

document.getElementById("xMin").value = 0
document.getElementById("xMax").value = 10
document.getElementById("n").value = 20
updateGraph()

function updateGraph() {
    var x;
    var holdRange = [];
    var holdData = [];
    var answer = 0;
    var xMax = parseInt(document.getElementById("xMax").value);
    var xMin = parseInt(document.getElementById("xMin").value);
    var n = parseInt(document.getElementById("n").value);
    var eq = eqParser(document.getElementById("equation").value);
    var spacer = (xMax - xMin) / n;
    
    console.log("The equation is: " + eq);
    
    for (c = 0; c < n; c++) {
        holdRange.push(c * spacer + xMin);
        x = c * spacer + xMin;
        holdData.push(eval(eq) * spacer);
        answer += Math.abs(eval(eq) * spacer);
    }

    document.getElementById("answer").innerText = answer;

    chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: holdRange,
            datasets: [{
                label: 'Value at x',
                data: holdData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                pointRadius: 0
            }]
        },
        options: {
            title: {
                display: true,
                text: "This graph dosen't really accurately represent this, so probably best to ignore it..."
            },
            elements: {
                line: {
                    fill: false
                }
            }
        }
    });
}

function deleteEquation(id) {
    document.getElementById("equation").value = "";
}

function eqParser(eq) {

    for (i = 0; i < eq.length; i++) {
        if (eq.substring(i, i + 3).toLowerCase() === ("sin") || eq.substring(i, i + 3).toLowerCase() === ("cos")
            || eq.substring(i, i + 3).toLowerCase() === ("tan") || eq.substring(i, i + 3).toLowerCase() === ("log")) {

            eq = eq.substring(i - 3, i) === ("arc") ? eq.substring(0, i - 3) + "Math.a" + eq.substring(i) : eq.substring(0, i) + "Math." + eq.substring(i);
            i += 6;
        }
    }

    for (i = 0; i < eq.length; i++) {
        if (eq.substring(i, i + 3).toLowerCase() === ("sec")) {
            eq = eq.substring(0, i) + "1/Math.cos" + eq.substring(i + 3);
            i += 3;
        }

        else if (eq.substring(i, i + 3).toLowerCase() === ("csc")) {
            eq = eq.substring(0, i) + "1/Math.sin" + eq.substring(i + 3);
            i += 3;
        }

        else if (eq.substring(i, i + 3).toLowerCase() === ("cot")) {
            eq = eq.substring(0, i) + "1/Math.tan" + eq.substring(i + 3);
            i += 3;
        }
    }

    while (eq.indexOf("^") != -1) {
        eq = eq.substring(0, eq.indexOf("^")) + "**" + eq.substring(eq.indexOf("^") + 1);
    }

    return eq;
}
