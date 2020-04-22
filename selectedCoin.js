"use strict";

$(function(){

    let selectedBtn = []

    // Saving selected currencies into localstorage
    window.storeSelectedCurrency = function (coins) {
    
        // Get number of checkbox and switch true or false
        $("input[class^='checkBox']").click(function(){
                
            let numberCheckBox = $(this).attr("value");

            selectedBtn = []
        
            // Get current coin
            function getItem() {
                for (const obj of coins) {
                    const item = obj[numberCheckBox]
                    return item
                }
            }
            const coin = getItem()

            // Insert coin to localstorage or remove if it's already inside
            let previousSelected = localStorage.getItem("selected")

            // If localstorage is empty immediately insert coin
            if (previousSelected === undefined || previousSelected.length === 2) {

                console.log('here')
                coin.index = numberCheckBox
                selectedBtn.push(coin)
                localStorage.setItem("selected", JSON.stringify(selectedBtn));
                
            }
            else {
            
                // Check if item already in localstorage 
                const previousCoins = JSON.parse(previousSelected);
                const checkDouble = previousCoins.find( c => c.id === coin.id);
            
                // If no, add to localstorage ; if yes, delete
                if (checkDouble === undefined) {

                    // Keep max num of check box Up to 5 choices
                    function objectLength(arr) {
                        let result = 0;
                        for(let obj in arr) {
                          if (arr.hasOwnProperty(obj)) {
                            result++;
                          }
                        }
                        return result;
                      }
                      
                    const count = objectLength(previousCoins);
                    if (count < 5) {
                        for (const item of previousCoins) {
                            selectedBtn.push(item);
                        }
                    
                        for (const obj of coins) {
                            obj[numberCheckBox].index = numberCheckBox
                            selectedBtn.push(obj[numberCheckBox]);
                            localStorage.setItem("selected", JSON.stringify(selectedBtn));
                        }
                    } else {    
                        // Call function that popup modal
                        coin.index = numberCheckBox
                        upFiveChoices (previousCoins, coin);
                    }    

                } else {
                    const indexArr = previousCoins.findIndex( c => c.id === coin.id);
                    previousCoins.splice(indexArr, 1)
                    for (const item of previousCoins) {
                        selectedBtn.push(item);
                    }
                    localStorage.setItem("selected", JSON.stringify(selectedBtn));
                }
            }
        
        });
    }

    // Keep selected's button turn on, even user refresh or go to other page and back
    window.keepSelectedButton = function () {
        const jsonSelectedButton = localStorage.getItem("selected")
        const selectedButton = JSON.parse(jsonSelectedButton)
        
        // If selectedButton isn't exist, create arr and push it to localstorage
        if (selectedButton === undefined || selectedButton === null) {
            const selectedBtn = []
            localStorage.setItem("selected", JSON.stringify(selectedBtn))
        } else {
            // Get current checkBox
            for (const checkBox of selectedButton) {
                const numCheckBox = checkBox.index
                $(".checkBox"+numCheckBox).prop("checked", true)
            }            
        }
        
    }

});