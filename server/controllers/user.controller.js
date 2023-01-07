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

//---------------get user with auth-------------------------
export const getProfile = async (req, res) => {
  res.send(req.user);
  
};

//---------------------------------------------------//

//create a new user
export const createUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

//---------------------user Login------------------------
export const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
   
  } catch (error) {
    res.status(400).send();
  }
};

//----------------------------user Logout--------------------------
export const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//------------------Logout all users---------------------
export const LogoutAllUsers = async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save();

    res.send();
  } catch (error) {
    res.status(500).send();
  }
};

//--------------------------------------------------//
//edit a user as admin
export const editUser = async (req, res) => {
 const updates = Object.keys(req.body);
 const allowedUpdates = ["firstName", "email", "diagnosis", "plan", "age"];
 const isValidOperation = updates.every((update) =>
   allowedUpdates.includes(update)
 );

 if (!isValidOperation) {
   return res.status(400).send({ error: "Invalid Update" });
 }
 try {
  
   const user = await User.findById(req.params.id);

   updates.forEach((update) => (user[update] = req.body[update]));

   await user.save();

   if (!user) {
     return res.status(404).send();
   }

   res.send(user);
 } catch (error) {
   res.status(400).send(error);
 }
};


//----------------------------------------------------------------------------//

//--------------edit user as user--------------------

export const editProfile = async (req, res)=> {
  try {
 
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(500).send({ error: "Invalid Update" });
    }

      updates.forEach((update) => req.user[update] = req.body[update])
      await req.user.save()
      res.send(req.user)
    } catch (error) {
      res.status(401).send(error)      
    }

}
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
