import { notesDB } from '../databases/database.js';

async function createNoteInDb(note) {
    await notesDB.insert(note);
    return note;
}

async function getNotesFromDb(userId) {
    const notes = await notesDB.find({ userId });

    notes.forEach(item => {
        delete item.userId;
    });

    return notes;
}

async function updateNoteInDb(note) {
    const noteExists = await notesDB.findOne({ _id: note._id });

    if (noteExists && noteExists.userId === note.userId) {
        await notesDB.update({ _id: note._id }, note);
        return { success: true, message: 'Note updated' };
    } else {
        return { success: false, message: 'Note not found' };
    }
}

async function removeNoteFromDb(userId, _id) {
    const noteExists = await notesDB.findOne({ _id });

    if (noteExists && noteExists.userId === userId) {
        await notesDB.remove({ _id });
        return { success: true, message: 'Note deleted' };
    } else {
        return { success: false, message: 'Note not found' };
    }
}

async function searchNoteById(_id) {
    const found = await notesDB.findOne({ _id });
    return found;
}

export { createNoteInDb, getNotesFromDb, updateNoteInDb, removeNoteFromDb, searchNoteById };