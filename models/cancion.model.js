import {pool} from '../database/connection.js'

const create = async({titulo, artista, tono}) => {
    const query ={
        text: `INSERT INTO canciones (titulo, artista, tono) VALUES ($1, $2, $3) RETURNING*`,
        values: [titulo, artista, tono]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

const findAll = async() => {
    const {rows} = await pool.query('SELECT * FROM CANCIONES')
    return rows
}

const update = async({id, titulo, artista, tono}) => {
    const query ={
        text: `UPDATE CANCIONES SET
        ID =  $1,
        TITULO = $2,
        ARTISTA = $3,
        TONO = $4
        WHERE ID = $1
        RETURNING*`,
        values: [id, titulo, artista, tono]
    }
    const {rows} = await pool.query(query)
    return rows[0]

}

const remove = async(id) => {
    const query = {
        text: `DELETE FROM CANCIONES WHERE ID = $1 RETURNING*`,
        values: [id]
    }
    const {rows} = await pool.query(query)
    return rows[0]
}

export const cancionModel ={
    create,
    findAll,
    update,
    remove
}