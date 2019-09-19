// CONFIGURE ENVIRONMENT VARIABLES
require('dotenv').config()

// REQUIRE VENDOR LIBS
const express = require('express')
const corsMiddleware = require('restify-cors-middleware')

// INSTANTIATE APP
const app = express()

// CONFIGURE CORS
const cors = corsMiddleware({
    origins: ['*'],
    allowHeaders: ['*']
})

// SETUP ROUTER
const router = express.Router()
router.use(cors.preflight)
router.use(cors.actual)

// REQUIRE SERVICES
const twitter = require('./twitterAPI');

router.get('/users/:id', (req, res) => {
    twitter
        .getTweetsForUser(req.params.id, { count: 20 /* optional params */ })
        .then(tweets => res.send(tweets))
        .catch(error => res.status(400).send(error))
})

// REGISTER ROUTES
app.use('/api', router)

// START SERVER
app.listen(3010)
