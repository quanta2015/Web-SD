// let userType = cookie('userType');



let rules = {
    money: {
        required: !0,
        number: !0
    },
    person: {
        required: !0
    },
    bank: {
        required: !0
    },
    number: {
        required: !0,
        number: !0
    },
    fromAccount: {
        required: !0,
        number: !0
    },
    vipmoneylist:{
        required: !0
    }
}
let pageData = Object.assign({}, PAGE_DATA);

$(init);


function init() {
    initList();
    // initRechargeTask();//选择充值列表
    initVipRecharge();//选择充值列表
}

function initList() {
    $('#remark').val('商家ID:' + cookie('mobile'));
    $('#acountList input:eq(0)').trigger('click');
    for (item in BANKS) {
        $('#bankName').append('<option >' + BANKS[item] + '</option>')
    }
    
    promise('GET', URL_MEMBERSHIP_FEE_TYPE, null, cbMembershipType, null);

    $("#vipRechargeForm").validate({
        rules: rules,
        submitHandler: (e) => { doSave() }
    })

    $('body').on('click', '#resetBtn', doResetForm);
    $('body').on('change', '#membershipFeeId', doSetMoney);
    

}

function cbMembershipType(e){
    $("#membershipFeeId").empty();
    let str='<option value=""></option>';
    $.each(e, function(index, val) {
        str+='<option value="'+val.id+'" money="'+val.money+'">'+val.money+'元/'+val.name+'</option>';
    });
    $("#membershipFeeId").append(str);
}
function doSetMoney(e){
    let obj=e.target;
    $("#transferMoney").val($(obj).find("option:selected").attr("money"));
}

function initVipRecharge(param = pageData) {
    Object.assign(param, { transferType: 1 });
    promiseTmpl('GET', TMPL_VIP_RECHARGE_LIST, [URL_MEMBERSHIP_LIST, encodeQuery(param)].join('?'), null, cbVipRecharge)
}


function cbVipRecharge(r, e) {
    let ret = e;
    Object.assign(ret, pageData);
    // $(".portlet-body .table").remove();
    $(".recharge-table").prepend($.templates(r).render(ret, rdHelper));
}

function doResetForm() {
    document.getElementById("vipRechargeForm").reset();
    $('#file-input').fileinput('clear')
}

function doSave(e) {
    var pic = $('#upload').attr('picurl');
    if (isNull(pic)) {
        errorInfo('请上传图片！')
        return;
    }

    data = {
        membershipFeeId:$("#membershipFeeId").val(),
        toAccount: $("input[name='toAccount']:checked").val(),
        transferMoney: $('#transferMoney').val(),
        bankName: $('#bankName').val(),
        transferPerson: $('#transferPerson').val(),
        fromAccount: $('#fromAccount').val(),
        remark: $('#remark').val(),
        picture: $('#upload').attr('picurl'),
        transferType: 1
    }
    console.log(JSON.stringify(data));
    promise('POST', URL_MEMBERSHIP_TRANSFER, JSON.stringify(data), cbSave, null)
}

function cbSave(e) {
    alertBox(MSG_RECHARGE_SUCCESS,cbGoto);
}

function cbGoto(result) {
    parent.$("#mainframe").attr('src', HOST+'/vipRecharge.html');
}