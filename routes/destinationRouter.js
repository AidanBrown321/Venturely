import { Router } from "express";
const router = Router();

import {
  getAllDestinations,
  getSearchDestinations,
  getDestination,
  createDestination,
  updateDestination,
  deleteDestination,
  showStats,
} from "../controllers/destinationController.js";
import {
  validateDestinationInput,
  validateIdParam,
} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get("/", getAllDestinations);
// router.post("/", createDestination);

router
  .route("/")
  .get(getAllDestinations)
  .post(checkForTestUser, validateDestinationInput, createDestination);

router.route("/stats").get(showStats);

router.route("/search").get(getSearchDestinations);

router
  .route("/:id")
  .get(validateIdParam, getDestination)
  .patch(
    checkForTestUser,
    validateDestinationInput,
    validateIdParam,
    updateDestination
  )
  .delete(checkForTestUser, validateIdParam, deleteDestination);

export default router;
