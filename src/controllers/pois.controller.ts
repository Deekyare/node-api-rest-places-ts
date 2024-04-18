import { POI } from './../models/prisma.interface';
import { Request, Response } from "express";
import prisma from "../models/prisma";

export const createPoi = async (req: Request, res: Response): Promise<void> => {
  try {
    const { nombre, descripcion, imagen, tipo = "poi" } = req.body;
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

    const poi = await prisma.poi.create({
      data: {
        nombre,
        descripcion,
        imagen,
        tipo: "poi",
      },
    });
    res.status(201).json(poi);
  } catch (error: any) {
    console.log(error);

    if (
      error &&
      error?.code === "P2002" &&
      error?.meta?.target.includes("nombre")
    ) {
      res.status(400).json({ message: "El lugar ingresado ya existe" });
    } else {
      console.log(error);
      res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
  }
};

export const getAllPoi = async (req: Request, res: Response): Promise<void> => {
  try {
    const poises = await prisma.poi.findMany();
    res.status(200).json(poises);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, pruebe mas tarde" });
  }
};

export const getPoiById = async (
  req: Request,
  res: Response
): Promise<void> => {
  const poiId = parseInt(req.params.poi);
  try {
    const poi = await prisma.poi.findUnique({
      where: {
        id: poiId,
      },
    });
    if (!poi) {
      res.status(404).json({ error: "El poi no fue encontrado" });
      return;
    }
    res.status(200).json(poi);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, pruebe mas tarde" });
  }
};

export const updatePoi = async (req: Request, res: Response): Promise<void> => {
  const poiId = parseInt(req.params.poi);
  const { nombre, descripcion, imagen, tipo = "poi" } = req.body;
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

    const updatedPoi = await prisma.poi.update({
      where: {
        id: poiId,
      },
      data: dataToUpdate,
    });

    res.status(200).json(updatedPoi);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
  }
};

export const deletePoi = async (req: Request, res: Response): Promise<void> => {
  const poiId = parseInt(req.params.poi);
  try {
    await prisma.poi.delete({
      where: {
        id: poiId,
      },
    });
    res
      .status(200)
      .json({
        message: `El artículo ${poiId} ha sido eliminado`,
      })
      .end();
  } catch (error: any) {
    if (error?.code == "P2005") {
      res.status(404).json("El lugar no fue encontrado");
    } else {
      console.log(error);
      res.status(500).json({ error: "Hubo un error, pruebe más tarde" });
    }
  }
};
