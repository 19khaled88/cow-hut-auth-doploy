import { User } from "../app/modules/users/users.model";

const isUserExist =async (id: string) => {
	const isExist =await User.findOne(
		{_id: id },
		{ id: 1, phoneNumber: 1, password: 1, role: 1 }
	);

    // if (!isExist) {
	// 	throw new ApiError(httpStatus.NOT_FOUND, "This user not found");
	// }

    return isExist
};

export default isUserExist;
