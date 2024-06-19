import { cancionModel } from "../models/cancion.model.js";

export const insertarCancion = async (req, res) => {
    try {
        const { titulo, artista, tono } = req.body;
        const newCancion = await cancionModel.create({ titulo, artista, tono });
        return res.json(newCancion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al insertar la canción.", error });
    }
};

export const allCanciones = async (req, res) => {
    try {
        const canciones = await cancionModel.findAll();
        return res.json(canciones);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al obtener las canciones.", error });
    }
};

export const updateCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, artista, tono } = req.body;
        const cancion = await cancionModel.findByPk(id);

        if (!cancion) {
            return res.status(404).json({ message: "Canción no encontrada." });
        }

        cancion.titulo = titulo;
        cancion.artista = artista;
        cancion.tono = tono;

        await cancion.save();

        return res.json(cancion);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al actualizar la canción.", error });
    }
};

export const deleteCancion = async (req, res) => {
    try {
        const { id } = req.params;
        const cancion = await cancionModel.findByPk(id);

        if (!cancion) {
            return res.status(404).json({ message: "Canción no encontrada." });
        }

        await cancion.destroy();

        return res.json({ message: "Canción eliminada correctamente." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error al eliminar la canción.", error });
    }
};

