"use strict";

$(function(){


    $("#reportPage").click(() => {

        $("#getDetailOfCoin").empty(); // Clear div

        //Check if array is empty to print message, if not print report
        let previousSelected = localStorage.getItem("selected")
        if (previousSelected === undefined || previousSelected.length === 2) {

            // Show message for 5 min and go back to home page
            const messageError = '<h3 class="errorMessage">Please collect coins to show report</h3>'
            $("#getDetailOfCoin").html(messageError);

            setTimeout(()=>{
                $(document).ready(() => {
                    showCoins()
                });
            }, 5000);

        } else {
            
            // Print report
            let html = `<div id="chartContainer" style="height: 370px; width: 100%;"></div>`;

            $("#getDetailOfCoin").append(html);
    
            report()
        }
    });

    window.report = function () {

        // Get selected coins from localstorage
        const jsonSelectedCoins = localStorage.getItem("selected");
        const selectedCoins = JSON.parse(jsonSelectedCoins);

        // create arr as number of selected coins that will contain data of chart
        const dataPointsArr = [] 
        for (let i = 0; i < selectedCoins.length; i++) {
            let dataPoints = [];
            dataPointsArr.push(dataPoints)
        }

        let dataArr = []
        for (let i = 0; i < selectedCoins.length; i++) {
            let date = { 
                type: "line",
                xValueType: "dateTime",
                yValueFormatString: "####.00000000",
                xValueFormatString: "hh:mm:ss TT",
                showInLegend: true,
                name: selectedCoins[i].symbol,
            }
            dataArr.push(date)
        }

        // chart container
        const chart = new CanvasJS.Chart("chartContainer", {
            zoomEnabled: true,
            title: {
                text: "Report currency value to USD"
            },
            axisX: {
                title: "chart updates every 2 secs"
            },
            axisY:{
                prefix: "$",
                includeZero: false
            }, 
            toolTip: {
                shared: true
            },
            legend: {
                cursor:"pointer",
                verticalAlign: "top",
                fontSize: 22,
                fontColor: "dimGrey",
                itemclick : toggleDataSeries
            },
            data: dataArr
        });
        
        function toggleDataSeries(e) {
            if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                e.dataSeries.visible = false;
            }
            else {
                e.dataSeries.visible = true;
            }
            chart.render();
        }
        
        let updateInterval = 2000;
        let time = new Date;
        
        function updateChart(count) {

            // Get selected coins from localstorage
            const jsonSelectedCoins = localStorage.getItem("selected");
            const selectedCoins = JSON.parse(jsonSelectedCoins);

            getDetailOnSelectedCoins(selectedCoins)
            .then(info => {

                count = count || 1;
                for (let i = 0; i < count; i++) {
                    time.setTime(time.getTime()+ updateInterval);
                   
                    // pushing the new values
                    for ( let num = 0; num < selectedCoins.length; num++ ) {
                        dataArr[num].dataPoints = dataPointsArr[num]
                        dataPointsArr[num].push({
                            x: time.getTime(),
                            y: info[num]
                        })  
                    }
                
                }

                // updating legend text with  updated with y Value
                for (let number = 0; number < selectedCoins.length; number++) {
                    chart.options.data[number].legendText = selectedCoins[number].symbol+ ": " + info[number] + " $";
                }
                
                chart.render();

            })
            .catch(err => alert("Error: " + err.status));

        }
        // generates first set of dataPoints 
        updateChart(2);	
        setInterval(function(){updateChart()}, updateInterval);
        
    }


    // Get details from API about selected coins
    window.getDetailOnSelectedCoins = function (selectedCoins) {

        // Create one string include name's symbol of each coin selected
        let stringNameSymbol = "" 
        for (const element of selectedCoins) {
            stringNameSymbol += element.symbol + ","
        }

        return new Promise((resolve, reject) => {
                $.ajax({
                    url: "https://min-api.cryptocompare.com/data/pricemulti?fsyms=" + stringNameSymbol + "&tsyms=USD",
                    error: err => reject(err),
                    success: coins => {

                        const arrCurrency = []
                        for (const key in coins) {
                            arrCurrency.push(coins[key].USD)
                        }
                        resolve(arrCurrency)
                    }
                });
        });
    }

});
