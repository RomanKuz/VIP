/// <reference path="../common.ts" />
$(() => {
    $(document).keypress(e => {
        if (e.which === 13) {
            $(".btn-submit:visible").first().click();
        } else if (e.which >= 48 && e.which <= 57) {
            let numPressed = e.which - 48;
            $('.translateVariant:visible').filter((index, elem) => $(elem).data('order') === numPressed)
                .first()
                .click();
        }
    });

    $('button').tooltip({
    trigger: 'click',
    placement: 'bottom'
    });

    function setTooltip(btn, message) {
    $(btn).tooltip('hide')
        .attr('data-original-title', message)
        .tooltip('show');
    }

    function hideTooltip(btn) {
    setTimeout(function() {
        $(btn).tooltip('hide');
    }, 1000);
    }

    var clipboard = new clipboard.Clipboard('#copyToClipboardBtn');
    clipboard.on('success', function(e) {
        setTooltip(e.trigger, 'Copied!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function(e) {
        console.log(e);
    });
});