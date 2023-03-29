const createServer = require('./server'),
    http = require('http'),
    { Sequelize } = require('sequelize')
    
require('dotenv').config()

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        HOST: "localhost",
        dialect: 'mssql'
    }
);

async function startServer() {
    const app = await createServer();
    http.createServer(app).listen(process.env.PORT || 3000, async () => {
        try {
            await sequelize.authenticate();
            console.log(`server is running at port ${process.env.PORT}`)
        } catch (error) {
            console.log(error)
        }
    })
}

startServer()