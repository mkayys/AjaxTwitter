import FollowToggle from './follow_toggle';

// document ready callback => it gets run when the DOMContentLoaded
// it's important because we need everything to exist before we manipulate it

$(() => {
    let $buttons = Array.from($('button.follow-toggle'));
    // wrapped in a jQuery object but then the individual buttons are not jQuery objects

    $buttons.forEach( (button) => {
        new FollowToggle($(button));
    })
});