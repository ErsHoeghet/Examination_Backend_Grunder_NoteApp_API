import nedb from 'nedb-promises';

const userDB = new nedb({ filename: 'databases/users.db', autoload: true });
const notesDB = new nedb({ filename: 'databases/notes.db', autoload: true });

export { userDB, notesDB }; 