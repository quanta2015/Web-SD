$(init)

function init() {
  $('#qrcode').qrcode(HOST + '/index.html?invite=' + cookie("invitecode"));

  $('#invite').text( cookie("invitecode"));
}

