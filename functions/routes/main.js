/**
 * BOOKLISTS ROUTES
 * todo: create count routes
 */
const pool = require("../db.js");

module.exports = function (app) {

    app.get("/api/getuser/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            const here = await pool.query("SELECT * FROM eusers WHERE uid = $1", [uid]);
            res.json(here.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

    app.post('/api/createuser', async (req, res) => {
        try {
            const { uid, email, username, admin } = req.body
            const resp = await pool.query("INSERT INTO eusers (uid, email, username, admin, theme) VALUES ($1, $2, $3, $4, 0)",
                [uid, email, username, admin]);
            res.json(resp);
        } catch (err) {
            console.error(err.message)
        }
    })

    app.get("/api/user/theme/:uid", async (req, res) => {
        try {
            const { uid } = req.params;
            const here = await pool.query("SELECT theme FROM eusers WHERE uid = $1", [uid]);
            res.json(parseInt(here.rows[0].theme));
        } catch (err) {
            console.error(err.message);
        }
    })

    app.put("/api/user/settheme/:num/:uid", async (req, res) => {
        try {
            const { num, uid } = req.params;
            const here = await pool.query("UPDATE eusers SET theme = $1 WHERE uid = $2", [num, uid]);
            res.json(here.rows);
        } catch (err) {
            console.error(err.message);
        }
    })

}