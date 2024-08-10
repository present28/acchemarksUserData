const pool = require('../config/db');

// Insert data into UserMcqData
exports.insertMcqData = async (req, res) => {
    const { questionTitle, questionOptions, questionCorrectOption, userSelectedAnswer, subjectName, topicName, email, interest, sourceId, isAnswerCorrect, questionId, pageNumber } = req.body;

    try {
        await pool.query(//sorce id
            'INSERT INTO UserMcqData (questionTitle, questionOptions, questionCorrectOption, userSelectedAnswer, subjectName, topicName, email, interest, sourceId, isAnswerCorrect, questionId, pageNumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [questionTitle, JSON.stringify(questionOptions), questionCorrectOption, userSelectedAnswer, subjectName, topicName, email, interest, sourceId, isAnswerCorrect, questionId, pageNumber]
        );
        res.send('MCQ data inserted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get data from UserMcqData
exports.getMcqData = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM UserMcqData WHERE email = ?', [req.user.email]);
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT email, COUNT(*) as correct_answers FROM UserMcqData WHERE isAnswerCorrect = 1 GROUP BY email ORDER BY correct_answers DESC');
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};


// Get data from UserMcqData by sourceId
exports.getMcqDataBySourceId = async (req, res) => {
    const { sourceId } = req.params; // Assuming sourceId is passed as a URL parameter

    try {
        const [rows] = await pool.query('SELECT * FROM UserMcqData WHERE sourceId = ?', [sourceId]);
        res.send(rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
};