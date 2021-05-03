const fs = require('fs')
const path = require('path')

module.exports = (caminho, nomeDoArquivo, callbackImagemCriada) => {
    const tipo = path.extname(caminho)
    const novoCaminho = `./assets/imagens/${nomeDoArquivo}${tipo}`

    const tiposValidos = ['jpg', 'png', 'jpeg']

    const tipoEhValido = tiposValidos.indexOf(tipo.substring(1)) > -1

    if (tipoEhValido){
        fs.createReadStream(caminho)
            .pipe(fs.createWriteStream(novoCaminho))
            .on('error', (error) => console.log(error))
            .on('finish', () => callbackImagemCriada(false, novoCaminho))
    } else {
        console.log('Tipo inválido!')
        const erro = 'Tipo inválido'

        callbackImagemCriada(erro)
    }

}

