/// <reference path="../common.ts" />
/// <reference path="../app.ts" />
interface Point {
    x: number;
    y: number;
};

// App.GetApp().animation('.words-left-item', function():angular.animate.IAnimateCallbackObject {
//     return {
//         leave: function(element: JQuery, done: Function) {
//             let $element = $(element);
//             var targetPos = getWordContainerPostion();
//             // $element.animate({
//             //     opasity: 0,
//             //     top: targetPos.y,
//             //     left: targetPos.x
//             // }, done);
//             done();

//             return function(isCancelled: boolean) {
//                 if (isCancelled) {
//                     $element.stop();
//                 }
//             }
//         }
//     };
// })


function getWordContainerPostion(): Point {
    let $element = $('#word-element');

    return {
        x: $element.offset().left,
        y: $element.offset().top
    }
}