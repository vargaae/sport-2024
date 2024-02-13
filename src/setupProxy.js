const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = app => {
    app.use(
        createProxyMiddleware('/matches', { target: 'https://api.football-data.org/v4/', changeOrigin: true })
    )
    app.use(
        createProxyMiddleware('/competitions', { target: 'https://api.football-data.org/v4/', changeOrigin: true })
    )
}