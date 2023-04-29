async function titleAndTextValidation(req, res, next) {
    const { title, text } = req.body;

    if (title && text) {
        if (title.length > 0 && title.length < 51) {
            if (text.length > 0 && text.length < 301) {
                next();
            } else {
                res.status(400).json({ success: false, message: 'Text must be between 1 and 300 characters' });
            }
        }
        else {
            res.status(400).json({ success: false, message: 'Title must be between 1 and 50 characters' });
        }
    } else {
        res.status(400).json({ success: false, message: 'Missing title or text' });
    }
}

export { titleAndTextValidation };