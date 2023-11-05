import AuthModel from "../models/AuthModel.js";
import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken'
const secretKey = 'your-secret-key';

export const userSignUp = async (req, res) => {
  const { name, email, password, mobile, oid } = req.body; // dailyLocations is allowed to be empty or not provided

  try {
    const checkEmail = await UserModel.findOne({ email });

    if (checkEmail) {
      return res.json({ message: 'Email id already exists' });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      name,
      email,
      password: hash,
      mobile,
      oid,

    });

    await newUser.save();

    const RootUser = await AuthModel.findById(oid);
    // console.log(RootUser)
    if (RootUser) {
      console.log(RootUser, 'if')
      RootUser.users.push(newUser._id); // Push the new user's _id to RootUser's users array
      await RootUser.save();
      return res.json({ message: 'User signup successful' });
    } else {
      console.log(RootUser, "else")
      return res.json({ message: 'RootUser not found' });
    }
  } catch (err) {
    console.error(`Error from user signup controller: ${err.message}`);
    return res.status(500).json({ message: err.message });
  }
};
export const userSignIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmail = await UserModel.findOne({ email })
    if (checkEmail) {
      let checkPassword = checkEmail.password
      if (checkPassword = password) {
        const token = Jwt.sign({ email }, secretKey, { expiresIn: '10h' })
        res.json({ m: "ok", token: token, name: checkEmail.name ,id:checkEmail.id})
      }
      else {
        res.json({ m: "wrong password" })
      }
    }
    else {
      res.json({ m: 'invalid email' })
    }
  }
  catch (err) {
    res.json({ m: err.message })
  }
};

export const postData = async (req, res) => {
  try {
    const { name, vid, partno, tel, id,user } = req.body; // Destructure the data fields from the request body

    // Create a new data object based on the schema
    const newData = {
      name,
      vid,
      partno,
      tel,
  
    };
    // Find the user document by its unique email and update the 'data' field with the new data
    const user1 = await UserModel.findById(id);
    if (!user1) {
      return res.status(404).json({ error: 'User not found' });
    }

    user1.data.push(newData); // Add the new data to the user's 'data' array

    // Save the updated user document
    await user1.save();

    res.json({ message: 'Data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};