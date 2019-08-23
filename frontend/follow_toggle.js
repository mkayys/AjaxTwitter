import APIUtil from './api_util';

class FollowToggle {
    constructor($el) {
        // $el is convention that it is a jQuery object
        this.userId = this.$el.data('user-id');
        this.followState = this.$el.data('initial-follow-state');

        this.$el = $el;

        this.handleClick = this.handleClick.bind(this);

        this.render();
        this.$el.on('click', this.handleClick);
        // don't need to pass in event because the browser will invoke it with the event

        // this.$el.on('click', (event) => {
            // this.handleClick(event);
        //})
    }

    render() {

        if (this.followState === 'unfollowed') {
            this.$el.text('Follow!');
            this.$el.removeProp('disabled');
        } else if (this.followState === "followed") {
            this.$el.text('Unfollow!');
            this.$el.removeProp('disabled');
        } else if (this.followState === "following") {
            this.$el.text('following');
            this.$el.prop('disabled', true)
        } else if (this.followState === "unfollowing") {
            this.$el.text('unfollowing');
            this.$el.prop('disabled', true);
        }
    }

    handleClick(e) {
        // EVENT HANDLER; need to pass in event
        // handle something (naming convention for function) is just a callback to pass in the event listener

        e.preventDefault();
        let method = (this.followState === "followed") ? 'DELETE' : 'POST';

        this.followState = (this.followState === "followed") ? "unfollowing" : "following";
        this.render();

        APIUtil.toggleUser(this.userId, method)
            .then(
                // by the code: 200 successful
                (res) => {
                    this.followState = (this.followState === "following") ? "followed" : "unfollowed";
                    this.render();
                })
            .fail(
                // need a status code!
                (err) => {
                    console.log(':( ');
                }
        );


    }
}

export default FollowToggle;