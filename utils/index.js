const bcrypt = require('bcrypt');

const cryptPassword = async (password)=>{
    const salt = await bcrypt.genSalt(5);

    return bcrypt.hash(password, salt)
}
const exlcude = (model, keys) => {
    return Object.fromEntries(
        Object.entries(model).filter(([key]) => !keys.includes(key))
    );
}

module.exports = {
    cryptPassword,
    exlcude
}