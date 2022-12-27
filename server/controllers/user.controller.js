import { User } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.send("not found");
  } else {
    res.status(200).send(users);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    return res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    throw error;
  }
};

export const editUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
};

export const deleteUser = async (req, res) => {
  const user = await User.deleteOne(req.params.id);
  res.status(200).json({ message: `Deleted user ${req.params.id}` });
};
