import { User } from "../models/user.model.js";

//get all users
export const getUsers = async (req, res) => {
  const users = await User.find({});
  if (!users) {
    res.status(500).send("not found");
  } else {
    res.status(200).send(users);
  }
};

//-----------------------------------------------//

//get user by id
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

//
// {
//   const _id = req.params.id;

//   User.findById(_id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send();
//       }

//       res.send(user);
//     })
//     .catch((error) => {
//       res.status(500).send();
//     });
// }
//

//---------------------------------------------------//

//create a new user
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).send(user);
  } catch (error) {
    throw error;
  }
};

// {
//   const user = new User(req.body);

//   user
//     .save()
//     .then(() => {
//       res.send(user);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// }

//--------------------------------------------------//
//edit a user
export const editUser = async (req, res) => {
  {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid Update" });
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      if (!user) {
        return res.status(404).send();
      }

      res.send(user);
    } catch (error) {
      res.status(400).send(error);
    }
  }
};

//
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     res.status(400);
//     throw new Error("User not found");
//   }
//   const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//   });
//   res.status(200).json(updatedUser);
// };
//
//----------------------------------------------------------------------------//

//delete a user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (error) {
    res.status(500).send();
  }
};

//
// {
//   const user = await User.deleteOne(req.params.id);
//   res.status(200).json({ message: `Deleted user ${req.params.id}` });
// };
//