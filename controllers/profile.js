const handleProfileGet = (req, res, db, bcrypt) => {
  const {name, email, phoneNumber, gender, birthday, password} = req.body
  const {id} = req.params

  if(password === '') {
    return res.status(400).json('Enter your password to edit your details')
  } else if(email === '') {
    return res.status(400).json('Email field cannot be left empty')
  } else if(name === '') {
    return res.status(400).json('Name field cannot be left empty')
  } else {
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

}

module.exports = {
  handleProfileGet
}
