const LOGIN_IMGS = [
  'img/login01.jpg',
  'img/login02.jpg'
];

function jsonData(urlTmpl, urlData, cb, err) {
  $.when($.ajax(urlTmpl), $.ajax(urlData)).done(cb).fail(err);
}


