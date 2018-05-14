var http = require('http')
var request = require('request');
const LOCAL_HOST = '10.190.109.202';
const SIT_HOST = '10.138.227.219';
const PROD_HOST = '10.135.26.100';

exports.sendToServer = function (data) {
    request({
        url: 'http://10.190.109.202:8080/mplm/webservice/syncNbMould',
        method: 'POST',
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: data,
    }, function (error, response, body) {
        if (response.statusCode == 200) {
            if (body.code == 0) {
                console.log(new Date().toLocaleString() + '：发送成功！')
            } else {
                console.log(body.message || '')
            }
        } else {
            console.log('error: ' + response.statusCode)
            console.log(body)
        }
    })
}