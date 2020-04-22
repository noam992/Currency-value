"use strict";

$(function(){

    let coinsGroup = [];
    
    window.showCoins = function (specificCoin) {

        // Clear a div that will be contain coins
        $("#getDetailOfCoin").empty();

        // Progress bar
        let clientid=$("#getDetailOfCoin").val();
        $('#loadingmessage').show();

        getCoins(specificCoin)
            .then( coins => {

                let getCoinsGroup = coinsGroup

                // Print details into html
                $("#getDetailOfCoin").html(coins);
                callButtonInfo (getCoinsGroup);
                storeSelectedCurrency(getCoinsGroup);
                keepSelectedButton ();
            })
            .catch(() => {
                
                $("#getDetailOfCoin").empty(); // Clear a div that will be cointain coins
                $('#inputBox').val(''); // clear input box

                // Show message for 5 min and go back to home page
                const messageError = '<h3 class="errorMessage">The information you are searching for is not exist</h3>'

                $("#getDetailOfCoin").html(messageError);

                setTimeout(()=>{
                    $(document).ready(() => {
                        showCoins()
                    });
                }, 5000);

            })
       
        function getCoins(sCoin) {
            
            // If the argument is contain value, go to search specific coin, if not return all the list
            if (sCoin === undefined) {

                return new Promise((resolve, reject) => {
                    $.ajax({
                        url: "https://api.coingecko.com/api/v3/coins/list",
                        data:"title="+clientid,
                        success: coins => {

                            // Hide progress bar
                            $('#loadingmessage').hide();

                            coinsGroup = [];
                            coinsGroup.push(coins)

                            let areaCoins = ""
                            /*Creat div for each coin */
                            for (const [index, coin] of coins.entries()) {
                                let div = `
                                        <div class="boxCoin">
                                            <div class="showIdCoin"><h4>${coin.symbol}</h4></div>
                                            <div class="btnDiv">
                                                <label class="switch">
                                                    <input class="checkBox${index}" type="checkbox" value="${index}">
                                                    <span id="slider${index}" class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="showNameCoin">${coin.name}</div><br>
                                            <button class="btn btn-success" value="${index}">More info</button>
                                            <div class="moreInfoBox${index}" id="moreInfoBox"></div>
                                        </div>`
                                areaCoins += div

                                /*Get loop out when the count is 100 coins*/
                                if ( index === 99 ) {
                                    break;
                                }
                            }
                            resolve(areaCoins)
                        },
                        error: () => reject()
                    });
                });

            } else {

                // convert variable "symbol" to "id" for ajax search 
                for (const itemCoin of coinsGroup) {
                    const userCoin = itemCoin.find( c => c.symbol === sCoin)

                    // Get specific coin by user searching
                    return new Promise((resolve, reject) => {
                        $.ajax({
                                url: "https://api.coingecko.com/api/v3/coins/"+userCoin.id,
                                data:"title="+clientid,
                                success: coin => {

                                // Hide progress bar
                                $('#loadingmessage').hide();

                                // Get coins from arr
                                for (const obj of coinsGroup) {
                                    const position = obj.findIndex( n => n.id === userCoin.id);

                                    // Creat div for each coin 
                                    let div = `
                                            <div class="boxCoin">
                                                <div class="showIdCoin"><h4>${coin.symbol}</h4></div>
                                                <div class="btnDiv">
                                                    <label class="switch">
                                                        <input class="checkBox${position}" type="checkbox" value="${position}">
                                                        <span id="slider${position}" class="slider round"></span>
                                                    </label>
                                                </div>
                                                <div class="showNameCoin">${coin.name}</div><br>
                                                <button class="btn btn-success" value="${position}">More info</button>
                                                <div class="moreInfoBox${position}" id="moreInfoBox"></div>
                                            </div>`

                                    resolve(div);
                                }
                            },
                            error: () => reject()
                        });
                    });
                }     
            }
        }
    }
});