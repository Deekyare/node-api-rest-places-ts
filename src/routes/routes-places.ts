import express from "express";
import {
  createPlace,
  deletePlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
} from "../controllers/place.controller";

//enrutador de express
const router = express.Router();

router.post("/", createPlace);
router.get("/", getAllPlaces);
router.get("/:id", getPlaceById);
router.put("/:id", updatePlace);
router.delete("/:id", deletePlace);

export default router;
