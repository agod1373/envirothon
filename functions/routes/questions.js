/**
 * QUESTIONS ROUTES
 * todo: create count routes
 */

const pool = require("../db.js");

module.exports = function (app) {

    app.get("/api/questions", async (req, res) => {
        try {
            const allWorks = await pool.query("SELECT * FROM sierra");
            res.json(allWorks.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.post('/api/postquestion', async (req, res) => {
        try {
            const { username, uid, question, answers, answer, file, category } = req.body
            const resp = await pool.query("INSERT INTO questions (username, uid, question, answers, answer, file, category) VALUES ($1, $2, $3, $4, $5, $6, $7)",
                [username, uid, question, answers, answer, file, category]);
            res.json(resp);
        } catch (err) {
            console.error(err.message)
        }
    })

}