import * as Constants from './constants'

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

        const createSkillsTable = this.#horseDB.prepare(`CREATE TABLE IF NOT EXISTS 
                                    skillstats(
                                     horse_id   INT FORGEIN KEY, 
                                     discp_name TEXT, 
                                     skill1     INT, 
                                     skill2     INT,
                                     skill3     INT,
                                     skill4     INT,
                                     skill5     INT
                                     )`);
        createHorseTable.run();
        createSkillsTable.run();
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
            let qString = `SELECT
                                horses.*,`;
            
            // Pivot the Discipline table contents to have all disciplines on one row per horse
            Constants.disciplineMap.forEach((abbrv,discp,map) => {
                for (let i=1;i<6;i++) {
                    let skillNo = 'skill'+i;
                    let addStr = `MAX(CASE WHEN skillstats.discp_name = '${discp}' THEN skillstats.${skillNo} END) AS ${abbrv}_${skillNo},`;
                    qString = qString + addStr;
                }
            });

            qString = qString.slice(0,qString.length-1) + ` FROM horses
                                LEFT JOIN skillstats ON horses.id = skillstats.horse_id
                                GROUP BY horses.id;`;

            const readQuery = this.#horseDB.prepare(qString); 
            return readQuery.all();
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    /* 'skills' should be an array of skill objects for one discipline each*/
    insertSkills = (skills) => {
        try {
            const insertQuery = this.#horseDB.prepare(
                `INSERT INTO skillstats (horse_id,discp_name,skill1,skill2,skill3,skill4,skill5) 
                VALUES (@horse_id,@discipline,@skill1,@skill2,@skill3,@skill4,@skill5)`
            );

            const insertMany = this.#horseDB.transaction(() => {
                for (const discp of skills) insertQuery.run(discp);
            });

            insertMany();
            return true;
        } catch (err) {
            // TODO add handling when the horse already is in database
            console.error(err)
            throw err
        }
    }



    closeConnection = () => {
        this.#horseDB.close()
    }
}

