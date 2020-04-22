"use strict";

$(function(){    
    
    // Keep max num of check box Up to 5 choices
    window.upFiveChoices = function (arrSelected, currentCoin) {

        // Prevent modal from closing when clicking outside
        $('.modal').modal({
            backdrop: 'static',
            keyboard: false
        });


        $(".note").html("") // clear note box 

        // header modal
        let headerModal = ""
        headerModal = `<span> For adding coin 
                        <span class="coinTitle">${currentCoin.id}</span>
                        , please remove become less one item
                    </span>`
        $(".modal-title").html(headerModal)


        // body modal
        let bodyTableModal = ""
        arrSelected.forEach( function (currentCurrency, index){
            let tr = `<tr>
                        <td>${index + 1}</td>
                        <td>${currentCurrency.id}</td>
                        <td>
                            <div class="btnDivModal">
                                <label class="switchModal">
                                    <input class="checkBoxModal${currentCurrency.index}" type="checkbox" value="${currentCurrency.index}" checked>
                                    <span class="slider round"></span>
                                </label>
                            </div>
                        </td>
                    </tr>`

                bodyTableModal += tr
        });
        $(".contentModal").html(bodyTableModal);


        // Show modal
        $('.modal').modal('show');


        // Equal chances in modal to main page
        $("input[class^='checkBoxModal']").click(function(){

            let numberCheckBoxModal = $(this).attr("value");
            
            $(".checkBoxModal"+numberCheckBoxModal).change(function () {
                const resultBoolean = $(".checkBoxModal"+numberCheckBoxModal).prop("checked");
                $(".checkBox"+numberCheckBoxModal).prop("checked", resultBoolean);

            });

        });
        
        
        // Use buttons to save changes or cancel changes
        // Save change by click confirm button
        $(".btn.btn-primary").click(function () {

            const modalCoins = []
            arrSelected.forEach(function (coin) {
                if ($(".checkBoxModal"+coin.index).is(":checked") === true || $(".checkBox"+coin.index).is(":checked") === true) {
                    modalCoins.push(coin)
                }
            })

            // If user don't cancel any coin, he will not be able to get out from modal by confirm button
            if (modalCoins.length > 4) {
                $(".note").html("You have select five coins at the same time, if would you still like to add the last one, Please turn off one or more coins from the list");

                $('.modal').modal('show');
            } else {
                modalCoins.push(currentCoin)
                localStorage.setItem("selected", JSON.stringify(modalCoins));

                $('.modal').modal('hide');
            }

        });

        // Get out from modal by click close button, don't save changes
        $(".btn.btn-secondary").click(function () {
            arrSelected.forEach( co => $(".checkBox"+co.index).prop("checked", true))
            $(".checkBox"+currentCoin.index).prop("checked", false)

            arrSelected.forEach( co => $(".checkBoxModal"+co.index).prop("checked", true))
            $(".checkBoxModal"+currentCoin.index).prop("checked", false)

            localStorage.setItem("selected", JSON.stringify(arrSelected));

            $('.modal').modal('hide');
        });
    
    }

});