import bcrypt from 'bcrypt';

const saltRounds = 10;

async function hashPassword (password) {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    return hash;
};

async function comparePasswords (password, hash) {
    const match = await bcrypt.compare(password, hash);

    return match;
};

export { hashPassword, comparePasswords };