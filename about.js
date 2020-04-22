"use strict";

$(function(){

    $("#aboutPage").click(() => { 
        $("#getDetailOfCoin").empty(); // div מרוקן את ה
        let html = `<div class="aboutPage">
                        <div class="identify">
                            <h2>Cryptonite - Value of currency</h2>
                            <h4>noam konja</h4>
                        </div><br />
                	    <p class="explainProject">
                            The application let you find all the currency in the world, and show you the value of it in USD, EUR and ILS.
                            By pressing the 'More Info' button which located in each of the currency brackets, you could see the current value of the specific currency in comparison to USD, EUR & ILS.
                            By using the 'Report' feature you could see the current status of the  currency in compare to USD value. The data updates every two seconds and is shown on a useful graph.
                            In order to choose the specific currency for the 'Report' feature,  you need to turn the button on or off from the brackets
                        </p><br /><br />
                        <img src="./assets/Img/me.jpg" alt="photo-of-myself" class="image" />
                    </div>`;

        $("#getDetailOfCoin").append(html);
        
    });

})