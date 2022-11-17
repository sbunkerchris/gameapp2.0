const express = require('express')
const app = express()
const port = 8080 || process.env.PORT

app.use('/', requier('./routes'))

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})