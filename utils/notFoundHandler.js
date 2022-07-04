function notFoundHandler(app) {
    app.use((req, res, next) => {
        res.status(404)
        res.json({
            error: {
                title: 'Not found',
                status: 404,
                type: 'Invalid Request',
            },
            message: "The requested route does not exist.",
        })
        next()
    })
}

export default notFoundHandler