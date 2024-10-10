requirejs.config({
    baseUrl: 'js',
    paths: { 'jquery':'lib/jquery'}
});

require(['show_init'], function (client) {
    client.init();
});