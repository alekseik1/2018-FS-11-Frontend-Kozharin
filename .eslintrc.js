module.exports = {
    extends: [
        'airbnb-base',
    ],
    plugins: [
        'import',
    ],
    env: {
        node: true,
        browser: true
    },
    rules: {
        'indent': ['error', 4]
    }
};