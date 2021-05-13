/**
 * QUESTIONS ROUTES
 * todo: create count routes
 */

const pool = require("../db.js");

module.exports = function (app) {

    app.get("/api/questions", async (req, res) => {
        try {
            const allWorks = await pool.query("SELECT * FROM questions");
            res.json(allWorks.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/api/questioncounts", async (req, res) => {
        try {
            const counts = await pool.query("SELECT category, COUNT(*) FROM questions GROUP BY category ORDER BY category asc");
            res.json(counts.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.get("/api/questions/:category", async (req, res) => {
        try {
            const { category } = req.params
            const questions = await pool.query("SELECT * FROM questions WHERE category = $1", [category]);
            res.json(questions.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.post('/api/postquestion', async (req, res) => {
        try {
            const { username, uid, question, answers, answer, file, category, accepted, explanation } = req.body
            const resp = await pool.query("INSERT INTO questions (username, uid, question, answers, answer, file, category, accepted, explanation) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
                [username, uid, question, answers, answer, file, category, accepted, explanation]);
            res.json(resp);
        } catch (err) {
            console.error(err.message)
        }
    })

}