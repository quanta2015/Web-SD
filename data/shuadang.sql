/*
Navicat MySQL Data Transfer

Source Server         : 本地
Source Server Version : 50636
Source Host           : localhost:3306
Source Database       : shuadang

Target Server Type    : MYSQL
Target Server Version : 50636
File Encoding         : 65001

Date: 2018-05-23 00:01:59
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `admin`
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) DEFAULT NULL COMMENT '用户名',
  `password` varchar(100) DEFAULT NULL COMMENT '密码',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `salt` varchar(100) DEFAULT NULL,
  `cancelled` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', 'tt', 'b48982b6bba20ace2057b290ab9660fe', '2018-05-22 22:33:24', 'HAWbNoPFVM', '0');

-- ----------------------------
-- Table structure for `area`
-- ----------------------------
DROP TABLE IF EXISTS `area`;
CREATE TABLE `area` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `type` tinyint(4) DEFAULT '0' COMMENT '0省 1市 2区',
  `p_id` int(8) DEFAULT '0' COMMENT '父id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of area
-- ----------------------------

-- ----------------------------
-- Table structure for `businesstype`
-- ----------------------------
DROP TABLE IF EXISTS `businesstype`;
CREATE TABLE `businesstype` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `businesstype` varchar(20) DEFAULT NULL COMMENT '店铺类型',
  `level` int(2) DEFAULT NULL,
  `parent_id` int(8) DEFAULT NULL COMMENT '父元素',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of businesstype
-- ----------------------------
INSERT INTO `businesstype` VALUES ('1', '生鲜', '1', '0');
INSERT INTO `businesstype` VALUES ('2', '果疏', '2', '1');

-- ----------------------------
-- Table structure for `buyer`
-- ----------------------------
DROP TABLE IF EXISTS `buyer`;
CREATE TABLE `buyer` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(20) DEFAULT NULL COMMENT '刷手真实姓名',
  `idcard` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `idcardpng1` varchar(255) DEFAULT NULL COMMENT '身份证照片正面',
  `mobile` varchar(11) DEFAULT NULL COMMENT '手机号',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `salt` varchar(10) DEFAULT NULL COMMENT '加盐密码',
  `idcardpng2` varchar(255) DEFAULT NULL COMMENT '身份证照片反面',
  `regtime` datetime DEFAULT NULL COMMENT '注册时间',
  `updatetime` datetime DEFAULT NULL COMMENT '修改时间',
  `qq` varchar(20) DEFAULT NULL COMMENT 'qq号',
  `weixin` varchar(20) DEFAULT NULL COMMENT '微信号',
  `cancelled` int(4) DEFAULT NULL COMMENT '作废（1作废 0启用）',
  `invitecode` varchar(20) DEFAULT NULL COMMENT '邀请码',
  `user_name` varchar(20) DEFAULT NULL COMMENT '用户名',
  `birthday` varchar(20) DEFAULT NULL COMMENT '出生年月',
  `approve_state` int(4) DEFAULT '0' COMMENT '审核状态',
  `bankcard_state` int(4) DEFAULT '0' COMMENT '银行卡',
  `sex` int(2) DEFAULT NULL COMMENT '性别',
  `approve_reason` varchar(255) DEFAULT NULL,
  `idcardpng3` varchar(255) DEFAULT NULL COMMENT '身份证照片手持',
  `approver` varchar(30) DEFAULT NULL COMMENT '审核人',
  `approvetime` datetime DEFAULT NULL,
  `bankcard_approve_reason` varchar(255) DEFAULT NULL,
  `bankcard_approver` varchar(30) DEFAULT NULL,
  `bankcard_approvetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobileinde` (`mobile`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyer
-- ----------------------------
INSERT INTO `buyer` VALUES ('9', 'xutiantian', '342622199412041629', 'string', '13865293134', 'be344c6748e58ec272f2beb481a302bc', 'QFA25ueH7k', 'string', '2018-05-19 09:31:14', '2018-05-22 10:49:37', 'string', 'string', '0', 'string', 'string', '1994-12-04', '1', '1', '0', null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `buyer_acount`
-- ----------------------------
DROP TABLE IF EXISTS `buyer_acount`;
CREATE TABLE `buyer_acount` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `type` varchar(20) DEFAULT NULL COMMENT '网站类型',
  `acount` varchar(50) DEFAULT NULL COMMENT '网站账号',
  `acount_level` varchar(30) DEFAULT NULL COMMENT '账号等级',
  `baitiao_start` int(2) DEFAULT NULL COMMENT '是否开通白条/花呗',
  `receiver` varchar(50) DEFAULT NULL COMMENT '收货人',
  `receive_mobile` varchar(20) DEFAULT NULL COMMENT '收货人手机号',
  `receive_province` varchar(10) DEFAULT NULL COMMENT '收货省',
  `receive_city` varchar(10) DEFAULT NULL COMMENT '收货市',
  `receive_country` varchar(10) DEFAULT NULL COMMENT '收货区域',
  `receive_address` varchar(100) DEFAULT NULL COMMENT '详细地址',
  `mysite_img` varchar(255) DEFAULT NULL,
  `myacount_img` varchar(255) DEFAULT NULL COMMENT '我得账号页面',
  `baitiao_img` varchar(255) DEFAULT NULL COMMENT '开通白条/花呗情况',
  `buyer_id` int(8) DEFAULT NULL,
  `approve` int(4) DEFAULT '0' COMMENT '审核',
  `approve_reason` varchar(255) DEFAULT NULL COMMENT '审核人',
  `approver` varchar(30) DEFAULT NULL,
  `approvetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyer_acount
-- ----------------------------
INSERT INTO `buyer_acount` VALUES ('1', 'string', 'string', 'string', '0', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '9', '0', 'string', null, null);
INSERT INTO `buyer_acount` VALUES ('2', 'string', 'string', 'string', '0', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '9', '0', 'string', null, null);
INSERT INTO `buyer_acount` VALUES ('3', 'string', 'string2', 'string', '0', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '9', '2', 'string', null, null);

-- ----------------------------
-- Table structure for `buyer_bank`
-- ----------------------------
DROP TABLE IF EXISTS `buyer_bank`;
CREATE TABLE `buyer_bank` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '开户姓名',
  `acount_name` varchar(20) DEFAULT NULL,
  `bank` varchar(50) DEFAULT NULL COMMENT '开户支行',
  `acount_subbank` varchar(50) DEFAULT NULL COMMENT '开户支行',
  `acount_bankno` varchar(20) DEFAULT NULL COMMENT '开户行号',
  `bank_no` varchar(30) DEFAULT NULL COMMENT '银行账号',
  `buyer_id` int(8) DEFAULT NULL COMMENT '刷手id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of buyer_bank
-- ----------------------------
INSERT INTO `buyer_bank` VALUES ('1', 'string', 'string', 'string', 'string', 'string', '9');
INSERT INTO `buyer_bank` VALUES ('2', 'string', 'string', 'string', 'string', 'string', '9');
INSERT INTO `buyer_bank` VALUES ('4', 'xutiantian', 'string', 'string', 'string', 'string', '9');

-- ----------------------------
-- Table structure for `buyer_task`
-- ----------------------------
DROP TABLE IF EXISTS `buyer_task`;
CREATE TABLE `buyer_task` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `task_id` int(8) DEFAULT NULL,
  `goods_id` int(8) DEFAULT NULL,
  `goods_price` decimal(8,2) DEFAULT NULL COMMENT '商品价格',
  `reward` decimal(8,2) DEFAULT NULL COMMENT '报酬',
  `status` tinyint(4) DEFAULT NULL COMMENT '任务状态',
  `task_type` tinyint(4) DEFAULT NULL COMMENT '任务类型(垫付任务，浏览任务等等)',
  `buyer_id` int(8) DEFAULT NULL,
  `shoper_id` int(8) DEFAULT NULL,
  `task_enddate` varchar(10) DEFAULT NULL COMMENT '任务截止日期',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `taskkey_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='刷手任务表';

-- ----------------------------
-- Records of buyer_task
-- ----------------------------

-- ----------------------------
-- Table structure for `goods`
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `goodsname` varchar(50) DEFAULT NULL COMMENT '商品名称',
  `goodsurl` varchar(100) DEFAULT NULL COMMENT '商品链接',
  `goodsmainimg` varchar(100) DEFAULT NULL COMMENT '商品主图',
  `goodsimg1` varchar(100) DEFAULT NULL COMMENT '图片1(是否需要这个字段)',
  `goodsimg2` varchar(100) DEFAULT NULL COMMENT '图片2(是否需要这个字段)',
  `factprice` decimal(10,0) DEFAULT NULL COMMENT '实际成交价格',
  `color_size` varchar(255) DEFAULT NULL COMMENT '颜色尺码规格',
  `searchprice` decimal(10,0) DEFAULT NULL COMMENT '手机端搜索价格',
  `number` int(11) DEFAULT NULL COMMENT '每单拍的数量',
  `locationway` varchar(10) DEFAULT NULL COMMENT '定位商品方式（销量，综合，直通车）',
  `sales_volume` int(11) DEFAULT NULL COMMENT '该商品现有销量',
  `lowprice` decimal(10,0) DEFAULT NULL COMMENT '价格区间最低价格',
  `highprice` decimal(10,0) DEFAULT NULL COMMENT '价格区间最高价格',
  `goodsposition` varchar(20) DEFAULT NULL COMMENT '商品所在地',
  `orderwords` varchar(255) DEFAULT NULL COMMENT '订单留言',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '修改时间',
  `cancelled` int(11) DEFAULT NULL COMMENT '作废标识（1作废0启用）',
  `task_id` int(8) DEFAULT NULL COMMENT '任务id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('8', 'string1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2018-05-16 10:57:51', '2018-05-16 10:57:51', '0', '7');
INSERT INTO `goods` VALUES ('15', 'stringupdate', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-16 13:24:53', '2018-05-17 09:58:49', '0', '15');
INSERT INTO `goods` VALUES ('16', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-16 13:27:52', '2018-05-16 10:42:45', '0', '16');
INSERT INTO `goods` VALUES ('19', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-17 22:47:50', '2018-05-17 22:44:43', '0', '17');
INSERT INTO `goods` VALUES ('20', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-17 22:51:18', '2018-05-17 22:44:43', '0', '18');
INSERT INTO `goods` VALUES ('21', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-19 23:18:34', '2018-05-19 23:14:48', '0', '1');
INSERT INTO `goods` VALUES ('22', '1212', '1212', '', '', '', '121', '1212', '121', '1212', '销量', '1212', '121', '121', '全国', '1212', '2018-05-20 18:20:27', null, '0', '2');

-- ----------------------------
-- Table structure for `shop`
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '店铺id',
  `name` varchar(30) DEFAULT NULL COMMENT '店铺名',
  `shopurl` varchar(100) DEFAULT NULL COMMENT '店铺链接',
  `wangid` varchar(50) DEFAULT NULL COMMENT '旺旺号',
  `address_province` varchar(20) DEFAULT NULL COMMENT '发货地址省',
  `shopimg1` varchar(255) DEFAULT NULL COMMENT '图片1',
  `shoper_id` int(8) DEFAULT NULL COMMENT '卖家id',
  `address_city` varchar(20) DEFAULT NULL COMMENT '市',
  `address` varchar(100) DEFAULT NULL COMMENT '发货地址',
  `address_county` varchar(20) DEFAULT NULL COMMENT '区',
  `type` varchar(10) DEFAULT NULL COMMENT '店铺类型（淘宝，京东）',
  `businesstype` varchar(20) DEFAULT NULL COMMENT '店铺经营类别',
  `subtype` varchar(20) DEFAULT NULL COMMENT '店铺类别二级菜单',
  `cancelled` int(4) DEFAULT NULL COMMENT '作废（1作废 0启用）',
  `createtime` datetime DEFAULT NULL COMMENT '创建时间',
  `updatetime` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('8', 'string222', 'string', 'string', 'string222', 'string', '7', null, 'string111', null, 'string222', 'string22', 'string', '1', '2018-05-13 18:15:22', '2018-05-13 20:09:01');
INSERT INTO `shop` VALUES ('9', 'string2', 'string', 'string', 'string', 'string', '7', null, 'string', null, 'string', 'string', 'string', '1', '2018-05-13 18:16:27', '2018-05-13 18:17:12');
INSERT INTO `shop` VALUES ('10', 'string222', 'string', 'string', 'string222', 'string', '0', null, 'string111', null, 'string222', 'string22', 'string222', '0', '2018-05-13 18:18:01', '2018-05-13 18:14:39');
INSERT INTO `shop` VALUES ('11', 'string4', 'string', 'string', 'string', 'string', '7', 'string', 'string', 'string', 'string', 'string', 'string', '0', '2018-05-13 20:08:09', '2018-05-13 20:06:45');

-- ----------------------------
-- Table structure for `shoper_transfer`
-- ----------------------------
DROP TABLE IF EXISTS `shoper_transfer`;
CREATE TABLE `shoper_transfer` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '卖家充值id',
  `to_account` varchar(60) DEFAULT NULL COMMENT '转账目的账号',
  `transfer_money` decimal(10,0) DEFAULT NULL COMMENT '转账金额',
  `bank_name` varchar(50) DEFAULT NULL COMMENT '银行',
  `transfer_person` varchar(30) DEFAULT NULL COMMENT '打款人姓名',
  `from_account` varchar(60) DEFAULT NULL COMMENT '汇款账号',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `picture` varchar(100) DEFAULT NULL COMMENT '转账图片',
  `shoper_id` int(8) DEFAULT NULL COMMENT '卖家id',
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `cancelled` int(4) DEFAULT '0',
  `approve` int(4) DEFAULT '0',
  `approve_reason` varchar(255) DEFAULT NULL,
  `approver` varchar(30) DEFAULT NULL,
  `approvetime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shoper_transfer
-- ----------------------------
INSERT INTO `shoper_transfer` VALUES ('1', 'string', '0', 'string', 'string', 'string11111', 'string', 'string', '7', '2018-05-22 10:55:48', '0', '0', 'string', null, null);
INSERT INTO `shoper_transfer` VALUES ('2', 'string', '0', 'string', 'string', 'string', 'string', 'string', '7', '2018-05-22 10:57:39', '0', '0', 'string', null, null);
INSERT INTO `shoper_transfer` VALUES ('3', 'string', '0', 'string', 'string', 'string', 'string', 'string', '7', '2018-05-22 13:53:49', '0', '0', 'string', null, null);

-- ----------------------------
-- Table structure for `shopman`
-- ----------------------------
DROP TABLE IF EXISTS `shopman`;
CREATE TABLE `shopman` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `name` varchar(20) DEFAULT NULL COMMENT '卖家真实姓名',
  `idcard` varchar(20) DEFAULT NULL COMMENT '身份证号',
  `idcardpng1` varchar(255) DEFAULT NULL COMMENT '身份证照片正面',
  `bank` varchar(20) DEFAULT NULL COMMENT '银行',
  `bankcard` varchar(30) DEFAULT NULL COMMENT '银行卡号',
  `mobile` varchar(11) DEFAULT NULL COMMENT '手机号',
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `salt` varchar(10) DEFAULT NULL COMMENT '加盐密码',
  `idcardpng2` varchar(255) DEFAULT NULL COMMENT '身份证照片反面',
  `regtime` datetime DEFAULT NULL COMMENT '注册时间',
  `updatetime` datetime DEFAULT NULL COMMENT '修改时间',
  `qq` varchar(20) DEFAULT NULL COMMENT 'qq号',
  `weixin` varchar(20) DEFAULT NULL COMMENT '微信号',
  `cancelled` int(4) DEFAULT NULL COMMENT '作废（1作废 0启用）',
  `invitecode` varchar(20) DEFAULT NULL COMMENT '邀请码',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobileinde` (`mobile`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopman
-- ----------------------------
INSERT INTO `shopman` VALUES ('6', 'string', 'string', 'string', 'string', 'string1111', 'string', '2594d30278acb6290a24141c0b09604c', 'o4gaHcSY16', 'string', '2018-05-11 23:54:21', '2018-05-11 23:53:03', 'string', 'string111', '0', 'string');
INSERT INTO `shopman` VALUES ('7', 'string', 'string', 'string', 'string', 'string', '13819143134', 'b48982b6bba20ace2057b290ab9660fe', 'HAWbNoPFVM', 'string', '2018-05-12 22:33:54', '2018-05-12 21:09:03', 'string', 'string', '0', 'string');

-- ----------------------------
-- Table structure for `task`
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `tasktype` varchar(10) DEFAULT NULL COMMENT '任务类型(手机淘宝任务，pc淘宝任务。。。。)',
  `pcormobiletype` varchar(10) DEFAULT NULL,
  `returntype` tinyint(2) DEFAULT '0' COMMENT '是否是平台服务（1是0否）',
  `commontask` tinyint(2) DEFAULT '0' COMMENT '普通任务（1是0否）',
  `keywordtask` tinyint(2) DEFAULT '0' COMMENT '关键字好评任务（1是 0否）',
  `picturetask` tinyint(2) DEFAULT '0' COMMENT '指定图片任务（1是0否）',
  `commenttask` tinyint(2) unsigned zerofill DEFAULT '00' COMMENT '指定文字好评任务（1是0否）',
  `num` int(8) DEFAULT NULL COMMENT '总单数',
  `startdate` varchar(20) DEFAULT NULL COMMENT '发布日期',
  `addcharges` decimal(10,0) DEFAULT NULL COMMENT '加赏佣金',
  `share` varchar(50) DEFAULT NULL COMMENT '是否分享宝贝',
  `match_label` tinyint(2) DEFAULT '0' COMMENT '是否匹配标签',
  `sex` varchar(10) DEFAULT NULL COMMENT '性别',
  `lowage` int(4) DEFAULT '0' COMMENT '最低年龄',
  `highage` int(4) DEFAULT '999' COMMENT '最高年龄',
  `location` varchar(30) DEFAULT NULL COMMENT '限制区域',
  `use_huabei` int(2) DEFAULT NULL COMMENT '是否使用信用卡/花呗/白条',
  `huabei_start` tinyint(2) DEFAULT '0' COMMENT '是否开通花呗/白条',
  `jingdong_level` varchar(50) DEFAULT NULL COMMENT '京东会员等级',
  `taobao_level` varchar(50) DEFAULT NULL COMMENT '淘宝会员等级',
  `rebuy` varchar(30) DEFAULT NULL COMMENT '重复购买限制',
  `is_recieve` tinyint(2) DEFAULT '0' COMMENT '是否默认签收',
  `ask` tinyint(2) DEFAULT '0' COMMENT '问大家（1是0否）',
  `express_company` varchar(10) DEFAULT NULL COMMENT '快递',
  `express_weight` decimal(10,0) DEFAULT NULL COMMENT '重量',
  `chat_necessary` tinyint(2) DEFAULT '0' COMMENT '是否需要聊天',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注(是否需要这个字段)',
  `createtime` datetime DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  `cancelled` int(2) DEFAULT '0',
  `shop_id` int(8) DEFAULT NULL,
  `approve_reason` varchar(100) DEFAULT NULL COMMENT '审核原因',
  `approve` int(2) DEFAULT '0' COMMENT '审核',
  `approver` varchar(30) DEFAULT NULL,
  `approvetime` datetime DEFAULT NULL,
  `favorite_goods` tinyint(2) DEFAULT NULL COMMENT '收藏商品',
  `favorite_shop` tinyint(2) DEFAULT '0' COMMENT '收藏店铺',
  `extra_buy` tinyint(2) DEFAULT '0' COMMENT '加购',
  `addedvalue` tinyint(2) DEFAULT '0' COMMENT '增值服务',
  `goodsname` varchar(20) DEFAULT NULL,
  `goods_id` int(8) DEFAULT NULL,
  `goods_price` decimal(10,0) DEFAULT NULL COMMENT '担保金',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('1', 'string', 'string', '0', '1', '1', '0', '01', '0', 'string', '0', 'string', '0', 'string', '0', '0', 'string', '0', '0', 'string', 'string', 'string', '0', '0', 'string', '0', '0', 'string', '2018-05-19 23:18:34', '2018-05-19 23:14:48', '0', '0', 'string', '0', null, null, '0', '0', '0', '0', 'string', '0', null);
INSERT INTO `task` VALUES ('2', '手机淘宝任务', null, '1', '1', '0', '0', '00', '1212', '2018-01-22', '1', '1', '0', '男', '10', '20', '全国', '0', '0', '0', '1', '0', '1', '1', '236', '12', '1', null, '2018-05-20 18:20:27', null, '0', '28', null, '0', null, null, '0', '0', '0', '0', '1212', '0', null);

-- ----------------------------
-- Table structure for `taskkey`
-- ----------------------------
DROP TABLE IF EXISTS `taskkey`;
CREATE TABLE `taskkey` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '搜索关键字id',
  `keyword` varchar(100) DEFAULT NULL COMMENT '任务搜索关键字',
  `taskkey_num` int(11) DEFAULT NULL COMMENT '任务的单数',
  `taskkey_num_notfinished` int(8) DEFAULT NULL COMMENT '未完成单数',
  `from_hour` int(8) DEFAULT NULL COMMENT '任务开始小时',
  `from_min` int(8) DEFAULT NULL COMMENT '任务开始分钟',
  `to_hour` int(8) DEFAULT NULL COMMENT '任务结束小时',
  `to_min` int(8) DEFAULT NULL COMMENT '任务结束分钟',
  `appoints` varchar(255) DEFAULT NULL COMMENT '指定的文字/图片/关键字(图片/关键字多个用逗号隔开)',
  `taskkey_type` int(4) DEFAULT NULL COMMENT '任务类型(1普通任务 2指定关键词任务 3指定图片任务 4指定文字任务)',
  `task_id` int(8) DEFAULT NULL COMMENT '任务id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of taskkey
-- ----------------------------
INSERT INTO `taskkey` VALUES ('28', 'string', '0', null, '0', '0', '0', '0', 'string', '2', '15');
INSERT INTO `taskkey` VALUES ('29', 'string12', '0', null, '0', '0', '0', '0', 'string', '3', '15');
INSERT INTO `taskkey` VALUES ('30', 'string13', '0', null, '0', '0', '0', '0', 'string', '4', '15');
INSERT INTO `taskkey` VALUES ('31', 'string', '0', null, '0', '0', '0', '0', 'string', '1', '16');
INSERT INTO `taskkey` VALUES ('32', 'string', '0', null, '0', '0', '0', '0', 'string', '2', '16');
INSERT INTO `taskkey` VALUES ('33', 'string', '0', null, '0', '0', '0', '0', 'string', '3', '16');
INSERT INTO `taskkey` VALUES ('34', 'string', '0', null, '0', '0', '0', '0', 'string', '4', '16');
INSERT INTO `taskkey` VALUES ('36', 'stringadd', '0', null, '0', '0', '0', '0', 'string', '2', '15');
INSERT INTO `taskkey` VALUES ('41', 'string', '0', null, '0', '0', '0', '0', 'string', '1', '18');
INSERT INTO `taskkey` VALUES ('42', 'string', '0', null, '0', '0', '0', '0', 'string', '2', '18');
INSERT INTO `taskkey` VALUES ('43', 'string', '0', null, '0', '0', '0', '0', 'string', '3', '18');
INSERT INTO `taskkey` VALUES ('44', 'string', '0', null, '1', '0', '0', '0', 'string', '4', '18');
INSERT INTO `taskkey` VALUES ('45', 'string', '0', null, '0', '0', '0', '0', 'string', '1', '1');
INSERT INTO `taskkey` VALUES ('46', 'string', '0', null, '0', '0', '0', '0', 'string', '2', '1');
INSERT INTO `taskkey` VALUES ('47', 'string', '0', null, '0', '0', '0', '0', 'string', '4', '1');
INSERT INTO `taskkey` VALUES ('48', '1212', '1212', null, '18', '30', '18', '30', '', '1', '2');

-- ----------------------------
-- Table structure for `taskpicture`
-- ----------------------------
DROP TABLE IF EXISTS `taskpicture`;
CREATE TABLE `taskpicture` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `picture` varchar(255) DEFAULT NULL COMMENT '图片',
  `taskkey_id` int(8) DEFAULT NULL COMMENT '任务搜索关键字id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of taskpicture
-- ----------------------------
INSERT INTO `taskpicture` VALUES ('3', 'string11111111111111111111111111111', '29');
INSERT INTO `taskpicture` VALUES ('4', 'string', '33');
INSERT INTO `taskpicture` VALUES ('6', 'stringadd', '29');
INSERT INTO `taskpicture` VALUES ('7', 'string', '39');
INSERT INTO `taskpicture` VALUES ('8', 'string', '43');

-- ----------------------------
-- Table structure for `task_money`
-- ----------------------------
DROP TABLE IF EXISTS `task_money`;
CREATE TABLE `task_money` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `base_money` decimal(8,2) DEFAULT '0.00' COMMENT '基础佣金',
  `base_money_count` int(8) DEFAULT '0',
  `favorite_goods` decimal(8,2) DEFAULT '0.00' COMMENT '收藏商品',
  `favorite_goods_count` int(8) DEFAULT '0',
  `favorite_shop` decimal(8,2) DEFAULT '0.00' COMMENT '收藏店铺',
  `favorite_shop_count` int(8) DEFAULT '0',
  `extra_buy` decimal(8,2) DEFAULT '0.00' COMMENT '加购',
  `extra_buy_count` int(8) DEFAULT '0',
  `ask_all` decimal(8,2) DEFAULT '0.00' COMMENT '问大家',
  `ask_all_count` int(8) DEFAULT '0',
  `extra_money` decimal(8,2) DEFAULT '0.00' COMMENT '加赏佣金',
  `extra_money_count` int(8) DEFAULT '0',
  `addedvalue` decimal(8,2) DEFAULT '0.00' COMMENT '增值服务费',
  `addedvalue_count` int(8) DEFAULT '0',
  `label_match` decimal(8,2) DEFAULT '0.00' COMMENT '标签匹配费',
  `label_match_count` int(8) DEFAULT '0',
  `huabei` decimal(8,2) DEFAULT '0.00' COMMENT '花呗白条费',
  `huabei_count` int(8) DEFAULT '0',
  `buyer_grade` decimal(8,2) DEFAULT '0.00' COMMENT '买家等级费',
  `buyer_grade_count` int(8) DEFAULT '0',
  `signfor` decimal(8,2) DEFAULT NULL COMMENT '默认签收费',
  `signfor_count` int(8) DEFAULT '0',
  `task_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_money
-- ----------------------------
INSERT INTO `task_money` VALUES ('1', '10.00', '1', '2.00', '0', '2.00', '0', '2.00', '0', '2.00', '0', '1.00', '0', '0.00', '1', '2.00', '0', '2.00', '0', '2.00', '0', '2.00', '0', '17');
INSERT INTO `task_money` VALUES ('2', '10.00', '1', '2.00', '1', '2.00', '1', '2.00', '1', '2.00', '0', '1.00', '1', '0.00', '1', '2.00', '1', '2.00', '0', '2.00', '1', '2.00', '1', '18');
INSERT INTO `task_money` VALUES ('3', '10.00', '1', '2.00', '0', '2.00', '0', '2.00', '0', '2.00', '0', '0.00', '0', '0.00', '1', '2.00', '0', '2.00', '0', '2.00', '0', '2.00', '0', '1');
INSERT INTO `task_money` VALUES ('4', '10.00', '1', '2.00', '0', '2.00', '0', '2.00', '0', '2.00', '1212', '1.20', '1212', '0.00', '1', '2.00', '0', '2.00', '0', '2.00', '1212', '2.00', '1212', '2');

-- ----------------------------
-- Table structure for `task_money_template`
-- ----------------------------
DROP TABLE IF EXISTS `task_money_template`;
CREATE TABLE `task_money_template` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `base_money` decimal(8,2) DEFAULT '0.00' COMMENT '基础佣金',
  `favorite_goods` decimal(8,2) DEFAULT '0.00' COMMENT '收藏商品',
  `favorite_shop` decimal(8,2) DEFAULT '0.00' COMMENT '收藏店铺',
  `extra_buy` decimal(8,2) DEFAULT '0.00' COMMENT '加购',
  `ask_all` decimal(8,2) DEFAULT '0.00' COMMENT '问大家',
  `extra_money` decimal(8,2) DEFAULT '0.00' COMMENT '加赏佣金',
  `addedvalue` decimal(8,2) DEFAULT '0.00' COMMENT '增值服务费',
  `label_match` decimal(8,2) DEFAULT '0.00' COMMENT '标签匹配费',
  `huabei` decimal(8,2) DEFAULT '0.00' COMMENT '花呗白条费',
  `buyer_grade` decimal(8,2) DEFAULT '0.00' COMMENT '买家等级费',
  `signfor` decimal(8,2) DEFAULT NULL COMMENT '默认签收费',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task_money_template
-- ----------------------------
INSERT INTO `task_money_template` VALUES ('1', '10.00', '2.00', '2.00', '2.00', '2.00', '2.00', '0.00', '2.00', '2.00', '2.00', '2.00');

-- ----------------------------
-- Table structure for `uploadfile`
-- ----------------------------
DROP TABLE IF EXISTS `uploadfile`;
CREATE TABLE `uploadfile` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `filepath` varchar(255) DEFAULT NULL,
  `uuidname` varchar(100) DEFAULT NULL,
  `extname` varchar(20) DEFAULT NULL,
  `buyer_id` int(8) DEFAULT NULL,
  `shoper_id` int(8) DEFAULT NULL,
  `createtime` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `type` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of uploadfile
-- ----------------------------
INSERT INTO `uploadfile` VALUES ('7', '20180520', 'c59ea498d38a4494882a0f88594e7e26', 'jpg', '0', '7', null, null);

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(200) NOT NULL,
  `address` varchar(1000) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '2', '3');
INSERT INTO `user` VALUES ('2', '老王', '老王');
INSERT INTO `user` VALUES ('3', 'gsdf', 'dsggd');
INSERT INTO `user` VALUES ('4', 'gg', 'g');
