const APIUtil = {
    toggleUser: (id, method) => {
        return $.ajax({
            url: `/users/${id}/follow`,
            method: method,
            dataType: 'json'
        })
    }
};

module.exports = APIUtil;