$(init);

function init() {
  $('body').on('click', '#resetBtn', doResetForm);
  $('body').on('click', '#saveBtn', doSave);

  
  $('#typepicker').typepicker();
  $('#pick').distpicker();
}

function doResetForm() {
  document.getElementById("form-bind").reset()
}

function uploadaaa() {
  var file = $('#upload')[0].files[0];
  var fileSize = file.size;  
  var maxSize = 1048576;    //最大1MB  
    
  if(parseInt(fileSize) >= parseInt(maxSize)){  
      notifyInfo('上传的文件不能超过1MB');  
      return false;  
  }else{    
    var form = new FormData();
    form.append("file", file);
    $.ajax({    
        url: HOST + "/users/upload",   
        type: 'POST',    
        data: form,       
        async:false,
        processData: false,  
        contentType: false,
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
    }).done(function(e) {
      console.log(e);
    })   
  }
}

function cbUpload(e) {
  console.log(e);
}

var bind = function(data){
  return new Promise(function(resolve, reject){
    obj = { 
      "type": $('#shop_type').val(),
      "address": $('#shop_addr').val(),
      "name": $('#shop_name').val(),
      "shopurl": $('#shop_url').val(),
      "businesstype": $('#shop-businesstype').val(),
      "subtype": $('#shop-subtype').val(),
      "addressProvince": $('#shop-province').val(),
      "addressCity": $('#shop-city').val(),
      "addressCounty": $('#shop-county').val(),
      "shopimg1": data
    };

    $.ajax({
      type: 'POST',
      url: HOST + '/users/shop_bind',
      dataType: "json",
      contentType: "application/json",
      data:JSON.stringify(obj),
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).done(function(e) {
      msgbox("绑定商店成功！","继续绑定商店","进去店铺管理",cbGoto)
    }) 
  })
}

function doSave() {
  uploadFile().then((data) => { bind(data) })
}


function cbGoto(result) {
  if (!result) {
    parent.$("#mainframe").attr('src','listShop.html');
  }
}

