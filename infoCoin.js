"use strict";

$(function(){

    // Information about coin
    window.callButtonInfo = function (coins) {
            
        // By click show/hide the info of coin 
        $("button[class$='success']").click(function(){
        
            // Get value of this button 
            let numberButton = $(this).attr("value");
            
            // check if the coin is already inside localstorage  
            const result = localStorage.getItem(numberButton);
            
            if (result === null) {
                getInfoFromAPI(coins, numberButton);
            } else {
                getInfoFromLocalstoreage(result, numberButton);
            }
            $(".moreInfoBox"+numberButton).toggle();
        
        })
    
    }
    
    // Required info from localstorage and print on div
    window.getInfoFromLocalstoreage = function(coinObj, num) {
        
        const coin = JSON.parse(coinObj)
    
        let div = `<div class="infoBox">
                    <div><img src=${coin.img}></div>
                    <div class="usd">USD: ${coin.usd}$</div>
                    <div class="eur">EUR: ${coin.eur}&#8364</div>
                    <div class="ils">ILS: ${coin.ils}&#8362</div>
                </div>`
        
        $(".moreInfoBox"+num).html(div);
    
    }
    
    // Required info from API and print on div 
    window.getInfoFromAPI = function (coins, num) {
        
        for (const obj of coins) {
            const item = obj[num]

            // Require info for specific coin and display
            $.ajax({
                url: "https://api.coingecko.com/api/v3/coins/" + item.id,
                error: err => ("Error: " + err.status),
                success: infoCoin => {
                
                    const img = infoCoin.image.small
                    const usd = infoCoin.market_data.current_price.usd
                    const eur = infoCoin.market_data.current_price.eur
                    const ils = infoCoin.market_data.current_price.ils
                
                    let div = `<div class="infoBox">
                                <div><img src=${img}></div>
                                <div class="usd">USD: ${usd}$</div>
                                <div class="eur">EUR: ${eur}&#8364</div>
                                <div class="ils">ILS: ${ils}&#8362</div>
                            </div>`
                
                    $(".moreInfoBox"+num).html(div);
                
                    const coin = {
                        img: img,
                        usd: usd,
                        eur: eur,
                        ils: ils
                    }
                
                    // store coin for a period of two minutes into localtroage
                    localStorage.setItem(num , JSON.stringify(coin));
                    setTimeout(()=>{
                        localStorage.getItem(num);
                        localStorage.removeItem(num);
                    }, 120000);
                
                }
            });
        
        }
    
    }

});