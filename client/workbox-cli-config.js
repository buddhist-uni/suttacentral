module.exports = {
    'swSrc': './build/service-worker.js',
    'swDest': './build/sw-generated.js',
    'globDirectory': './build/',
    'globPatterns': [
        '/',
        'index.html',
        'elements/styles/*.json',
        'localization/elements/**/en.json',
        'img/pray.png',
        'img/*.svg',
        'files/fonts/RaloksPE-Bold_3.007.woff2',
        'files/fonts/RaloksPE-Regular_3.007.woff2',
        'files/fonts/RaloksSansPE-Bd_2.004.woff2',
        'files/fonts/RaloksSansPE-It_2.004.woff2',
        'files/fonts/RaloksSansPE-Rg_2.004.woff2'
    ],
    'globIgnores': [
        'node_modules/webcomponents/*',
        'elements/static-templates/*'
    ]
};
