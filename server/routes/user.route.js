import express from 'express';
//import User from '../models/user.model';

const router = express.Router();

// router.get('/user', async (res, req) => {
//     const result = await User.find({})
//     res.json(result)
// })

router.get('/test', (req, res) => {
    res.json({ message: 'test' });	
})

export default router;