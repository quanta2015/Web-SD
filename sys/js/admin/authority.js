$(init);

function init() {
  
  if(cookie('userName') === 'root') return;

  $('.sub-menu-sel').empty()
  $('.sub-menu-buy').empty()
  $('.sub-menu-fin').empty()
  $('.sub-menu-ope').empty()
  $('.sub-menu-sys').empty()
 
  sel = cookie2('sellPermission','roles').split(";");
  buy = cookie2('buyPermission','roles').split(";");
  fin = cookie2('finPermission','roles').split(";");
  // ope = cookie2('opePermission','roles').split(";");


  doRirght(sel,'sub-menu-sel');
  doRirght(buy,'sub-menu-buy');
  doRirght(fin,'sub-menu-fin');
  // doRirght(ope,'sub-menu-ope');

}

function doRirght(i, o) {
	i.forEach(e=>{
  	arr = e.split(':')
  	item = `<li class="nav-item"><a href="#" class="nav-link " data-button="${arr[0]}"  data-type="${arr[2]}"><span class="title">${arr[1]}</span></a></li>`;
  	$(`.${o}`).append(item);
  })
}