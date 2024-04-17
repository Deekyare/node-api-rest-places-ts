import express from "express";

import {
  createPoi,
  deletePoi,
  getAllPoi,
  getPoiById,
  updatePoi,
} from "../controllers/pois.controller";

//enrutador de express
const router = express.Router();

router.post("/", createPoi);
router.get("/", getAllPoi);
router.get("/:id", getPoiById);
router.put("/:id", updatePoi);
router.delete("/:id", deletePoi);

export default router;
