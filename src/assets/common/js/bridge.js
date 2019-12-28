   //这是必须要写的，用来初始化一些设置, 照抄就可以
   function setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    var WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
}

//这也是固定的， OC 调JS ， 需要给OC调用的函数必须写在这个函数里面
setupWebViewJavascriptBridge(function(bridge) {
                             
      bridge.registerHandler('testJSFunction', function(data, responseCallback) {
                                  alert('JS方法被调用,传入参数:'+data);
                                  responseCallback('js执行过了');
                                  })
     //无参数和回调
     bridge.registerHandler('OCCallJSFunction', function( ){
                      alert('OCCallJSFunction')
                        })
})
                 
//这个 shareClick 就是 原生那边 注入的函数 ， 通过这个方法来调用原生 和传值
//parmas 是JS 给OC的数据 ， response 是 OC函数被调用之后 再 告诉JS 我被调用了
//比如微信分享，传Dic给原生 ， 原生分享成功后再把结果回调给JS 进行处理
 function shareClick() {
     var params = {'title':'测试分享的标题','content':'测试分享的内容','url':'http://www.baidu.com'};
     WebViewJavascriptBridge.callHandler('shareClick',params,function(response) { 
           alert(response); 
});
}    
function changeColor(){            WebViewJavascriptBridge.callHandler('changeColor',function(resposne){                
        document.getElementById("changeColorBtn").style.background = resposne;
    });     
}
// //判断机型
// let u = navigator.userAgent;

// function setupWebViewJavascriptBridge(callback) {
//   //var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
//   //判断ios 还是Android
  
//   if (/(iPhone|iPad|iPod|iOS)/i.test(u)) {
//     if (window.WebViewJavascriptBridge) {
//       return callback(window.WebViewJavascriptBridge)
//     }
//     if (window.WVJBCallbacks) {
//       return window.WVJBCallbacks.push(callback)
//     }
//     window.WVJBCallbacks = [callback]
//     let WVJBIframe = document.createElement('iframe')
//     WVJBIframe.style.display = 'none'
//     WVJBIframe.src = 'https://__bridge_loaded__'
//     document.documentElement.appendChild(WVJBIframe)
//     setTimeout(() => {
//       document.documentElement.removeChild(WVJBIframe)
//     }, 0)
    
//   }
// }

// //安卓注册事件监听
// function connectWebViewJavascriptBridge(callback) {
//   if (window.WebViewJavascriptBridge) {
//     callback(WebViewJavascriptBridge)
//   } else {
//     document.addEventListener(
//       'WebViewJavascriptBridgeReady',
//       function () {
//         callback(WebViewJavascriptBridge)
//       },
//       false
//     );
//   }
// }

// connectWebViewJavascriptBridge(function (bridge) {
//   //初始化
//   if (!/(iPhone|iPad|iPod|iOS)/i.test(u)) {
//     console.log("初始化")
//     bridge.init(function (message, responseCallback) {
//       //var data = {'Javascript Responds': 'Wee!'};
//       responseCallback(data);
//     });
//   }
// });


// export default {
//   callHandler(name, data, callback) {
//     setupWebViewJavascriptBridge(function (bridge) {
//       bridge.callHandler(name, data, callback)
//     })
//   },
//   registerhandler(name, callback) {
//     setupWebViewJavascriptBridge(function (bridge) {
//       bridge.registerHandler(name, function (data, responseCallback) {
//         callback(data, responseCallback)
//       })
//     })
//   }
// }