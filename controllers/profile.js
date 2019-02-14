const handleProfileGet = (req, res, db, bcrypt) => {
  const {name, email, phoneNumber, gender, birthday, password} = req.body
  const {id} = req.params

  let hash = bcrypt.hashSync(password)

  db.transaction(trx => {
    trx('login')
    .where('id', '=', id)
    .update({
      hash,
      email
    })
    .returning('email')
    .then(upInfo => {
      return trx('users')
        .where('id', '=', id)
        .returning('*')
        .update({
          name,
          email,
          phoneNumber,
          gender,
          birthday
        })
        .then(user => {
          res.json(user[0])
        })
        .catch(err => {
          res.status(400).json('try again')
        }, trx.rollback)
    })
    .then(trx.commit)
    .catch(trx.rollback)
  })

}

module.exports = {
  handleProfileGet
}
