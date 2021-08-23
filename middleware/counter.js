'use strict';

var counterDAO = require('../model/counterDAO')
var dayjs = require('dayjs')


function counter(req, res, next) {
    if(!req.cookies.count && req.cookies['userId']){
        res.cookie('count',"",{maxAge:3600000,httpOnly:true});
        var now = new Date();
        var date = now.hetFullYear() + "/" + now.getMonth() + "/" + now.getDate();
        var parameters = {
            name : 'vistors',
            totalCount: 1,
            todayCount: 1,
            date:date,
        }
        if(date != req.cookies.countDate){
            res.cookie('countDate',date,{maxAge:86400000,httpOnly:true});
            counterDAO.findCount(parameters).then(
                (db_data) =>{
                    console.log(parameters)
                    if(db_data===null){
                        counterDAO.insertCount(parameters).then(
                            () => {}
                        ).catch(err =>{
                            return next();
                        })
                    } else {
                        if(db_data[0].date == parameters.date){
                            counterDAO.updateCount(db_data).then(
                                () => {}
                            ).catch(err =>{
                                return next();
                            })
                        }
                        else{
                            counterDAO.newUpdateCount(db_data).then(
                                () => {}
                            ).catch(err =>{
                                return next();
                            })
                        }
                    }
                }
            ).catch(err =>{
                return next();
            })
        }
    }
    return next();
}
module.exports = {
    counter
}