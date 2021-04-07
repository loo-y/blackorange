
const fontFamily = `PingFangSC-Medium,Tahoma,"Lucida Grande",Verdana,"Microsoft Yahei",STXihei,hei`;
const fontSize = `30px`;
const fontWeight = `600`; // bold
const colorBlack = `#000`;
const colorWhite = `#fff`;
const colorOrange = `#fe9b02`;
const scale = 2;

const generateImage = (leftText, rightText)=> {
    console.log(leftText, rightText);
    // 移除前后空格
    leftText = leftText.replace(/^\s*/,'').replace(/\s*$/,'');
    rightText = rightText.replace(/^\s*/,'').replace(/\s*$/,'');
    if(!leftText || !rightText){
        alert("请保证左右两边都有文字");
        return false;
    }

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
    myCanvas.setAttribute('class', '');
    let blackViewWdith = myCanvas.offsetWidth;
    let blackViewHeight = myCanvas.offsetHeight;
    let topBottomTextMargin = 4; // 文字上下空隙
    let leftRightTextMargin = 4; // 文字左右空隙
    myCanvas.width = blackViewWdith * scale;
    myCanvas.height = blackViewHeight * scale;

    let cxt = myCanvas.getContext("2d");
    cxt.scale(scale, scale);

    let globalreRadius = 9, globalretWdith = rightLabel.offsetWidth + leftRightTextMargin * 2, globalretHeight = rightLabel.offsetHeight + topBottomTextMargin * 2;
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
    cxt.fillText(leftText, startX - leftLabel.offsetWidth - leftRightTextMargin, startY + leftLabel.offsetHeight - topBottomTextMargin - topBottomTextMargin/2);

    // 画右边文字
    cxt.fillStyle = colorBlack;
    cxt.fillText(rightText, startX + leftRightTextMargin, startY + rightLabel.offsetHeight - topBottomTextMargin- topBottomTextMargin/2);
 
    
    replaceCanvasByImage('png', myCanvas);
    return true;
}

const saveCanvasToLocal = (type, canvasDom, imageName)=>{
        let imgdata = canvasDom.toDataURL(type, 1);
        //1.0 将mime-type改为image/octet-stream, 强制让浏览器下载
        let fixtype = function(type){
            type = type.toLocaleLowerCase().replace(/jpg/i,'jpeg');
            let r = type.match(/png|jpeg|bmp|gif/)[0];
            return 'image/'+r;
        };
        // imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
        //2.0 将图片保存到本地
        let savaFile = (data, filename) =>
        {
            let save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
            save_link.href = data;
            save_link.download = filename;
            let event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            save_link.dispatchEvent(event);
            let blob = new Blob([''], { type: 'application/octet-stream' });
		    let url = URL.createObjectURL(blob);
            URL.revokeObjectURL(url);
        };
        var filename = (imageName || ''+new Date().getTime())+'.'+type;
        savaFile(imgdata, filename);
}

const replaceCanvasByImage = (type, canvasDom)=>{
    let dataImgId = "dataImg";
    let canvas_container = document.querySelector(".canvas_container");
    let dataImg;
    let hasDataImg = document.querySelector(`#${dataImgId}`);
    if(hasDataImg){
        dataImg = document.querySelector(`#${dataImgId}`);
    }else{
        dataImg = new Image();
        dataImg.setAttribute("id", "dataImg");
        canvas_container.appendChild(dataImg);
    }
    
    dataImg.src = canvasDom.toDataURL(`image/${type}`, 1);
    dataImg.width = canvasDom.width / scale;
    dataImg.height = canvasDom.height / scale;

    canvas_container.appendChild(dataImg);
    canvasDom.setAttribute('class', 'hidden');
}

const downloadClick = (type, canvasDom, imageName)=>{
    //判断是否是IE
    let fileName = (imageName || ''+new Date().getTime())+'.'+type;
    if (window.navigator.msSaveBlob) {
        //IE10，IE11 ,Edage
        let blob = canvasDom.msToBlob();
        window.navigator.msSaveBlob(blob, fileName);
    } else {
        let dataImg = new Image();
        dataImg.setAttribute("id", "dataImg");
        dataImg.src = canvasDom.toDataURL(`image/${type}`, 1);
        dataImg.setAttribute('class', 'hidden');
        document.querySelector('body').appendChild(dataImg);
        let alink = document.createElement("a");
        alink.setAttribute('class', 'hidden');
        alink.href = canvasDom.toDataURL(`image/${type}`, 1);
        alink.target = "_blank";
        // alink.download = fileName;
        alink.click();
        document.querySelector("#dataImg").remove();
    }
}

const main = ()=> {
    let leftInput = document.querySelector("#leftInput");
    let rightInput = document.querySelector("#rightInput");
    let generateBtn = document.querySelector("#generateBtn");
    let saveBtnContainer = document.querySelector("#save_btn_container");
    let myCanvasDom = document.querySelector("#myCanvas");
    // saveBtnContainer.addEventListener('click', ()=>{saveCanvasToLocal('png', myCanvasDom)});
    saveBtnContainer.addEventListener('click', ()=>{downloadClick('png', myCanvasDom)});

    generateBtn.addEventListener('click', ()=>{
        let isSuccess = generateImage(leftInput.value, rightInput.value);
        // if(isSuccess){
        //     saveBtnContainer.setAttribute("class", "button_container");
            
        // }else{
        //     saveBtnContainer.setAttribute("class", "button_container hidden");
        // }
    });
}

main();
