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

}