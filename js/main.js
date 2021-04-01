// DATASETS

// Global variable with 1198 pizza deliveries
// console.log(deliveryData);

// Global variable with 200 customer feedbacks
// console.log(feedbackData.length);


// FILTER DATA, THEN DISPLAY SUMMARY OF DATA & BAR CHART
function dataManipulation() {
    createVisualization();
}

createVisualization();

function createVisualization() {
    var delivery = deliveryData;
    var feedback = feedbackData;

    let selectBox1 = document.getElementById("area");
    let selectedValue1 = selectBox1.options[selectBox1.selectedIndex].value;

    let selectBox2 = document.getElementById("order");
    let selectedValue2 = selectBox2.options[selectBox2.selectedIndex].value;



    let selection1 = delivery.filter(checkArea);

    function checkArea(value) {
        return value.area == selectedValue1;
    }

    if (selectedValue1 == "all") {
        selection1 = delivery;
    }

    let selection2 = selection1.filter(checkOrder);

    function checkOrder(value) {
        return value.order_type == selectedValue2;
    }

    if (selectedValue2 == "all") {
        selection2 = selection1;
    }

    selection2.sort(function (a, b) {
        return a.delivery_id - b.delivery_id;
    });

    renderBarChart(selection2)
    var selectionFilter = selection2.map(idS => {
        return idS.delivery_id;
    });
    var feedbackFinal = feedback.filter(idF => selectionFilter.includes(idF.delivery_id));


    let sumOfTime = 0;
    let countOfP = 0;
    let totalSales = 0;
    let numberOfDeiveries = selection2.length;
    for (let i = 0; i < numberOfDeiveries; i++) {

        sumOfTime = sumOfTime + selection2[i].delivery_time;
        totalSales = totalSales + selection2[i].price;
        countOfP = countOfP + selection2[i].count;

    }
    let averageTime = sumOfTime / numberOfDeiveries;

    let numberOfFeedback = feedback.length;

    var lowQuality = feedback.filter(function (quality11) {
        return quality11.quality === "low";
    });

    var mediumQuality = feedback.filter(function (quality22) {
        return quality22.quality === "medium";
    });
    var highQuality = feedback.filter(function (quality33) {
        return quality33.quality === "high";
    });
    var a = "<b>Number of pizza deliveries</b>: " + numberOfDeiveries + "<br>";
    var b = "<b>Number of all delivered pizzas (count)</b>: " + countOfP + "<br>";
    var c = "<b>Average delivery time: </b>" + averageTime + "<br>";
    var d = "<b>Total sales in USD:</b> $" + totalSales + "<br>";
    var e = "<b>Number of all feedback entries:</b> " + numberOfFeedback + "<br>";
    var f = "There are " + lowQuality.length + " <b>low feedbacks</b>, " + mediumQuality.length + " <b>medium feedbacks</b> and " + highQuality.length + " <b>high feedbacks</b>." + "<br>";


    var summaries = a + b + c + d + e + f;

    document.getElementById("summary").innerHTML = summaries;

    var tableFilter = feedbackFinal.map(idS => {
        return idS.delivery_id;
    });
    var dataTableFinal = selection2.filter(idF => tableFilter.includes(idF.delivery_id));
    var datatable = "<tr>";
    for (var i = 0; i < numberOfFeedback; i++) {
        var datatable =
            datatable +
            "<td>" + dataTableFinal[i].delivery_id + "</td>" +
            "<td>" + dataTableFinal[i].area + "</td>" +
            "<td>" + dataTableFinal[i].delivery_time + "</td>" +
            "<td>" + dataTableFinal[i].driver + "</td>" +
            "<td>" + dataTableFinal[i].count + "</td>" +
            "<td>" + feedbackFinal[i].punctuality + "</td>" +
            "<td>" + feedbackFinal[i].quality + "</td>" +
            "<td>" + feedbackFinal[i].wrong_pizza + "</td></tr>"
    }
    document.getElementById("dataTable").innerHTML = datatable;

    /* ************************************************************
     *
     * ADD YOUR CODE HERE
     * (accordingly to the instructions in the HW2 assignment)
     * 
     * 1) Filter data
     * 2) Display key figures
     * 3) Display bar chart
     * 4) React to user input and start with (1)
     *
     * ************************************************************/

}
