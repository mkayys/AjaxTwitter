class FollowToggle {
    constructor($el) {
        // $el is convention that it is a jQuery object
        this.userId = $el.data('user-id');
        this.followState = $el.data('initial-follow-state');

        this.$el = $el;

        this.render();
    }

    render() {
        if (this.followState === 'unfollowed') {
            this.$el.text('Follow');

        } else {
            this.$el.text('Unfollow');
        }
    }
}

export default FollowToggle;