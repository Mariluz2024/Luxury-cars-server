const router = require("express").Router();

//POST "/api/auth/signup"
 router.post("/signup", async(req, res, next) => {

    console.log(req.body)
    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({errorMessage: "nombre de usuario, correo electronico y contraseña son campos obligatorios"})
        return
    }

    if(username.length < 3) {
        res.status(400).json({errorMessage: "nombre de usuario debe tener 3 caracteres como minimo"})
        return
    }

    res.send("probando, todo bien")
 })


//POST "/api/auth/login"



//GET "/api/auth/verify"


module.exports = router;