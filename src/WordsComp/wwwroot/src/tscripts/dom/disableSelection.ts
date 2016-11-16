/// <reference path="../common.ts" />
$(() => {
    // http://stackoverflow.com/questions/2700000/how-to-disable-text-selection-using-jquery
    $('#word, .word-left-item-caption').attr('unselectable','on')
     .css({'-moz-user-select':'-moz-none',
           '-o-user-select':'none',
           '-khtml-user-select':'none', /* you could also put this in a class */
           '-webkit-user-select':'none',/* and add the CSS class here instead */
           '-ms-user-select':'none',
           'user-select':'none'
     }).bind('selectstart', function(){ return false; });
})