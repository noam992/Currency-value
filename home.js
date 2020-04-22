"use strict";

$(function(){

    // When the page is upload it's show all the coins
    $(document).ready(() => {
        $('#inputBox').val(''); // clear input box
        showCoins()
    });

    // Press on home button to show all the coins
    $("#homePage").on("click", () => {
        $('#inputBox').val(''); // clear input box
        showCoins()
    });
    
    // Searcing specific coin
    $(".searchBtn").on("click", () => {

        const valueInput = $("#inputBox").val(); // Get content that user insert 

        // User isn't insert value
        if (valueInput === "") {

            // Show message for 7 min and go back to home page
            const messageError = '<h3 class="errorMessage">You have not entered any name of coin</h3>'
            $("#getDetailOfCoin").html(messageError);

            setTimeout(()=>{
                $(document).ready(() => {
                    showCoins()
                });
            }, 5000);

        }else{
            showCoins(valueInput)
        }
    })

});
