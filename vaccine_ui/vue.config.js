module.exports = {
    publicPath: "./",
    devServer: {
        proxy: {
            "^/api": {
                // local (development) server
                target: "http://localhost:3000",
                // remote (production) server so it can be tested before pushing to Gitlab
                // target: "https://cryptic-savannah-96041.herokuapp.com/",
                changeOrigin: true
            },
        }
    },
};