import express from 'express'
import {openApi} from './lib/openApi'
import { getCars } from './api/getCars';
import {readFileSync} from 'fs'

const app = express();

openApi.addRoute(getCars)
openApi.wrappers.express.createStoplightRoute('/stoplight',app);
openApi.wrappers.express.createSwaggerRoute('/swagger',app);
openApi.wrappers.express.createOpenApiRootRoute(app)

// adding index route to prove that API works
app.get('/',(req,res) => {
    const html =  readFileSync(__dirname + '/public/index.html').toString()
    res.send(html)
})
console.log("Sample page: http://localhost:3000/")
console.log("API docs (Stoplight): http://localhost:3000/stoplight")
console.log("API docs (Swagger): http://localhost:3000/swagger")
app.listen(3000);

