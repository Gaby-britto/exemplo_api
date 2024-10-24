const validateAdmin  = (req, res, next) => {
    const {nome, email,senha} = req.body;

    if(!nome || !email || !senha){
        return res.status(400).json({
            msg: "Campos inválidos, revise",
        });
    }

    return next();

};

const validateAdminId = (req, res, next) => {
    const {id} = req.params;

    if(!id){
        return res.status(400).json({
            msg: "Parâmetro faltando",
        });
    }

    return next();
}

module.exports = {validateAdmin, validateAdminId};