import express from "express";
import bcryptjs from "bcryptjs";
import User from "../models/User.js";
import { errorHandle } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { ObjectId } from 'mongodb';

const router = express.Router();

router.post('/signup', async (req, res, next) => {
    const { username, email, photo, role, password } = req.body;

    if (!username || !email || !photo || !password || username === '' || email === '' || photo === '' || password === '') {
        next(errorHandle(400, 'All fields are required.')); // middleware error handle
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);

    const newUser = new User({
        username,
        email,
        photo,
        role,
        password: hashedPassword,
    });
    try {
        await newUser.save();
        res.json('SignUp Successfully.')
    } catch (err) {
        next(err.message); // middleware error handle
    }
})


//LogIn API
router.post('/signin', async (req, res, next) => {
    const { email, password, username, photo, role } = req.body;
    // try {
    const validuser = await User.findOne({ email });
    if (validuser && await bcryptjs.compare(password, validuser.password)) {
        const token = jwt.sign({ email: validuser.email, role: validuser.role, user: validuser }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } else {
        res.status(401).send({ message: 'Invalid credentials' });
    }
})


//All User
router.get('/user', async (req, res) => {
    const result = await User.find({})
    res.send(result)
})


//User Delete
router.delete('/user/:id', async (req, res) => {
    const id =  req.params.id;
    const quary = { _id: new ObjectId(id)}
    const result = await User.deleteOne(quary)
    res.send(result);
})

export default router;