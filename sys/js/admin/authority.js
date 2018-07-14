$(init);

function init() {
  
  if(cookie('userName') === 'root') return;

  $('.sub-menu-sel').empty()
  $('.sub-menu-buy').empty()
  $('.sub-menu-fin').empty()
  $('.sub-menu-ope').empty()
  $('.sub-menu-sys').empty()

  if (cookie2('sellPermission','roles') !== "") {
    doRirght( cookie2('sellPermission','roles').split(";"),'sub-menu-sel');
  }

  if (cookie2('buyPermission','roles') !== "") {
    doRirght( cookie2('buyPermission','roles').split(";"),'sub-menu-buy');
  }

  if (cookie2('finPermission','roles') !== "") {
    doRirght( cookie2('finPermission','roles').split(";"),'sub-menu-fin');
  }
}


function initMenu() {
  cookie2('sellPermission','roles').split(";");
}

function doRirght(i, o) {
	i.forEach(e=>{
  	arr = e.split(':')
  	item = `<li class="nav-item"><a href="#" class="nav-link " data-button="${arr[0]}"  data-type="${arr[2]}"><span class="title">${arr[1]}</span></a></li>`;
  	$(`.${o}`).append(item);
  })
}