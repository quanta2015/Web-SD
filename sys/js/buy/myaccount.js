$(init);

function init() {
  $('body').on('click', '#withdraw', ()=>{ goto('withdraw.html') });
  $('body').on('click', '#withdraw-detail', ()=>{ goto('withdraw.html') });
}

