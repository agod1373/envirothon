/**
 * QUESTIONS ROUTES
 * todo: create count routes
 */

const pool = require("../db.js");

module.exports = function (app) {

    app.post("/api/answer", async (req, res) => {
        try {
            const { questionId, respondentUsername, respondentUid, respondentAnswer, correct } = req.body;
            const answerPost = await pool.query("INSERT INTO answers (questionid, respondentusername, respondentuid, date, respondentanswer, correct) VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)",
                [questionId, respondentUsername, respondentUid, respondentAnswer, correct]);
            res.json(answerPost.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/api/answerlog/:id/:uid", async (req, res) => {
        try {
            const { id, uid } = req.params;
            const answerLog = await pool.query("SELECT * FROM answers WHERE questionid = $1 AND respondentuid = $2",
                [id, uid]);
            res.json(answerLog.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

}