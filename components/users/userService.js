import User from "./userModel.js"

class UserService {
    static async getById(id) {
        try {
            return await User.findById(id)
        } catch (err) {
            return {
                error: err
            }
        }
    }

    static async deleteById(id) {
        try {
            return await User.findByIdAndDelete(id)
        } catch (err) {
            return {
                error: err
            }
        }
    }

    static async updateById(id, user) {
        try {
            const update = {
                $set: { ...user }
            }

            return await User.findByIdAndUpdate(id, update)
        } catch (err) {
            return {
                error: err
            }
        }
    }
}

export default UserService