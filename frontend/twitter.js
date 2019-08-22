import FollowToggle from './follow_toggle';

$(() => {
    let $buttons = Array.from($('button.follow-toggle'));
    // wrapped in a jQuery object but then the individual buttons are not jQuery objects

    $buttons.forEach( (button) => {
        new FollowToggle($(button));
    })
});