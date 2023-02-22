const
    express = require('express'),
    app = express(),
    path = require('path'),
    routes = require('./routes/index'),
    helpers = require('./helpers'),
    cors = require('cors'),
    db = require('./db')



app.use(express.static(path.join(__dirname, 'public')))

app.use(express.json())
app.set('port', process.env.ENV || 4444)
app.use(cors({
    origin: '*'
}))
app.listen(4444, () => {
    console.log(`App running port --> 4444`)
})



app.use((req, res, next) => {
    res.locals.h = helpers
    next()
})

app.use('/test', (req, res) => {
    res.json({ it: 'works' })
})

app.use('/', routes)

app.use((err, req, res, next) => {
    console.log('*** CAUGHT THE ERROR ***')
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Something broke!')

})




module.exports = app