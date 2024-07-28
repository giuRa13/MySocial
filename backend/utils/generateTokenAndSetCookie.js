import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "1h",
    });

    res.cookie("jwt", token, {
        httpOnly: true, // prevent XSS attack cross-site scripting attacks(can not acces by javascript)
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        maxAge: 60 * 60 *1000,
    });

    return token;
};

export default generateTokenAndSetCookie;