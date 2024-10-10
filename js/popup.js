requirejs.config({
    baseUrl: 'js',
    paths: { 'jquery':'lib/jquery', 'dropzone': 'lib/dropzone' }
});

require(['pp_init'], function (client) {
    client.initPopup();
});