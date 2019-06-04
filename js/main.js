function truncate(f,n){
    return Math.floor(f*10**n)/10**n
}

function runCal(){
    document.getElementById("result").setAttribute("style", "display:block")
    var leverage = document.getElementById("leverage").value
    var baLance = document.getElementById("baLance").value
    var lv1 = document.getElementById("lv1").value
    var lv2 = document.getElementById("lv2").value
    var percent = document.getElementById("profit").value
    var stdLot = document.getElementById("stdLot").value
    var com = document.getElementById("commission").value
    var sbMode = ""
    if(lv1 < lv2){
        sbMode = "sell"
    }else{
        sbMode = "buy"
    }
    var grid = Math.abs(lv1 - lv2)*stdLot
    var lot = (baLance*leverage)/((4*grid*leverage)+(7*lv1*stdLot))
    lot = truncate(lot,2)
    var target = (baLance * percent) + (lot*com)
    document.getElementById("target").innerHTML = truncate(target - (lot*com),2)
    var totalLoss = 4 * grid * lot
    document.getElementById("balanceLeft").innerHTML = truncate(baLance - totalLoss,2)
    baLance -= totalLoss
    document.getElementById("maxVolume").innerHTML = truncate(((baLance/lv1)*leverage)/stdLot,2)
    document.getElementById("recommendLot").innerHTML = lot
    document.getElementById("maxRecommendLot").innerHTML = truncate(lot * 7,2)
    if(sbMode == "buy"){
        lv1 = parseFloat(lv1)
        lv2 = parseFloat(lv2)
        document.getElementById("lv1Price").innerHTML = lv1
        document.getElementById("lv2Price").innerHTML = lv2
        document.getElementById("lv3Price").innerHTML = truncate(lv1 - ((2*grid)/stdLot),5)
        document.getElementById("lv1Tp").innerHTML = truncate(lv1 + (target/(lot*stdLot)),5)
        target+=lot*2*com
        var lv3 = lv1 - ((2*grid)/stdLot)
        var tp = (((2*lv2)+lv1)+(target/(lot*stdLot)))/3
        tp = truncate(tp,5)
        // alert(1.333 + 1.334)
        document.getElementById("lv2Tp").innerHTML = tp
        target+=lot*4*com
        tp2 = (((4*lv3)+(2*lv2) + lv1)+(target/(lot*stdLot)))/7
        tp2 = truncate(tp2,5)
        document.getElementById("lv3Tp").innerHTML = tp2
    }else if(sbMode == "sell"){
        lv1 = parseFloat(lv1)
        lv2 = parseFloat(lv2)
        document.getElementById("lv1Price").innerHTML = lv1
        document.getElementById("lv2Price").innerHTML = lv2
        document.getElementById("lv3Price").innerHTML = truncate(lv1 + ((2*grid)/stdLot),5)
        document.getElementById("lv1Tp").innerHTML = truncate(lv1 - (target/(lot*stdLot)),5)
        target+=lot*2*com
        var lv3 = lv1 + ((2*grid)/stdLot)
        var tp = (((2*lv2)+lv1)-(target/(lot*stdLot)))/3
        tp = truncate(tp,5)
        document.getElementById("lv2Tp").innerHTML = tp
        target+=lot*4*com
        tp2 = (((4*lv3)+(2*lv2) + lv1)-(target/(lot*stdLot)))/7
        tp2 = truncate(tp2,5)
        document.getElementById("lv3Tp").innerHTML = tp2
    }
}