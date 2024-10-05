import express from 'express';
import { registerUser, loginUser } from '../controllers/user.controller.js';
import { logoutUser } from '../controllers/user.controller.js';
import { deleteUser } from '../controllers/user.controller.js';
import { getUsers } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { updateUserProfile } from '../controllers/user.controller.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);

// Add other routes for user management here
userRouter.get('/users', getUsers);
userRouter.delete('/users/:id', deleteUser);
userRouter.put('/users/:id', updateUser);
userRouter.patch('/edit-profile', updateUserProfile);

export default userRouter;