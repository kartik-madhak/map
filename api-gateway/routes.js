const ROUTES = [
    {
        url: '/',
        proxy: {
            target: "localhost:50051",
            logLevel: "debug",
            changeOrigin: false,
        }
    },
    {
        url: '/premium',
        proxy: {
            target: "https://api.github.com/users",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;