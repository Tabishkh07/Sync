const User = require("../models/User");

const escapeRegex = (text) => {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

const getUsers = async(req, res, next)=>{
    try{
        let page = Number(req.query.page);
        let limit = Number(req.query.limit);
        const name = req.query.name;
        const filter = {};
        
        // filtering
        if (name) {
            filter.name = {$regex: escapeRegex(name), $options: "i" };
        }

        //  ristricting the invalid entries.
        if (!Number.isInteger(page) || page < 1) {
            page = 1;
        }
        if (!Number.isInteger(limit) || limit < 1) {
            limit = 10;
        }
        if (limit > 100) {
            limit = 100;
        }

        const skip = (page - 1) * limit;
        const totalUsers = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers/limit);

        const user = await User.find(filter).select("-password").skip(skip).limit(limit);
        res.status(200).json({"users": user, "pagination": {page, limit, totalUsers, totalPages}
    });
    }catch(err){
        next(err);
    }
}

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id).select("-password");
        if (user == null) {
            return res.status(404).json({
                error: "User not found"
            });
        }
        res.status(200).json(user);

    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const id = req.params.id;

    if (req.user.userId !== id) {
        return res.status(403).json({
            error: "Not authorized"
        });
    }

    const data = {
        name: req.body.name,
        email: req.body.email
    };

    try {
        const user = await User.findByIdAndUpdate(
            id,
            data,
            { new: true }
        ).select("-password");

        if (user == null) {
            return res.status(404).json({
                error: "User not found"
            });
        }

        return res.status(200).json(user);

    } catch (err) {
        next(err);
    }
};

const deleteUser = async(req, res, next)=> {
    const id = req.params.id;

    if (req.user.userId !== id) {
        return res.status(403).json({
            error: "Not authorized"
        });
    }
    
    try{
        const user = await User.findByIdAndDelete(id);
        if(user == null){
            return res.status(404).json({error: "User not found"});
        }
        return res.status(200).json({message: "User Deleted Successfully"});
    }catch(err){
        next(err);
    };
};

module.exports = {getUsers, getUserById, updateUser, deleteUser};