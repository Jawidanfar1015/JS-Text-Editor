const express = require('express')
const app = express()

const PORT = process.env.PORT || 3122;

app.use(express.static('../client/dist'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
require('./routes/homeroute')(app)

app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))
