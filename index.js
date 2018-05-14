var dataParse = require('./dataParse').dataParse //串口数据解析模块
var sendToServer = require('./request').sendToServer //http请求模块
const querystring = require('querystring');
var SerialPort = require('serialport'); //串口数据获取模块
var Readline = SerialPort.parsers.Readline;
var ByteLength = SerialPort.parsers.ByteLength;
var count = 0; //打件次数
var beat = 0; //心跳

var port = new SerialPort('COM3', {
    baudRate: 9600
});
var parser = port.pipe(new ByteLength({
    length: 46
}));
parser.on('data', function (data) {
    if (data == '' || data == null) {
        data = 'FFFFD801000000A8000064000000000000000000040BF4';
    }
    var data = data.toString();
    count = dataParse(data).count;
    beat = dataParse(data).beat;
    console.log("串口数据为：" + data);
    console.log("打件次数：" + count);
    console.log("打件节拍(s)：" + beat);
    var params = [{
        "mcode": "M1",
        "mbeat": beat,
        "cumulativeCount": count,
        "position": "青岛"
    }]
    sendToServer(params);
});