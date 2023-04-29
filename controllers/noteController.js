import { createNoteInDb, getNotesFromDb, updateNoteInDb, removeNoteFromDb, searchNoteById } from '../models/noteModel.js';
import { getUserData } from '../models/userModel.js';

async function createNote(req, res) {
    const { title, text } = req.body;
    const { userId } = req.query;

    const userData = await getUserData(userId);

    if (userData.success === false) {
        res.status(400).json({ success: false, message: 'Invalid userId in query' });
        return;
    }

    const note = {
        title,
        text,
        createdAt: new Date().toLocaleString(),
        userId: userData.userId
    };

    createNoteInDb(note);

    res.status(200).json({ success: true, message: 'Note created' });
}

async function getNotes(req, res) {
    const { userId } = req.query;

    const userData = await getUserData(userId);

    if (userData.success === false) {
        res.status(400).json({ success: false, message: 'Invalid userId in query' });
        return;
    }

    const notes = await getNotesFromDb(userData.userId);

    res.status(200).json({ success: true, notes });
}

async function updateNote(req, res) {
    const { title, text } = req.body;
    const { userId, _id } = req.query;

    const userData = await getUserData(userId);

    if (userData.success === false) {
        res.status(400).json({ success: false, message: 'Invalid userId in query' });
        return;
    }

    const getCreatedAt = await searchNoteById(_id);

    if (!getCreatedAt) {
        res.status(404).json({ success: false, message: 'Note not found' });
        return;
    }

    const note = {
        title,
        text,
        _id,
        userId: userData.userId,
        createdAt: getCreatedAt.createdAt,
        modifiedAt: new Date().toLocaleString()
    };

    const result = await updateNoteInDb(note);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
}

async function removeNote(req, res) {
    const { userId, _id } = req.query;

    const userData = await getUserData(userId);

    if (userData.success === false) {
        res.status(400).json({ success: false, message: 'Invalid userId in query' });
        return;
    }

    const result = await removeNoteFromDb(userData.userId, _id);

    if (result.success) {
        res.status(200).json(result);
    } else {
        res.status(404).json(result);
    }
}

export { createNote, getNotes, updateNote, removeNote };