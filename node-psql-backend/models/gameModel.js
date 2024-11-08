const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "league_statistics",
    password: "local",
    port: 5432,
})

const getGamesForChampion = async (id) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(
                `SELECT * FROM game WHERE champion_id = ${id} ORDER BY created_at DESC`,
                (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve(results.rows);
            } else {
                reject(new Error("Can't get game"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

const newGame = async (data) => {
    try {
        return await new Promise(function (resolve, reject) {
            const { status, kills, deaths, assists, championId } = data;
            pool.query(
                "INSERT INTO game (status, kills, deaths, assists, champion_id) VALUES($1, $2, $3, $4, $5)",
                [status, parseInt(kills), parseInt(deaths), parseInt(assists), parseInt(championId)],
                (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve('New game created');
            } else {
                reject(new Error("Can't create new game"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

module.exports = {
    newGame,
    getGamesForChampion,
}