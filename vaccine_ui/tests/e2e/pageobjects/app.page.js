module.exports = {
    get myTitle() {
        const title = $('h4=Filters');
        return title;
    },
    get myEmailAddress() {
        return $('td[data-label=Email]');
    },
    get userEvents() {
        const entry = $('.dataview .row:nth-child(2)').$('<table />:nth-child(2)').$('td[aria-colindex=1]')
        return entry;
    },
    get myDisplayName() {
        return $('td[data-label=Email]');
    },
    get myFilter() {
        return $('span=Filter!');
    },
    get myFilteredResults() {
        return $('h6*=Number of');
    },
    get myMessage() {
        return $('h5');
    },
    clickFilter() {
        const elem = $('#formulate-global-4');
        elem.click();
    },
    clickRefresh() {
        $('button*=Refresh CDC').click();
    },
    open(path = '/') {
        browser.url(path);
    },
    clickLogin() {
        $('.nav-link=Login').click();
    },
    clickLogout() {
        $('.nav-link=Logout').click();
    },
    // submitEvent(event) {
    //     const button = $(`FormulateInput=Submit this form`);
    //     button.click();
    // },
};
