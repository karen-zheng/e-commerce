//paypal button
paypal.Button.render({
    env: 'sandbox',
    client: {
        sandbox:    'AXJVO5r9QWFH1GLsEfbldQoPoaNLCsFYINaDo42cmqhONdl41gBqqlUY7sYbLda0hHeKNdyrGGpgNt9z',
        production: '<insert production client id>'
    },
    commit: true, // Show a 'Pay Now' button
    payment: function(actions) {
        return actions.payment.create({
            transactions: [
                {
                    amount: { total: calc, currency: 'NZD' }
                }
            ]
        });
    },
    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function() {
            Cookies.remove('cartId');
            window.location = "/";
            // var payment = $(".showPopup");
            // payment.addClass("active");
            // setInterval(revert, 8000);
            // function revert () {
            //     $(".showPopup").removeClass("active");
            // }
        });
    }
}, '#paypal-button');

