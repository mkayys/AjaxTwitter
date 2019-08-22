class UsersSearch {
    constructor($el) {
        this.$el = $el;
        this.input = $('#search-text').text();
        this.$ul = $('ul.users');
    }

    
}

export default UsersSearch;