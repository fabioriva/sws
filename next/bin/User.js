const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { Schema } = mongoose
const SALT_WORK_FACTOR = 10
const MAX_LOGIN_ATTEMPTS = 5
const LOCK_TIME = 1 * 60 * 60 * 1000

const UserSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number },
  isFirstLogin: { type: Boolean, default: true },
  lastLogin: { type: Date, default: Date.now },
  email: { type: String, validate: [validatePresenceOf, 'an email is required'] }, // index: { unique: true } },
  name: { first: String, last: String },
  role: { type: Number, required: true },
  aps: { type: String, required: true },
  // roles: { type: Array, required: true },
  // aps: { type: Array, required: true },
  locales: { type: Array, required: true }
}, { collection: 'users' })

UserSchema.virtual('isLocked').get(function () {
  // check for a future lockUntil timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

UserSchema.pre('save', function (next) {
  var user = this
  if (!user.isModified('password')) return next()
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)
      user.password = hash
      next()
    })
  })
})

// UserSchema.pre('updateOne', function (next) {
//   console.log('pre updateOne')
//   next()
//   // var user = this
//   // if (!user.isModified('password')) return next()
//   // bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//   //   if (err) return next(err)
//   //   bcrypt.hash(user.password, salt, (err, hash) => {
//   //     if (err) return next(err)
//   //     user.password = hash
//   //     next()
//   //   })
//   // })
// })

UserSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

UserSchema.methods.incLoginAttempts = function (cb) {
  // if we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $set: { loginAttempts: 1 },
      $unset: { lockUntil: 1 }
    }, cb)
  }
  // otherwise we're incrementing
  var updates = { $inc: { loginAttempts: 1 } }
  // lock the account if we've reached max attempts and it's not locked already
  if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + LOCK_TIME }
  }
  return this.updateOne(updates, cb)
}

// expose enum on the model, and provide an internal convenience reference
const reasons = UserSchema.statics.failedLogin = {
  NOT_FOUND: 0,
  PASSWORD_INCORRECT: 1,
  MAX_ATTEMPTS: 2
}

UserSchema.statics.getAuthenticated = function (username, password, cb) {
  this.findOne({ username: username }, function (err, user) {
    if (err) return cb(err)
    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    }
    // check if the account is currently locked
    if (user.isLocked) {
      // just increment login attempts if account is already locked
      return user.incLoginAttempts(function (err) {
        if (err) return cb(err)
        return cb(null, null, reasons.MAX_ATTEMPTS)
      })
    }
    // test for a matching password
    user.comparePassword(password, function (err, isMatch) {
      if (err) return cb(err)
      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, user)
        // reset attempts and lock info
        var updates = {
          $set: { loginAttempts: 0, lastLogin: Date.now() },
          $unset: { lockUntil: 1 }
        }
        return user.updateOne(updates, function (err) {
          if (err) return cb(err)
          return cb(null, user)
        })
      }
      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function (err) {
        if (err) return cb(err)
        return cb(null, null, reasons.PASSWORD_INCORRECT)
      })
    })
  })
}

UserSchema.statics.changePassword = function (username, oldPassword, newPassword, confirmPassword, cb) {
  // console.log('from change password', username, oldPassword, newPassword, confirmPassword)
  this.findOne({ username: username }, function (err, user) {
    if (err) return cb(err)
    // make sure the user exists
    if (!user) {
      return cb(null, null, reasons.NOT_FOUND)
    }
    // test for a matching password
    user.comparePassword(oldPassword, function (err, isMatch) {
      if (err) return cb(err)
      // check if the password was a match
      if (isMatch) {
        // if there's no lock or failed attempts, just return the user
        if (!user.loginAttempts && !user.lockUntil) return cb(null, user)
        // reset attempts and lock info
        user.loginAttempts = 0
        user.lastLogin = Date.now()
        user.password = newPassword
        return user.save(function (err, user) {
          if (err) return cb(err)
          return cb(null, user)
        })
      }
      // password is incorrect, so increment login attempts before responding
      user.incLoginAttempts(function (err) {
        if (err) return cb(err)
        return cb(null, null, reasons.PASSWORD_INCORRECT)
      })
    })
  })
}

module.exports = mongoose.model('User', UserSchema)

function validatePresenceOf (value) {
  return value && value.length
}
