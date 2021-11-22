const ROUTES = [
    {
        url: '/free',
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                ['^/free']: ''
            }
        }
    },
    {
        url: '/premium',
        proxy: {
            target: "https://www.google.com",
            changeOrigin: true,
            pathRewrite: {
                [`^/premium`]: '',
            },
        }
    }
]

exports.ROUTES = ROUTES;