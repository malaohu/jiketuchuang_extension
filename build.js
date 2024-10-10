({
    appDir: './',
    baseUrl: "./js",
    dir:"../dist",
    modules: [  
        { name: 'popup' },
        { name: 'background' },
        { name: 'show' },
        { name: 'opt' },
    ],
    paths: { 'jquery':'lib/jquery', 'dropzone': 'lib/dropzone' },
    optimize: 'none',
    fileExclusionRegExp: /^(r|build)\.js$/,
    removeCombined: true,

    optimizeCss: 'standard',
})