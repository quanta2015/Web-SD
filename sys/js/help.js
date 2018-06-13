var taobaoCommission = [
	{price: '0-50',goldcoin: 9,commission: 9},
	{price: '50.01-100',goldcoin: 10,commission: 10},
	{price: '100.01-150',goldcoin: 11,commission: 11},
	{price: '150.01-250',goldcoin: 12,commission: 12},
	{price: '250.01-350',goldcoin: 14,commission: 14},
	{price: '350.01-450',goldcoin: 16,commission: 16},
	{price: '450.01-550',goldcoin: 18,commission: 18},
	{price: '550.01-650',goldcoin: 19,commission: 19},
	{price: '650.01-750',goldcoin: 20,commission: 20},
	{price: '750.01-850',goldcoin: 21,commission: 21},
	{price: '850.01-1000',goldcoin: 24,commission: 24},
	{price: '1000.01-1500',goldcoin: 28,commission: 28},
	{price: '1500.01-2000',goldcoin: 32,commission: 32},
	{price: '2000.01-3000',goldcoin: 40,commission: 40},
	{price: '3000.01-4000',goldcoin: 48,commission: 48},
	{price: '4000.01-5000',goldcoin: 56,commission: 56},
	{price: '5000.01-6000',goldcoin: 64,commission: 64},
	{price: '6000.01-7000',goldcoin: 74,commission:74},
	{price: '7000.01-8000',goldcoin: 84,commission: 84},
	{price: '8000.01-9000',goldcoin: 94,commission: 94},
	{price: '9000.01-10000',goldcoin: 115,commission: 115},
	{price: '10000以上',goldcoin: 200,commission: 200}
];
var jingdongCommission = [
	{price: '0-50',goldcoin: 6,commission: 6},
	{price: '50.01-100',goldcoin: 7,commission: 7},
	{price: '100.01-150',goldcoin: 8,commission: 8},
	{price: '150.01-250',goldcoin: 9,commission: 9},
	{price: '250.01-350',goldcoin: 11,commission: 11},
	{price: '350.01-450',goldcoin: 12,commission: 12},
	{price: '450.01-550',goldcoin: 14,commission: 14},
	{price: '550.01-650',goldcoin: 15,commission: 15},
	{price: '650.01-750',goldcoin: 16,commission: 16},
	{price: '750.01-850',goldcoin: 17,commission: 17},
	{price: '850.01-1000',goldcoin: 20,commission: 20},
	{price: '1000.01-1500',goldcoin: 24,commission: 24},
	{price: '1500.01-2000',goldcoin: 28,commission: 28},
	{price: '2000.01-3000',goldcoin: 36,commission: 36},
	{price: '3000.01-4000',goldcoin: 44,commission: 44},
	{price: '4000.01-5000',goldcoin: 52,commission: 52},
	{price: '5000.01-6000',goldcoin: 60,commission: 60},
	{price: '6000.01-7000',goldcoin: 70,commission:70},
	{price: '7000.01-8000',goldcoin: 80,commission: 80},
	{price: '8000.01-9000',goldcoin: 90,commission: 90},
	{price: '9000.01-10000',goldcoin: 110,commission: 110},
	{price: '10000以上',goldcoin: 180,commission: 180}
];
$(function(){
	$(".tb-taobao").append($("#taobaoTmpl").render(taobaoCommission));
	$(".tb-jingdong").append($("#jingdongTmpl").render(jingdongCommission));
	$('body').on('click', '.btnmenu', dojump);
})
function dojump(e){
	var obj=e.target;
	var type=$(obj).data("type")-1;
	$("body section:eq("+type+") .m-title").focus();
}
