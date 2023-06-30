//servindo de intermedio com as rotas
const apiData = require('../data/data');

exports.autenticateUser = async function (nome, senha){
    return await apiData.autenticateUser(nome, senha)
}

exports.getProfiles = async function (){
    return await apiData.getProfiles()
    //
}
exports.getProfileByNome = async function (nome){
    return await apiData.getProfileByNome(nome)
    //
}
exports.getProfile = async function (id){
    return await apiData.getProfile(id)
    //
}
exports.postProfile = async function (post){
    return await apiData.postProfile(post)
    //
}
exports.updateProfile = async function (post, id){
    return await apiData.updateProfile(post, id)
    //
}
exports.updateLicença = async function (post, id){
    return await apiData.updateLicença(post, id)
}
exports.deleteProfile = async function (id){
    return await apiData.deleteProfile(id)
    //
}