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
});