import dotenv from 'dotenv';
import express from 'express';
import pkg from 'pg';
import { fileURLToPath } from 'url'; 
import { dirname } from 'path';
import path from 'path';
const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url); 
const __dirname = dirname(__filename); 

const app = express();
const port = 3004;

app.use(express.static(path.join(__dirname, 'public')));

const pool = new Pool({
  user: 'tu_usuario',
  host: 'localhost',
  database: 'repertorio',
  password: 'tu_contraseña',
  port: 5432,
});


app.use(express.json());

app.post('/cancion', async (req, res) => {
  const { titulo, artista, tono } = req.body;
  try {
    const result = await pool.query('INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING *', [titulo, artista, tono]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al agregar la canción:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.get('/canciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM canciones');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener las canciones:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.put('/cancion/:id', async (req, res) => {
  const id = req.params.id;
  const { titulo, artista, tono } = req.body;
  try {
    const result = await pool.query('UPDATE canciones SET titulo = $1, artista = $2, tono = $3 WHERE id = $4 RETURNING *', [titulo, artista, tono, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al actualizar la canción:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.delete('/cancion/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('DELETE FROM canciones WHERE id = $1 RETURNING *', [id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al eliminar la canción:', error);
    res.status(500).send('Error interno del servidor');
  }
});


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
