const UserModel = require("./../../models/User");

exports.updateUser = async (userId, newInfos) => {
	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			userId,
			{
				$set: {
					...newInfos,
				},
			},
			{ new: true }
		).select("-password");

		return updatedUser;
	} catch (error) {}
};
