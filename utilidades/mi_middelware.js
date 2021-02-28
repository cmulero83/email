// Inicio configruacion Middelware

function logger(req, res, next){
    console.log(`Ruta recivida: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next()
}

module.exports = {
    'logger' : logger
}