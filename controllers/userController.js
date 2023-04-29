import { createUser, authenticateLogin } from '../models/userModel.js';
import { hashPassword } from '../bcrypt.js';
import jwt from 'jsonwebtoken';

async function registerController(req, res) {
    const { username, password } = req.body;
    const userId = await createUser(username, await hashPassword(password));
    res.status(200).json({ success: true, userId });
};

async function loginController(req, res) {
    const { username, password } = req.body;

    const result = await authenticateLogin(username, password);

    if (result.success) {
        const token = jwt.sign({ username }, "secretshiz", { expiresIn: '15m' });

        res.setHeader('Authorization', `Bearer ${token}`);
        res.status(200).json(result);
    } else {
        res.status(401).json(result);
    }
};

export { registerController, loginController };