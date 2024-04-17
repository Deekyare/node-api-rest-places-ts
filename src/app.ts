import dotenv from 'dotenv';
dotenv.config()
import express  from 'express';
import routesPlace from './routes/routes-places'
import routesPois from './routes/routes-pois'

const app = express()

app.use(express.json())

//routes
app.use('/place', routesPlace)
app.use('/poi', routesPois)
console.log ('esto esta siendo ejecutado')

export default app