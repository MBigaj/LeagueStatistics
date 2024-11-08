const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "league_statistics",
    password: "local",
    port: 5432,
})

const getChampions = async () => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query("SELECT * FROM champion ORDER BY name", (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve(results.rows);
            } else {
                reject(new Error("No results found"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

const getOneChampion = async (id) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(`SELECT * FROM champion WHERE id = ${id}`, (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve(results.rows);
            } else {
                reject(new Error("No results found"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

const updateFunFactor = async (id, funFactor) => {
    try {
        return await new Promise(function (resolve, reject) {
            console.log(`UPDATE champion SET fun_factor = ${parseFloat(funFactor).toFixed(2)} WHERE id = ${id}`)
            pool.query(
                `UPDATE champion SET fun_factor = ${parseFloat(funFactor).toFixed(2)} WHERE id = ${id}`,
                (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve('Champion fun factor updated');
            } else {
                reject(new Error("Can't update"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

const updateChampion = async (id, alreadyPlayed) => {
    try {
        return await new Promise(function (resolve, reject) {
            pool.query(
                "UPDATE champion SET already_played = $1 WHERE id = $2 ",
                [alreadyPlayed, id],
                (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve('Champion updated');
            } else {
                reject(new Error("Can't update"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

const getStatisticsForChampion = async (filter, order) => {
    try {
        return await new Promise(function (resolve, reject) {
            let query = ''

            switch(filter) {
                case 'games-played':
                    query = `SELECT champion.*, COUNT(game.id) as statistic FROM champion INNER JOIN game ON(champion.id = game.champion_id) GROUP BY champion.id ORDER BY statistic ${order}`
                    break
                case 'kda':
                    query = `SELECT champion.*, CAST(SUM(game.kills) + SUM(game.assists) as FLOAT) / SUM(game.deaths) as statistic FROM champion INNER JOIN game ON(champion.id = game.champion_id) GROUP BY champion.id ORDER BY statistic ${order}`
                    break
                case 'fun_factor':
                    query = `SELECT *, fun_factor as statistic FROM champion WHERE fun_factor IS NOT NULL ORDER BY ${filter} ${order}`
                    break
                default:
                    query = `SELECT champion.*, SUM(game.${filter}) as statistic FROM champion INNER JOIN game ON(champion.id = game.champion_id) GROUP BY champion.id ORDER BY statistic ${order}`
                    break
            }

            pool.query(
                query,
                (error, results) => {
            if (error) {
                reject(error);
            }
            if (results && results.rows) {
                resolve(results.rows);
            } else {
                reject(new Error("Can't return data"));
            }
            });
        });
    } catch (error_1) {
        console.error(error_1);
        throw new Error("Internal server error");
    }
}

module.exports = {
    getChampions,
    getOneChampion,
    updateFunFactor,
    updateChampion,
    getStatisticsForChampion,
}