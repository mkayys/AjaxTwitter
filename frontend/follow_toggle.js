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
            this.$el.text('Follow!');

        } else {
            this.$el.text('Unfollow!');
        }
    }

    handleClick(e) {
        // handle something (naming convention for function) is just a callback to pass in the event listener

        e.preventDefault();
        let method = (this.followState === "followed") ? 'DELETE' : 'POST';

        return $.ajax({
            method: method,
            url: `/users/${this.userId}/follow`,
            dataType: 'JSON'
        }).then(
            // by the code: 200 successful
            (res) => {
                (this.followState === "followed") ? "unfollowed" : "followed";
                this.render();
            }
        ).fail(
            // need a status code!
            (err) => {
                console.log('your code broke son');
            }
        );




    }
}

export default FollowToggle;