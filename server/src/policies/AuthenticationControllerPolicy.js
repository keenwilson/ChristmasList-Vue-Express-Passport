const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      userName: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string().email(),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}$')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'userName':
          res.status(400).send({
            error: `Username must be at least 3 characters in length and not greater than 30 characters in length.
            <br>
            Username must contain only letters and numbers. No special characters.`
          })
          break
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address.'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
            <br>
            1. It must contain ONLY the following characters: lower case, upper case, numerics 
            <br>
            2. It must be at least 8 characters in length and not greater than 32 characters in length
            `
          })
          break
        default:
          res.status(400).send({
            error: `Invalid registration information`
          })
      }
    } else {
      next()
    }
  }
}
