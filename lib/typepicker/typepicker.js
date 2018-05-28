(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

var DEFAULTS = {
  autoselect: 0,
  placeholder: true,
  // Select value. Options: 'name' and 'code'
  valueType: 'name',
  // Defines the initial value of province.
  province: '请选择主类',
  city: '请选择次类'

  // Defines the initial value of district.
  // district: '—— 区 ——'
};

var DISTRICTS = {
  100000: {
    110000: '生鲜',
    120000: '酒类',
    130000: '医药保健',
    140000: '母婴',
    150000: '汽车用品自治区',
    210000: '家装建材',
    220000: '家居家纺',
    230000: '厨具省',
    310000: '家具',
    320000: '礼品箱包',
    330000: '家用电器',
    340000: '运动户外',
    350000: '珠宝',
    360000: '钟表',
    370000: '服饰鞋履',
    410000: '电脑办公',
    420000: '数码',
    430000: '美妆个护',
    440000: '玩具乐器',
    450000: '宠物生活族自治区',
    460000: '农资绿植',
    500000: '教育服务',
    510000: '百货',
    520000: '其他'
  },
  110000: {
    110100: '水果',
    110200: '海鲜水产',
    110300: '猪牛羊肉',
    110400: '禽肉蛋品',
    110500: '冷冻食品',
    110600: '饮品甜品'
  },
  120000: {
    120100: '中外名酒',
    120200: '白酒',
    120300: '葡萄酒',
    120400: '洋酒',
    120500: '啤酒',
    120600: '黄酒/养生酒',
    120700: '收藏酒/陈年老酒'
  },
  130000: {
    130100: '护理护具',
    130200: '中西药品',
    130300: '隐形眼镜',
    130400: '营养健康',
    130500: '营养成分',
    130600: '传统滋补',
    130700: '计生情趣',
    130800: '保健器械',
    130900: '家庭护理'
  },
  140000: {
    140100: '童装',
    140200: '童鞋',
    140300: '奶粉',
    140400: '营养辅食',
    140500: '尿裤湿巾',
    140600: '喂养用品',
    140700: '洗护用品',
    140800: '童车童床',
    140900: '玩具乐器',
    141000: '寝具服饰'
  },
  150000: {
    150100: '维修保养',
    150200: '车载电器',
    150300: '美容清洗',
    150400: '汽车装饰',
    150500: '坐垫座椅'
  },
  210000: {
    210100: '灯饰照明',
    210200: '五金工具',
    210300: '电工电料',
    210400: '墙地面材料',
    210500: '装饰材料'
  },
  220000: {
    220100: '家装软饰',
    220200: '精美餐具',
    220300: '收纳用品',
    220400: '家纺',
    220500: '家具',
    220600: '生活用品'
  },
  230000: {
    230100: '茶具/咖啡',
    230200: '烹饪锅具',
    230300: '刀剪菜板',
    230400: '厨房配件',
    230500: '水具酒具',
    230600: '餐具',
    230700: '酒店用品'
  },
  310000: {
    310100: '儿童家具',
    310200: '卧室家具',
    310300: '客厅家具',
    310400: '餐厅家具',
    310500: '书房家具',
    310600: '储物家具',
    310700: '阳台/户外',
    310800: '办公家具'
  },
  320000: {
    320100: '婚庆',
    320200: '火机烟具',
    320300: '鲜花速递',
    320400: '礼品文具',
    320500: '箱包',
    320600: '珠宝首饰',
    320700: '潮流女包',
    320800: '精品男包',
    320900: '礼品',
    321000: '文具',
    321100: '奢侈品',
    321200: '男士包袋',
    321300: '女士包袋',
    321400: '功能箱包',
    321500: '男士配饰',
    321600: '女士配饰'
  },
  330000: {
    330100: '个护健康',
    330200: '厨卫大电',
    330300: '厨房小电',
    330400: '生活电器',
    330500: '商用电器',
    330600: '大家电',
    330700: '电工电器',
    330800: '汽车用品'
  },
  340000: {
    340100: '运动鞋包',
    340200: '运动服饰',
    340300: '骑行运动',
    340400: '垂钓用品',
    340500: '游泳用品',
    340600: '户外装备',
    340700: '健身训练',
    340800: '体育用品',
    340900: '户外鞋服'
  },
  350000: {
    350100: '纯银饰品',
    350200: '翡翠玉饰',
    350300: '水晶饰品',
    350400: '珍珠母贝',
    350500: '彩色宝石',
    350600: '流行饰品',
    350700: '民俗饰品'
  },
  360000: {
    370100: '男表',
    370200: '女表',
    370300: '钟表',
    370400: '闹钟挂表',
    370500: '儿童手表'
  },
  370000: {
    320100: '流行男鞋',
    320200: '时尚女鞋',
    320300: '婴儿服饰',
    320400: '男童服饰',
    320500: '女童服饰',
    320600: '男装',
    320700: '女装',
    320800: '内衣',
    320900: '服饰配件'
  },
  410000: {
    410100: '游戏设备',
    410200: '电脑整机',
    410300: '电脑配件',
    410400: '外设产品',
    410500: '网络产品',
    410600: '办公设备',
    410700: '文具/耗材'
  },
  420000: {
    420100: '智能设备',
    420200: '摄影摄像',
    420300: '数码配件',
    420400: '手机配件',
    420500: '手机通讯'
  },
  430000: {
    430100: '面部护肤',
    430200: '身体护理',
    430300: '口腔护理',
    430400: '女性护理',
    430500: '洗发护理',
    430600: '香水彩妆',
    430700: '清洁用品'
  },
  440000: {
    440100: '遥控/电动',
    440200: '毛绒布艺',
    440300: '娃娃玩具',
    440400: '模型玩具',
    440500: '健身玩具',
    440600: '动漫玩具',
    440700: '益智玩具',
    440800: '积木拼插',
    440900: '绘画/DIY',
    441000: '乐器'
  },
  450000: {
    450100: '小宠用品',
    450200: '水族',
    450300: '宠物活体',
    450400: '宠物主粮',
    450500: '宠物零食',
    450600: '猫狗玩具',
    450700: '洗护美容'
  },
  460000: {
    460100: '花卉绿植',
    460200: '种子',
    460300: '农药',
    460400: '肥料',
    460500: '饲料',
    460600: '兽药',
    460700: '兽用器具'
  },
  500000: {
    500100: '技能培训',
    500200: '考试认证',
    500300: '文献服务'
  },
  510000: {
    510100: '物流包装',
    510200: '礼品包装'
  },
  520000: {
    520100: '其他'
  }

};

var WINDOW = typeof window !== 'undefined' ? window : {};
var NAMESPACE = 'typepicker';
var EVENT_CHANGE = 'change';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_CODE = 100000;
var PROVINCE = 'province';
var CITY = 'city';
var DISTRICT = 'district';

var Distpicker = function () {
  function Distpicker(element, options) {
    _classCallCheck(this, Distpicker);

    this.$element = $(element);
    this.options = $.extend({}, DEFAULTS, $.isPlainObject(options) && options);
    this.placeholders = $.extend({}, DEFAULTS);
    this.ready = false;
    this.init();
  }

  _createClass(Distpicker, [{
    key: 'init',
    value: function init() {
      var _this = this;

      var options = this.options;

      var $selects = this.$element.find('select');
      var length = $selects.length;

      var data = {};

      $selects.each(function (i, select) {
        return $.extend(data, $(select).data());
      });

      $.each([PROVINCE, CITY], function (i, type) {
        if (data[type]) {
          options[type] = data[type];
          _this['$' + type] = $selects.filter('[data-' + type + ']');
        } else {
          _this['$' + type] = length > i ? $selects.eq(i) : null;
        }
      });

      this.bind();

      // Reset all the selects (after event binding)
      this.reset();
      this.ready = true;
    }
  }, {
    key: 'bind',
    value: function bind() {
      var _this2 = this;

      if (this.$province) {
        this.$province.on(EVENT_CHANGE, this.onChangeProvince = $.proxy(function () {
          _this2.output(CITY);
          // _this2.output(DISTRICT);
        }, this));
      }
    }
  }, {
    key: 'unbind',
    value: function unbind() {
      if (this.$province) {
        this.$province.off(EVENT_CHANGE, this.onChangeProvince);
      }
    }
  }, {
    key: 'output',
    value: function output(type) {
      var options = this.options,
          placeholders = this.placeholders;

      var $select = this['$' + type];

      if (!$select || !$select.length) {
        return;
      }

      var code = void 0;

      switch (type) {
        case PROVINCE:
          code = DEFAULT_CODE;
          break;

        case CITY:
          code = this.$province && (this.$province.find(':selected').data('code') || '');
          break;
      }

      var districts = this.getDistricts(code);
      var value = options[type];
      var data = [];
      var matched = false;

      if ($.isPlainObject(districts)) {
        $.each(districts, function (i, name) {
          var selected = name === value;

          if (options.valueType === 'code') {
            selected = i === String(value);
          }

          if (selected) {
            matched = true;
          }

          data.push({
            code: i,
            name: name,
            value: options.valueType === 'name' ? name : i,
            selected: selected
          });
        });
      }

      if (!matched) {
        var autoselect = options.autoselect || options.autoSelect;

        if (data.length && (type === PROVINCE && autoselect > 0 || type === CITY && autoselect > 1)) {
          data[0].selected = true;
        }

        // Save the unmatched value as a placeholder at the first output
        if (!this.ready && value) {
          placeholders[type] = value;
        }
      }

      // Add placeholder option
      if (options.placeholder) {
        data.unshift({
          code: '',
          name: placeholders[type],
          value: '',
          selected: false
        });
      }

      if (data.length) {
        $select.html(this.getList(data));
      } else {
        $select.empty();
      }

      $select.trigger(EVENT_CHANGE);
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getList',
    value: function getList(data) {
      var list = [];

      $.each(data, function (i, n) {
        var attrs = ['data-code="' + n.code + '"', 'data-text="' + n.name + '"', 'value="' + n.value + '"'];

        if (n.selected) {
          attrs.push('selected');
        }

        list.push('<option ' + attrs.join(' ') + '>' + n.name + '</option>');
      });

      return list.join('');
    }

    // eslint-disable-next-line class-methods-use-this

  }, {
    key: 'getDistricts',
    value: function getDistricts() {
      var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CODE;

      return DISTRICTS[code] || null;
    }
  }, {
    key: 'reset',
    value: function reset(deep) {
      if (!deep) {
        this.output(PROVINCE);
        this.output(CITY);
        this.output(DISTRICT);
      } else if (this.$province) {
        this.$province.find(':first').prop('selected', true).end().trigger(EVENT_CHANGE);
      }
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.unbind();
    }
  }], [{
    key: 'setDefaults',
    value: function setDefaults(options) {
      $.extend(DEFAULTS, $.isPlainObject(options) && options);
    }
  }]);

  return Distpicker;
}();

if ($.fn) {
  var AnotherDistpicker = $.fn.typepicker;

  $.fn.typepicker = function jQueryDistpicker(option) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result = void 0;

    this.each(function (i, element) {
      var $element = $(element);
      var isDestroy = option === 'destroy';
      var distpicker = $element.data(NAMESPACE);

      if (!distpicker) {
        if (isDestroy) {
          return;
        }

        var options = $.extend({}, $element.data(), $.isPlainObject(option) && option);

        distpicker = new Distpicker(element, options);
        $element.data(NAMESPACE, distpicker);
      }

      if (typeof option === 'string') {
        var fn = distpicker[option];

        if ($.isFunction(fn)) {
          result = fn.apply(distpicker, args);

          if (isDestroy) {
            $element.removeData(NAMESPACE);
          }
        }
      }
    });

    return typeof result === 'undefined' ? this : result;
  };

  $.fn.typepicker.Constructor = Distpicker;
  $.fn.typepicker.setDefaults = Distpicker.setDefaults;

  $.fn.typepicker.noConflict = function noConflict() {
    $.fn.typepicker = AnotherDistpicker;
    return this;
  };
}

if (WINDOW.document) {
  $(function () {
    $('[data-toggle="' + NAMESPACE + '"]').typepicker();
  });
}

})));
