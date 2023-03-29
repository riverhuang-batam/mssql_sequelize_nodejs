const express = require('express'),
    cors = require('cors'),
    bodyParser = require('body-parser'),
    router = require('./routers')

const createServer = async () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended : true}));
    app.use(cors());
    app.use('/api', router)

    app.get('*', (_, res) => res.status(404).json({
        'message' : 'are you lose mf?'
    }))

    return app
}

module.exports = createServer