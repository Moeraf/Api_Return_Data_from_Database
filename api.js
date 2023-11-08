const express = require('express')
const app = express()
var cors = require('cors')
app.use(cors())
const _PORT = 3000
const sql = require('mssql')
const sqlConfig = {
    user: 'sa',
    password: 'First51830694',
    database: 'DBFOR_PERSON',
    server: 'MOEMENPC\\INSTANCE_2K19_1',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000 
    },
    options: {
      encrypt: false,
      trustServerCertificate: false 
    }
  }

app.get('/AllPersons', async function (req, res) { //you should put async fro function because you are calling this api from another place 
    res.send( await GetPersonFromDB())
})

const GetPersonFromDB = async () => {
    try {
     await sql.connect(sqlConfig)
     const result = await sql.query`SELECT 
                                    Table_FOR_PERSON.ID ,
                                    Table_FOR_PERSON.NAME 'PERSON',
                                    Table_FOR_COUNTRY_ID.NAME 'COUNTRY'
                                    FROM Table_FOR_PERSON INNER JOIN Table_FOR_COUNTRY_ID
                                            ON Table_FOR_PERSON.COUNTRY_ID = Table_FOR_COUNTRY_ID.COUNTRY_ID`
     return result.recordset;
    } catch (err) {
     console.log(err);
    }
    finally { 
       sql.close()
    }
   }

app.listen(_PORT)