import { usernameExists, getUserData } from '../models/userModel.js';
import jwt from 'jsonwebtoken';

async function checkRegistration(req, res, next) {
    const { body } = req;

    if (!body?.username || !body?.password) {
        return res.status(401).json({ success: false, message: 'Username or password missing in body' });
    }

    const exists = await usernameExists(body.username);

    if (exists) {
        return res.status(200).json({ success: false, message: 'Username already exists' });
    }

    next();
}

async function checkLogin(req, res, next) {
    const { body } = req;

    if (!body?.username || !body?.password) {
        return res.status(401).json({ success: false, message: 'Username or password missing in body' });
    }

    next();
}

function loggedInValidation(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ success: false, message: 'No authorization header' });
    }

    const token = authorization.split('Bearer ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token in authorization header' });
    }

    try {
        jwt.verify(token, "secretshiz");
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
}

async function isUserIdInQuery(req, res, next) {
    const { query } = req;

    if (query.userId) {
        const userData = await getUserData(query.userId);

        if (userData.success === false) {
            res.status(400).json({ success: false, message: 'Invalid userId in query' });
            return;
        }

        return next();
    } 

    return res.status(400).json({ success: false, message: 'Missing userId in query' });
}

function is_IdInQuery(req, res, next) {
    const { query } = req;

    if (!query._id) {
        return res.status(400).json({ success: false, message: 'Missing _id in query' });
    }

    next();
}

export { checkRegistration, checkLogin, loggedInValidation, is_IdInQuery, isUserIdInQuery };