/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50712
Source Host           : localhost:3306
Source Database       : shuadang

Target Server Type    : MYSQL
Target Server Version : 50712
File Encoding         : 65001

Date: 2018-05-16 15:30:04
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for area
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
-- Table structure for businesstype
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
-- Table structure for goods
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('8', 'string1', null, null, null, null, null, null, null, null, null, null, null, null, null, null, '2018-05-16 10:57:51', '2018-05-16 10:57:51', '0', '7');
INSERT INTO `goods` VALUES ('15', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-16 13:24:53', '2018-05-16 10:42:45', '0', '15');
INSERT INTO `goods` VALUES ('16', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-16 13:27:52', '2018-05-16 10:42:45', '0', '16');
INSERT INTO `goods` VALUES ('18', 'string1', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '0', '0', '0', 'string', 'string', '2018-05-16 13:24:53', '2018-05-16 13:24:53', '0', '15');

-- ----------------------------
-- Table structure for shop
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
-- Table structure for shopman
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
-- Table structure for task
-- ----------------------------
DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '任务id',
  `tasktype` varchar(255) DEFAULT NULL COMMENT '任务类型(手机淘宝任务，pc淘宝任务。。。。)',
  `returntype` int(255) DEFAULT NULL COMMENT '是否是平台服务（1是0否）',
  `commontask` int(2) DEFAULT NULL COMMENT '普通任务（1是0否）',
  `keywordtask` int(2) DEFAULT NULL COMMENT '关键字好评任务（1是 0否）',
  `picturetask` int(2) DEFAULT NULL COMMENT '指定图片任务（1是0否）',
  `commenttask` int(2) unsigned zerofill DEFAULT NULL COMMENT '指定文字好评任务（1是0否）',
  `num` int(8) DEFAULT NULL COMMENT '总单数',
  `startdate` varchar(20) DEFAULT NULL COMMENT '发布日期',
  `addcharges` decimal(10,0) DEFAULT NULL COMMENT '加赏佣金',
  `share` varchar(50) DEFAULT NULL COMMENT '是否分享宝贝',
  `match_label` varchar(50) DEFAULT NULL COMMENT '是否匹配标签',
  `sex` varchar(10) DEFAULT NULL COMMENT '性别',
  `lowage` int(4) DEFAULT NULL COMMENT '最低年龄',
  `highage` int(4) DEFAULT NULL COMMENT '最高年龄',
  `location` varchar(30) DEFAULT NULL COMMENT '限制区域',
  `use_huabei` varchar(30) DEFAULT NULL COMMENT '是否使用信用卡/花呗/白条',
  `huabei_start` varchar(30) DEFAULT NULL COMMENT '是否开通花呗/白条',
  `jingdong_level` varchar(50) DEFAULT NULL COMMENT '京东会员等级',
  `taobao_level` varchar(50) DEFAULT NULL COMMENT '淘宝会员等级',
  `rebuy` varchar(30) DEFAULT NULL COMMENT '重复购买限制',
  `is_recieve` varchar(10) DEFAULT NULL COMMENT '是否默认签收',
  `ask` int(2) DEFAULT NULL COMMENT '问大家（1是0否）',
  `express_company` varchar(10) DEFAULT NULL COMMENT '快递',
  `express_weight` decimal(10,0) DEFAULT NULL COMMENT '重量',
  `chat_necessary` int(2) DEFAULT NULL COMMENT '是否需要聊天',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注(是否需要这个字段)',
  `createtime` datetime DEFAULT NULL,
  `updatetime` datetime DEFAULT NULL,
  `cancelled` int(2) DEFAULT NULL,
  `shop_id` int(8) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of task
-- ----------------------------
INSERT INTO `task` VALUES ('15', 'string', '0', '1', '1', '1', '01', '0', 'string', '0', 'string', 'string', 'string', '0', '0', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '2018-05-16 13:24:53', '2018-05-16 10:42:45', '0', '11');
INSERT INTO `task` VALUES ('16', 'string', '0', '1', '1', '1', '01', '0', 'string', '0', 'string', 'string', 'string', '0', '0', 'string', 'string', 'string', 'string', 'string', 'string', 'string', '0', 'string', '0', '0', 'string', '2018-05-16 13:27:52', '2018-05-16 10:42:45', '0', '11');

-- ----------------------------
-- Table structure for taskkey
-- ----------------------------
DROP TABLE IF EXISTS `taskkey`;
CREATE TABLE `taskkey` (
  `id` int(8) NOT NULL AUTO_INCREMENT COMMENT '搜索关键字id',
  `keyword` varchar(100) DEFAULT NULL COMMENT '任务搜索关键字',
  `taskkey_num` int(11) DEFAULT NULL COMMENT '任务的单数',
  `from_hour` int(8) DEFAULT NULL COMMENT '任务开始小时',
  `from_min` int(8) DEFAULT NULL COMMENT '任务开始分钟',
  `to_hour` int(8) DEFAULT NULL COMMENT '任务结束小时',
  `to_min` int(8) DEFAULT NULL COMMENT '任务结束分钟',
  `appoints` varchar(255) DEFAULT NULL COMMENT '指定的文字/图片/关键字(图片/关键字多个用逗号隔开)',
  `taskkey_type` int(4) DEFAULT NULL COMMENT '任务类型(1普通任务 2指定关键词任务 3指定图片任务 4指定文字任务)',
  `task_id` int(8) DEFAULT NULL COMMENT '任务id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of taskkey
-- ----------------------------
INSERT INTO `taskkey` VALUES ('27', 'string', '0', '0', '0', '0', '0', 'string', '1', '15');
INSERT INTO `taskkey` VALUES ('28', 'string', '0', '0', '0', '0', '0', 'string', '2', '15');
INSERT INTO `taskkey` VALUES ('29', 'string', '0', '0', '0', '0', '0', 'string', '3', '15');
INSERT INTO `taskkey` VALUES ('30', 'string', '0', '0', '0', '0', '0', 'string', '4', '15');
INSERT INTO `taskkey` VALUES ('31', 'string', '0', '0', '0', '0', '0', 'string', '1', '16');
INSERT INTO `taskkey` VALUES ('32', 'string', '0', '0', '0', '0', '0', 'string', '2', '16');
INSERT INTO `taskkey` VALUES ('33', 'string', '0', '0', '0', '0', '0', 'string', '3', '16');
INSERT INTO `taskkey` VALUES ('34', 'string', '0', '0', '0', '0', '0', 'string', '4', '16');

-- ----------------------------
-- Table structure for taskpicture
-- ----------------------------
DROP TABLE IF EXISTS `taskpicture`;
CREATE TABLE `taskpicture` (
  `id` int(8) NOT NULL AUTO_INCREMENT,
  `picture` longtext COMMENT '图片base64码',
  `taskkey_id` int(8) DEFAULT NULL COMMENT '任务搜索关键字id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of taskpicture
-- ----------------------------
INSERT INTO `taskpicture` VALUES ('3', 'string', '29');
INSERT INTO `taskpicture` VALUES ('4', 'string', '33');

-- ----------------------------
-- Table structure for user
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
