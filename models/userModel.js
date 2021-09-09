import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: [2, 'firstname must be at least two characters']
    },
    lastname: {
        type: String,
        required: true,
        min: [2, 'lastname must be at least two characters']
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (v) => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v),
            message: 'Invalid email address'
        },
        unique: true
    },
    image: {
        type: String,
        required: true,
        default: 'user.jpg'
    },
    phone: {
        type: Number,
        required: true,
        min: [11, 'Your number must have at least 11 digits']
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: [6, 'Password must be at least six characters']
    },
    passwordConfirm: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function (v) {
                return v === this.password
            },
            message: 'Passwords does not match'
        }
    }
})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()

    this.password = await bcrypt.hash(this.password, 10)
    this.passwordConfirm = undefined
    next()
})

const User = mongoose.model('User', userSchema)

export default User