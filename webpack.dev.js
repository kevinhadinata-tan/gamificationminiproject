const path = require('path');

module.exports = {
    mode: 'development',
    target: 'node',
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true,
        filename: 'app.bundle.js',
    },
}