// 图片下载函数
export const useimgDownload = (url,fileName)=>{
    fetch(url)
            .then(response => response.blob())
            .then(blob => {
                // 创建隐藏的a标签并设置其属性
                var link = document.createElement('a');
                link.style.display = 'none';
                document.body.appendChild(link);

                var url = window.URL.createObjectURL(blob);
                link.href = url;
                link.download = fileName;

                // 模拟点击事件进行下载
                link.click();

                // 下载完成后移除a标签
                window.URL.revokeObjectURL(url);
                document.body.removeChild(link);
            });
}


//清空所有cookie
export const clearCookie = ()=> {
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (var i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }
    }
}