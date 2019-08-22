class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.input = $('#search-text').text();
        this.$ul = $('ul.users');
    }

    handleInput(e) {
        e.preventDefault();
        //need an ajax call
    }
}

export default UsersSearch;