var numOfLoads = 0;

var pairs = [["Peru", "Lima"],
             ["Ecuador", "Quito"],
             ["Bolivia", "La Paz"]];

var randIndex = function() {
    return Math.floor(Math.random() * pairs.length);
};

var index;

var clearResults = function() {
    document.getElementById("summaryInfo").style.display = "none";
    document.quizEntry.one = "";
};

function addValueToList(val) {
    $('#valList').append('<option value=\"' + val + '\">' + val + '</option>');
}

var loadValues = function() {

    numOfLoads++;
    index = randIndex();
    
    if (numOfLoads > 1) {
        clearResults();
    }

    // Problem one variables
    document.getElementById("velocity").innerHTML = Math.floor(Math.random() * 10 + 1);
    document.getElementById("distance").innerHTML = Math.floor(Math.random() * 20 + 1);
    document.getElementById("breakPoint").innerHTML = "problem one set";

    // Problem two variables
    var time = (Math.floor(Math.random() * 10 + 1)).toFixed(2);
    document.getElementById("time").innerHTML = time;
    document.getElementById("vf").innerHTML = (1.6 * time).toFixed(2);
    document.getElementById("breakPoint").innerHTML = "problem two set";    

    // Problem three variables
    document.getElementById("country").innerHTML = pairs[index][0];
    if (numOfLoads === 1) {
        for (i = 0; i < pairs.length; i++) {
            addValueToList(pairs[i][1]);
        }
    }
    document.getElementById("breakPoint").innerHTML = "problem three set";
};

window.onload = function() {
    loadValues();
};

var calcVelocity = function(v, d) {
    if (v === 0) {
        return 0;
    } else {
        return d / v;
    }
};

var calcAccel = function(vf, vi, t) {
    return (vf - vi) / t;
};

var mean = function(num1, num2) {
    return (num1 + num2) / 2.0;
};

var percentDiff = function(num1, num2) {
    return Math.abs(num1 - num2) / mean(num1,num2);
};

var isTrue = function(val1, val2) {
    if (isNaN(val1) || isNaN(val2)) {
        // if not numbers, string compare
        return (val1 === val2);
    } else {
        // if numbers, is it less than a 5% percent difference
        return (percentDiff(val1, val2) < 0.05);
    }
};

var submit = function() {

    // Populate answers
    var answers = [calcVelocity(Number(document.getElementById("velocity").innerHTML), Number(document.getElementById("distance").innerHTML)),
                   calcAccel(Number(document.getElementById("vf").innerHTML), 0.0, Number(document.getElementById("time").innerHTML)),
                   pairs[index][1]];
    
    document.getElementById("breakPoint").innerHTML = "answers stored";

    // Populate user responses
    var responses = [Number(document.quizEntry.one.value),
                     Number(document.quizEntry.two.value),
                     document.quizEntry.three.value];

    document.getElementById("breakPoint").innerHTML = "responses stored";

    // Summary data to print to screen
    var summaryInfoData = "";

    document.getElementById("summaryInfo").style.display = "block";

    for (i = 0; i < responses.length; i++) {

        if (isTrue(responses[i],answers[i])) {
            summaryInfoData += "<p class=\"correct\">";
        } else {
            summaryInfoData += "<p class=\"wrong\">";
        }
        summaryInfoData += (i+1) + ". <span class=\"response\">" + responses[i] + "</span> is <span class=\"rightwrong\">";

        if (isTrue(responses[i],answers[i])) {
            summaryInfoData += "Correct!";
        } else {
            summaryInfoData += "Wrong!";
        }
        summaryInfoData += "</span> (" + answers[i] + ")</p>";
    }
    document.getElementById("summaryInfo").innerHTML = summaryInfoData;
};
