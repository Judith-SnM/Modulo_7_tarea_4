import dotenv from 'dotenv';
import pg from 'pg';

dotenv.config();

const { Pool } = pg;

const connectionString = process.env.CONNECTION_STRING;

const initializeDatabaseConnection = async () => {
    const pool = new Pool({
        connectionString,
        allowExitOnIdle: true,
    });

    try {
        await pool.query('SELECT NOW()');
        console.log('Conexión a PostgreSQL establecida');
    } catch (error) {
        throw new Error('Error al conectar a la base de datos PostgreSQL:', error);
    }
};

initializeDatabaseConnection()
    .catch(error => console.error(error));

export default initializeDatabaseConnection;
