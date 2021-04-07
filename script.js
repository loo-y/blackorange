
const fontFamily = `PingFangSC-Medium,Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei`;
const fontSize = `30px`;
const fontWeight = `600`; // bold
const colorBlack = `#000`;
const colorWhite = `#fff`;
const colorOrange = `#fe9b02`;

const generateImage = (leftText, rightText)=> {
    console.log(leftText, rightText);
    let canvas_container_class = "canvas_container";
    let canvasContainer = document.querySelector("." + canvas_container_class);
    canvasContainer.setAttribute('class', canvas_container_class);

    let leftLabel = document.querySelector("#leftLabel");
    let rightLabel = document.querySelector("#rightLabel");
    // 左边
    leftLabel.style.fontFamily = fontFamily;
    leftLabel.style.fontSize = fontSize;
    leftLabel.style.fontWeight = fontWeight;
    leftLabel.innerText = leftText;
    // 右边
    rightLabel.style.fontFamily = fontFamily;
    rightLabel.style.fontSize = fontSize;
    rightLabel.style.fontWeight = fontWeight;
    rightLabel.innerText = rightText;

    // 获取左边和右边文字的长度
    console.log(rightLabel.offsetHeight, rightLabel.offsetWidth);

    let myCanvas = document.querySelector("#myCanvas");
    let blackViewWdith = myCanvas.offsetWidth;
    let blackViewHeight = myCanvas.offsetHeight;
    let topBottomTextMargin = 4; // 文字上下空隙
    let leftRightTextMargin = 5; // 文字左右空隙
    myCanvas.width = blackViewWdith;
    myCanvas.height = blackViewHeight;

    let cxt = myCanvas.getContext("2d");
    
    let globalreRadius = 8, globalretWdith = rightLabel.offsetWidth + leftRightTextMargin * 2, globalretHeight = rightLabel.offsetHeight + topBottomTextMargin * 2;
    //画圆角矩形
    let radius= globalreRadius || 10, //圆角的半径
    retWidth = globalretWdith || 150, //矩形的宽
    retHeight = globalretHeight || 80; //矩形的长


    if(globalretWdith > blackViewWdith / 2){
        alert("右边文字超出图片宽度");
        return false;
    }
    
    if((leftLabel.offsetWidth + leftRightTextMargin * 2) > blackViewWdith / 2){
        alert("左边文字超出图片宽度");
        return false;
    }


    let startX = blackViewWdith/2, //起始位X
    startY = parseInt((blackViewHeight - retHeight) / 2); //起始位Y
    // 开始画图
    cxt.beginPath();

    // 背景黑色
    cxt.fillStyle = colorBlack;
    cxt.fillRect(0, 0, myCanvas.offsetWidth, myCanvas.offsetHeight);


    console.log(myCanvas.offsetWidth, myCanvas.offsetHeight, myCanvas.width, myCanvas.height)
    console.log("startX:", startX, "startY:", startY, "radius:", radius);
    // 右边文字背景
    cxt.fillStyle = colorOrange;
    cxt.moveTo(startX+radius, startY);
    // cxt.moveToPoint(startX+radius, startY); // jsbox
    cxt.lineTo(startX+retWidth-radius, startY);
    // cxt.addLineToPoint(startX+retWidth-radius, startY); // jsbox
    // cxt.arcTo(startX+retWidth, startY, startX+retWidth, startY+radius, radius);
    cxt.arc(startX+retWidth-radius, startY+radius, radius, 1.5*Math.PI, 0);
    // cxt.addArc(startX+retWidth-radius, startY+radius, radius, 0, 1.5*Math.PI, true); // jsbox
    // cxt.moveTo(startX+retWidth, startY+radius);
    // cxt.addLineToPoint(startX+retWidth, startY+radius); // jsbox
    cxt.lineTo(startX+retWidth, startY+retHeight-radius);
    // cxt.addLineToPoint(startX+retWidth, startY+retHeight-radius); // jsbox
    cxt.arc(startX+retWidth-radius, startY+retHeight-radius, radius, 0, 0.5*Math.PI, false);
    // cxt.addArc(startX+retWidth-radius, startY+retHeight-radius, radius, 0, 0.5*Math.PI, false); // jsbox
    // cxt.moveTo(startX+retWidth-radius, startY+retHeight);
    // cxt.addLineToPoint(startX+retWidth-radius, startY+retHeight); // jsbox
    cxt.lineTo(startX+radius, startY+retHeight);
    // cxt.addLineToPoint(startX+radius, startY+retHeight); // jsbox
    cxt.arc(startX+radius, startY+retHeight-radius, radius, 0.5*Math.PI, 1*Math.PI, false);
    // cxt.addArc(startX+radius, startY+retHeight-radius, radius, 0.5*Math.PI, 1*Math.PI, false); // jsbox
    // cxt.moveTo(startX, startY+retHeight-radius);
    // cxt.addLineToPoint(startX, startY+retHeight-radius); // jsbox
    cxt.lineTo(startX, startY+radius);
    // cxt.addLineToPoint(startX, startY+radius); // jsbox
    cxt.arc(startX+radius, startY+radius, radius, 1*Math.PI, 1.5*Math.PI, false);
    // cxt.addArc(startX+radius, startY+radius, radius, 1*Math.PI, 1.5*Math.PI, false); // jsbox
    cxt.fill();
    

    // 画左边文字
    cxt.font = [fontWeight, fontSize, fontFamily].join(' ');
    cxt.fillStyle = colorWhite;
    cxt.fillText(leftText, startX - leftLabel.offsetWidth - leftRightTextMargin, startY + leftLabel.offsetHeight - topBottomTextMargin);

    // 画右边文字
    cxt.fillStyle = colorBlack;
    cxt.fillText(rightText, startX + leftRightTextMargin, startY + rightLabel.offsetHeight - topBottomTextMargin);
 
    return true;
}

const saveCanvasToLocal = (type, canvasDom, imageName)=>{
        //cavas 保存图片到本地  js 实现
        //------------------------------------------------------------------------
        //1.确定图片的类型  获取到的图片格式 data:image/Png;base64,......
        // let type ='png';//你想要什么图片格式 就选什么吧
        let imgdata = canvasDom.toDataURL(type);
        //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
        let fixtype = function(type){
            type = type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
            let r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/'+r;
        };
        imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
        //3.0 将图片保存到本地
        var savaFile = (data,filename) =>
        {
            let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;
            let event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
        };
        var filename = (imageName || ''+new Date().getTime())+'.'+type;
        //我想用当前秒是可以解决重名的问题了 不行你就换成毫秒
        savaFile(imgdata, filename);
}

const main = ()=> {
    let leftInput = document.querySelector("#leftInput");
    let rightInput = document.querySelector("#rightInput");
    let generateBtn = document.querySelector("#generateBtn");
    let saveBtnContainer = document.querySelector("#save_btn_container");
    let myCanvasDom = document.querySelector("#myCanvas");
    saveBtnContainer.addEventListener('click', ()=>{saveCanvasToLocal('png', myCanvasDom)});
    
    generateBtn.addEventListener('click', ()=>{
        let isSuccess = generateImage(leftInput.value, rightInput.value);
        if(isSuccess){
            saveBtnContainer.setAttribute("class", "button_container");
            
        }else{
            saveBtnContainer.setAttribute("class", "button_container hidden");
        }
    });
}

main();
