/// <reference path="../common.ts" />
$(() => {
    $('#user2variants').bind('DOMNodeInserted', () => ($('.translateVariant.nohover') as any).tooltip());
});