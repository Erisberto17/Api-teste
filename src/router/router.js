const express = require('express');
const apiService = require('../service/ApiService');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


router.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    
    if(!nome || !senha){
        return res.status(400).json({msg:'Nome e Senha, são obrigatorios'})
    }
    const usuario = await apiService.getProfileByNome(nome)
    
    if(!usuario){
        return res.status(401).json({msg:'usuario não encontrado'})
    }
    const aSenha = usuario.senha
    console.log(aSenha)
    if(senha !== aSenha){
        return res.status(401).json({msg:"senha invalida"})
    }
    //verificação funcionando, faltando apenas o token, e futuramente segurança para a senha
    const id = usuario.id;
    const token = jwt.sign({id}, process.env.JWT_TOKEN) ;
    
    console.log('Entrou');
    console.log(token)
    return res.json({auth: true, token : token})
    
    
});

function verifyJWT(req, res, next){
    const tokenBody = req.headers['authorization'];
    const token = tokenBody && tokenBody.split(" ")[1];
    if(!token) return res.status(401).json({auth: false, message: 'No token provided.'})
    jwt.verify(token, process.env.JWT_TOKEN, (err, decoded) =>{
        if(err) return res.status(500).json({auth: false, message:'Falha na autenticação', err})
        req.userId = decoded.id;
        next()
    })
}

router.get('/',async (req, res) =>{
    //acesso limitado a admins
    const profiles = await apiService.getProfiles()
    try{
        res.json(profiles)

    }catch(e){
        console.log(e);
    }
})
router.get('/:id',verifyJWT, async (req, res) =>{
    //acessando perfil de usuario
    const id = req.params.id
    console.log(id);
    try{
        const profile = await apiService.getProfile(id)
        res.json(profile)
        
    }catch(e){
        console.log(e);
        res.json(e)
    }
})
router.post('/', async (req, res) =>{
    //cadastrando usuario
    const post = req.body;
    try{
        const newPost = await apiService.postProfile(post)
        res.status(201).json(newPost)
    } catch(e) {
        res.status(409).send(e.message)
    }

})
router.put('/:id', async (req, res) =>{
    //atualizando usuario
    const id = req.params.id;
    const post = req.body;
    
    const upApi = await apiService.getProfile(id);
    console.log(upApi)
   
    try{
        if(post.nome == ""){
            post.nome = upApi.nome;
        }
        if(post.email == ""){
            post.email = upApi.email;
        }
        const updatePost = await apiService.updateProfile(post, id)
        res.status(201).json(updatePost)
    } catch(e) {
        res.status(409).send(e.message)
    }
})
router.put('/:id', async (req, res) =>{
    //atualizando plano
    const updateLicença = apiService.updateLicença()

})
router.delete('/:id', async (req, res, next) =>{
    //deletando usuario
    try {
		await apiService.deleteProfile(req.params.id);
		res.status(204).end();
	} catch (e) {
		next(e);
	}
})
module.exports = router