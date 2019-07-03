const Model = require('../models/index')
const Monster = Model.Monster
class ControllerMonster {
    static getAll(req,res){
        Monster.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static findMonster(req,res){
        Monster.findByPk(req.parms.id)
        .then(dataMonster => {
            res.render('testView.ejs',{dataMonster})
        })
        .catch(err =>{
            res.send(err.message)
        })
    }

    static updateMonster(req,res){
        Monster.update(req.body,{where : {'id' : req.body.id}})
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.send(err.message)
        })
    }
}
ControllerMonster 
module.exports = ControllerMonster