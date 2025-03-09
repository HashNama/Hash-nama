module.exports = (role) => {
	return (req, res, next) => {
		try {
			if (req.user.role !== role) {
				return res.status(403).json({
					message: "دسترسی به این روت برای شما امکان پذیر نمیباشد",
				});
			}
			next();
		} catch (err) {
			next(err);
		}
	};
};
