// let userType = cookie('userType');
const URL_MEMBERSHIP_FEE_TYPE = '/membership_fee_type';//获取 会员套餐
const URL_MEMBERSHIP_TRANSFER='/membership_transfer';//vip充值保存
const URL_MEMBERSHIP_LIST='/membership_list';//获取当前用户会员充值记录
const TMPL_VIP_RECHARGE_LIST = '/tmpl/list_vipRecharge.tmpl';


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

    $('#acountList input:eq(0)').trigger('click');
    for (item in BANKS) {
        $('#bankName').append('<option >' + BANKS[item] + '</option>')
    }
    
    promiseData('GET', URL_MEMBERSHIP_FEE_TYPE, null, cbMembershipType);
   


    $("#vipRechargeForm").validate({
        rules: rules,
        submitHandler: (e) => { doSave() }
    })

    $('body').on('click', '#resetBtn', doResetForm);
    $('body').on('change', '#membershipFeeId', doSetMoney);
    

}

function cbMembershipType(e){
    if (e.code == 0) {
        console.log('cbMembershipType');
        console.log(e);
        $("#membershipFeeId").empty();
        let str='<option value=""></option>';
        $.each(e.data, function(index, val) {
            str+='<option value="'+val.id+'" money="'+val.money+'">'+val.money+'元/'+val.name+'</option>';
        });
        $("#membershipFeeId").append(str);
    } else if (e.code == -1) {
        relogin();
    } else if (e.code == 99) {
        notifyInfo(e.message);
    }


}
function doSetMoney(e){
    let obj=e.target;
    $("#transferMoney").val($(obj).find("option:selected").attr("money"));

}


/*function initRechargeTask(param = pageData) {
    Object.assign(param, { transferType: 1 });
    TmplData(TMPL_SELL_RECHARGE_LIST, [URL_SELL_ALL_RECHARGE, encodeQuery(param)].join('?'), null, cbRechargeTask)
}*/
function initVipRecharge(param = pageData) {
    Object.assign(param, { transferType: 1 });
    TmplData(TMPL_VIP_RECHARGE_LIST, [URL_MEMBERSHIP_LIST, encodeQuery(param)].join('?'), null, cbVipRecharge)
}


function cbVipRecharge(r, e) {
    /*console.log('r.e')
    console.log(r);
    console.log(e)*/
    let data = e[0];
    if (data.code == 0) {
        Object.assign(data, pageData);
        // $(".portlet-body .table").remove();
        $(".recharge-table").prepend($.templates(r[0]).render(data, rdHelper));
    } else if ([-1, 99].includes(e.code)) {
        relogin();
    }
}

function doResetForm() {
    document.getElementById("vipRechargeForm").reset();
    $('#file-input').fileinput('clear')
}

function doSave(e) {
    var pic = $('#upload').attr('picurl');
    if (isNull(pic)) {
        notifyInfo('请上传图片！')
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
    promiseData('POST', URL_MEMBERSHIP_TRANSFER, JSON.stringify(data), cbSave)
}

function cbSave(e) {
    if (e.code == 0) {
        alertBox(MSG_RECHARGE_SUCCESS,cbGoto);
        // msgbox(MSG_RECHARGE_SUCCESS, MSG_LOOKUP_RECHARGE, cbGoto)
    } else if (e.code == -1) {
        relogin();
    } else if (e.code == 99) {
        notifyInfo(e.message);
    }
}

function cbGoto(result) {
    
    parent.$("#mainframe").attr('src', HOST+'/vipRecharge.html');
    
}