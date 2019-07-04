const Model = require('../models/index')
const Monster = Model.Monster
class ControllerMonster {
    static getAll(req,res){
        Monster.findAll({order : ["id"]})
        .then(monsters => {
            res.render('monsters.ejs',{monsters})
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static addPage(req,res){
        res.render('monster-add.ejs')
    }

    static add(req,res){
        Monster.create(req.body)
        .then(() => {
            res.redirect('/admin/monsters')
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static getOne(req,res){
        Monster.findOne({where : {name : req.params.name}})
        .then(monster => {
            res.render('monster-edit.ejs',{monster})
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static updateMonster(req,res){
        Monster.update(req.body,{where : {'id' : req.body.id}})
        .then(() => {
            res.redirect('/admin/monsters')
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static delete(req,res){
        Monster.destroy({where : {id : req.params.id}})
        .then(() => {
            res.redirect('/admin/monsters')
        })
        .catch(err =>{
            res.send(err.message)
        })
    }
}
module.exports = ControllerMonster