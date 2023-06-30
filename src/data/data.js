
// servindo de intermedio usando comandos para acessar o banco
const { errors } = require('pg-promise');
const database = require('../infra/database');

exports.autenticateUser = async function (nome, senha){
    try{
        const usuario = await database.oneOrNone('select * from api_crud where nome = $1', [nome])
        if(!usuario){
            return null;
        }

        const senhaEncontrada = await senha
        if(!senha){
            return null
        }

        return usuario
        
    }catch (e) {
        console.log(e);
        throw new Error('Erro ao autenticar o usuário');
    }
}

exports.getProfiles = async function () {
    try{
        const queryResult = await database.any("select * from api_crud") 
        return queryResult
    }catch(e){
        console.log(e);
        throw new Error('Erro ao obter os perfis do banco de dados');
    }
    
}
exports.getProfileByNome = async function (nome){
    return database.oneOrNone('select * from api_crud where nome = $1',[nome])
    //
}
exports.getProfile = async function (id) {
    try{
        return await database.oneOrNone("select * from api_crud where id = $1", [id])

    }catch(e){
        console.log(e);
    }
}
exports.postProfile = async function (post) {
    const existeNome = await database.oneOrNone("select * from api_crud where nome = $1", [post.nome])
    if(existeNome){
    return "usuario já existente" 
    }
    const existeEmail = await database.oneOrNone("select * from api_crud where email = $1", [post.email])
    if(existeEmail){
    return "Email já cadastrado" 
    }
    try{
        const query = "insert into api_crud (nome, email, senha) values($1, $2, $3) returning *"
        const nome = post.nome;
        const email = post.email;
        const senha = post.senha.trim()
        const value = [nome, email, senha]
        
        return await database.one(query,value )
    } catch(e){
        console.log(`error ${e}`);
    }
}
exports.updateProfile = async function (post, id) {
    return await database.none("update api_crud set nome = $1, email = $2 where id = $3", [post.nome, post.email, id])
}
exports.updateLicença = async function (id) {
    // a ser feito
    return await database.query("")
}
exports.deleteProfile = async function (id) {
    return await database.none("delete from api_crud where id = $1", [id]);
}