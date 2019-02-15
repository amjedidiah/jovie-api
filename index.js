const express = require('express'),
      bodyParser = require('body-parser'),
      bcrypt = require('bcrypt-nodejs'),
      cors = require('cors'),
      knex = require('knex'),
      register = require('./controllers/register'),
      signin = require('./controllers/signin'),
      profile = require('./controllers/profile')





const app = express(),
      db = knex({
        client: 'pg',
        connection: {
          connectionString: process.env.DATABASE_URL,
          ssl: true
        }
      })




app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => { res.send('it works') })  //getting root request

app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})  //getting and responding to post request on /signin

app.post('/signup', (req, res) => {
  const {email} = req.body
  //
  db.select('email')
    .from('login')
    .where('email', '=', email)
    .then(existing => {
      if(existing.length === 0) {
        register.handleRegister(req, res, db, bcrypt)
      } else {
        signin.handleSignin(req, res, db, bcrypt)
      }
    })

})  //getting and responding to post request on /register

app.post('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db, bcrypt)})


app.listen(process.env.PORT, () => {
  console.log(`app's server is live on port ${process.env.PORT}`)
})  //start server
