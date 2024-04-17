import { Request, Response } from "express";
import prisma from "../models/prisma";

export const createPlace = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      nombre,
      descripcion,
      imagen,
      imperdibles,
      tipo = "place",
    } = req.body;
    
    if (!nombre) {
      res.status(400).json({ message: "El nombre es obligatorio" });
      return;
    }
    if (!descripcion) {
      res.status(400).json({ message: "La descripción es obligatoria" });
      return;
    }
    if (!imagen) {
      res.status(400).json({ message: "La imagen es obligatoria" });
      return;
    }
    if (!imperdibles || imperdibles.length === 0) {
      res.status(400).json({ message: "Se requiere al menos un punto de interés" });
      return;
    }

    // Crear el lugar junto con los pois 
    const place = await prisma.place.create({
      data: {
        nombre,
        descripcion,
        imagen,
        imperdibles: {
          createMany: {
            data: imperdibles.map((poi: any) => ({
              nombre: poi.nombre,
              descripcion: poi.descripcion,
              imagen: poi.imagen,
              tipo: "poi"
            })),
          },
        },
        tipo: "place",
      },
      include: {
        imperdibles: true, // Incluir los pois en la respuesta
      },
    });

    res.status(201).json(place);
  } catch (error: any) {
    console.error(error);

    if (
      error &&
      error?.code === "P2002" &&
      error?.meta?.target.includes("nombre")
    ) {
      res.status(400).json({ message: "El lugar ingresado ya existe" });
    } else {
      console.error(error);
      res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
  }
};

export const getAllPlaces = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const places = await prisma.place.findMany();
    res.status(200).json(places);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
  }
};

export const getPlaceById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const placeId = parseInt(req.params.id);
  try {
    const place = await prisma.place.findUnique({
      where: {
        id: placeId,
      },
    });
    if (!place) {
      res.status(404).json({ error: "El lugar no fue encontrado" });
      return;
    }
    res.status(200).json(place);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
  }
};

export const updatePlace = async (
  req: Request,
  res: Response
): Promise<void> => {
  const placeId = parseInt(req.params.id);
  const { nombre, descripcion, imagen, imperdibles, tipo = "place" } = req.body;
  try {
    let dataToUpdate: any = { ...req.body };

    if (nombre) {
      dataToUpdate.nombre = nombre;
    }

    if (descripcion) {
      dataToUpdate.descripcion = descripcion;
    }

    if (imagen) {
      dataToUpdate.imagen = imagen;
    }

    if (imperdibles) {
      // Actualizar los pois 
      dataToUpdate.imperdibles = {
        set: imperdibles.map((poi: any) => ({
          id: poi.id,
        })),
      };
    }

    const place = await prisma.place.update({
      where: {
        id: placeId,
      },
      data: dataToUpdate,
      include: {
        imperdibles: true, // Incluir los pois actualizados en la respuesta
      },
    });

    res.status(200).json(place);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
  }
};

export const deletePlace = async (
  req: Request,
  res: Response
): Promise<void> => {
  const placeId = parseInt(req.params.id);
  try {
    await prisma.place.delete({
      where: {
        id: placeId,
      },
    });
    res
      .status(200)
      .json({
        message: `El artículo ${placeId} ha sido eliminado`,
      })
      .end();
  } catch (error: any) {
    if (error?.code == "P2005") {
      res.status(404).json("Lugar no encontrado");
    } else {
      console.error(error);
      res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
  }
};