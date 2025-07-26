import cloudinary from "../lib/cloudinary.js";
import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getUsersForSidebar = async(req, res) => {
    try {
        const loggedInUser = req.user._id;
        const users = await User.find({_id: {$ne: loggedInUser}}).select("_password");
        res.status(200).json(users);
    } catch (error) {
        console.error("Error in getUsersForSidebar:", error);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

export const getMessages = async(req, res) => {
    try {
        const { id: userToChatWithId } = req.params;
        const myId = req.user._id;
        const messages = await Message.find({
            $or: [
                { userId: myId, receiverId: userToChatWithId },
                { userId: userToChatWithId, receiverId: myId }
            ]
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}

export const sendMessage = async(req, res) => {
    try {
        const { text, image } = req.body;
        const {id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image) {
            let uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error in sendMessage:", error.message);
        res.status(500).json({
            error: "Internal Server Error",
        });
    }
}