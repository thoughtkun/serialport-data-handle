exports.dataParse = function (str) {
    var count = 0;
    var beatMin = 0;
    var beatSec = 0;
    var beat = 0;
    // 打件次数
    count = parseInt(str.slice(8, 16), 16);
    //节拍分钟
    beatMin = parseInt(str.slice(40, 42), 16);
    beatSec = parseInt(str.slice(42, 44), 16);
    beat = beatMin * 60 + beatSec;
    //第一次节拍设置为10，若节拍大于1分钟则设置为10
    if (beat == 0) {
        beat = 10;
    } else if (beat > 60) {
        beat = 30;
    }
    return {
        count: count,
        beat: beat
    }
}