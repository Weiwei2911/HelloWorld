window.onload = function () {
    imgLocation("container","box");
    /*模拟数据jason字符串*/
    var imgData={"data":[{"src":"56821ee9929c4.jpg"},{"src":"3081513633.jpg"},
            {"src":"20150622231952_V53Mx.jpeg"},{"src":"20160301123420_sAWxC.jpeg"},
            {"src":"20160521112933_cYiCd.jpeg"},{"src":"20161119222244_QJTZk.jpeg"}]}
    window.onscroll = function () {
        if(checkFlag()){
            var cparent = document.getElementById("container");
            for(var i = 0;i<imgData.data.length;i++){
                /*动态创建各元素并加载根视图*/
                var ccontent = document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);
                var boximg = document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);
                var img = document.createElement("img");
                img.src ="image/" + imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container","box");
        }
    }
}

function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent,"box");
    /*最后一张图片距顶部高度*/
    var lastContentHeight = ccontent[ccontent.length-1].offsetTop;
    /*滚动条滚动距离*/
    var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
    /*页面可视区高度*/
    var pageHeight = document.documentElement.clientHeight||document.body.clientHeight;
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
    console.log(lastContentHeight,scrollTop,pageHeight);
}

function imgLocation(parent,content) {/*获得有多少个图片*/
    //将parent下有多少个content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent,content);
    console.log(ccontent);
    var imgWidth= ccontent[0].offsetWidth;/*得到图片宽度，即内容的宽度*/
    var cols = Math.floor(document.documentElement.clientWidth / imgWidth); /*屏幕宽度除以图片宽度*/
    cparent.style.cssText = "width:" + imgWidth * cols + "px;margin:0px auto";/*固定化图片数目乘以个数得出应该设置的parent宽度，左右自适应 */

    var BoxHeightArr=[];
    for(var i=0;i<ccontent.length;i++){
        if(i<cols){/*只拿一排图片的高度*/
            BoxHeightArr[i] = ccontent[i].offsetHeight;
        }else{
            var minheight = Math.min.apply(null,BoxHeightArr);
            var minIndex = getminheightLocation(BoxHeightArr,minheight);
            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minheight +"px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
            BoxHeightArr[minIndex] = BoxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
}

function getminheightLocation(BoxHeightArr,minHeight) {
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i] == minHeight){
            return i;
        }
    }
}
/*得到图片内容数组*/
function getChildElement(parent,content) {
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i =0;i<allcontent.length;i++){
        if(allcontent[i].className==content){/*即如果是box则存到数组中*/
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}