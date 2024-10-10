requirejs.config({
    baseUrl: 'js',
    paths: { 'jquery':'lib/jquery'}
});

require(['bg_init'], function (client) {
    client.init();
});



