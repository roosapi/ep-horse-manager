const Database = require("better-sqlite3")


export class HorseDatabase {
    #horseDB;

    constructor(db_path) {
        this.#horseDB = new Database(db_path);
        this.#horseDB.pragma('journal_mode = WAL');
        this.#init_tables();
    }

    #init_tables() {
        // TODO add rest of the horse properties(,birthyear,sire_id,dam_id)
        const createHorseTable = this.#horseDB.prepare(`CREATE TABLE IF NOT EXISTS 
                                    horses(
                                     id     INT PRIMARY KEY, 
                                     name   TEXT, 
                                     sex    TEXT, 
                                     breed  TEXT, 
                                     type   TEXT, 
                                     height INT,
                                     born   INT,
                                     sire   INT,
                                     dam    INT
                                     )`);
        createHorseTable.run();
    }

    insertHorse = (props) => {
        try {
            // TODO add rest of the horse properties(,birthyear,sire_id,dam_id)
            const insertQuery = this.#horseDB.prepare(
                `INSERT INTO horses (id,name,sex,breed,type,height,born) 
                VALUES (@id,@name,@sex,@breed,@type,@height,@born)`
            )

            const transaction = this.#horseDB.transaction(() => {
                const info = insertQuery.run(props)
                console.log(
                    `Inserted ${info.changes} rows with last ID 
                    ${info.lastInsertRowid} into horses`
                )
            })
            transaction()
            return true;
        } catch (err) {
            // TODO add handling when the horse already is in database
            console.error(err)
            throw err
        }
    }

    getHorses = () => {
        try {
            const query = `SELECT * FROM horses`
            const readQuery = this.#horseDB.prepare(query)
            const rowList = readQuery.all()
            return rowList
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    closeConnection = () => {
        this.#horseDB.close()
    }
}

