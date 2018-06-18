$(init)

function init() {
  $('#qrcode').qrcode(HOST + '/index.html?invite=' + cookie("invitecode"));
  $('#invertLink').val(HOST + '/index.html?invite=' + cookie("invitecode"));

  $('#invite').text( cookie("invitecode"));

  $('#copyCnt').on('click', doCopy);
}


function doCopy() {
  var Url2=document.getElementById("invertLink");  
  Url2.select(); // 选择对象  
  document.execCommand("Copy"); // 执行浏览器复制命令  
  lert("已复制好，可贴粘。"); 
}