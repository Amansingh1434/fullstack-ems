 import {Router} from "express"
import { protect, protectAdmin } from "../middleware/auth.js";
import { createLeave, getLeave, updateLeaveStatus } from "../controllers/leaveControllers.js";

 const leaveRouter = Router();
 leaveRouter.post('/',protect,createLeave)
 leaveRouter.get('/',protect,getLeave)
 leaveRouter.patch('/:id',protect, protectAdmin,updateLeaveStatus)

 export default leaveRouter;