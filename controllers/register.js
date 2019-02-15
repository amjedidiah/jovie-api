const handleRegister = (req, res, db, bcrypt) => {
  const {name, email, password} = req.body

  if(name === '' || email === '' || password === '') {
    return res.status(400).json('All fields are required')
  } else {
    let hash = bcrypt.hashSync(password)

    db.transaction(trx => {
      trx.insert({
        hash,
        email
      })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            name,
            email: loginEmail[0],
            joined: new Date(),
            following: 0,
            followers: 0
          })
          .then(user => {
            res.json(user[0])
          })
          .catch(err => {
            res.status(400).json('An error occured<br />Try again')
          }, trx.rollback)
      })
      .then(trx.commit)
      .catch(trx.rollback)
    })
  }

}

module.exports = {
  handleRegister
}
