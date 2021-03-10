/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50729
Source Host           : localhost:3306
Source Database       : classmanage

Target Server Type    : MYSQL
Target Server Version : 50729
File Encoding         : 65001

Date: 2020-10-08 23:22:32
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_no` varchar(9) DEFAULT NULL,
  `admin_name` varchar(4) DEFAULT NULL,
  `admin_pwd` varchar(20) DEFAULT NULL,
  `admin_image` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`admin_id`),
  KEY `admin_no` (`admin_no`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '181543148', '张小三', '1234', '181543148.jpg');
INSERT INTO `admin` VALUES ('6', '181543147', '李小四', '1234', '181543147.jpg');

-- ----------------------------
-- Table structure for admin_role
-- ----------------------------
DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE `admin_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(9) NOT NULL,
  `role_id` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_admin_no` (`admin_id`),
  KEY `fk_role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin_role
-- ----------------------------
INSERT INTO `admin_role` VALUES ('1', '1', '1');
INSERT INTO `admin_role` VALUES ('2', '6', '1');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `class_id` int(11) NOT NULL AUTO_INCREMENT,
  `class_no` varchar(7) COLLATE utf8_bin DEFAULT NULL,
  `class_name` varchar(4) COLLATE utf8_bin NOT NULL,
  `stu_nums` int(4) DEFAULT NULL,
  `graduated` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('1', '1815431', '计科一班', '12', 'N');
INSERT INTO `class` VALUES ('2', '1815432', '计科二班', '10', 'N');
INSERT INTO `class` VALUES ('3', '1815433', '计科三班', '10', 'N');
INSERT INTO `class` VALUES ('4', '1815434', '计科四班', '10', 'N');
INSERT INTO `class` VALUES ('5', '18154A1', '互金一班', '10', 'N');
INSERT INTO `class` VALUES ('6', '18154A2', '互金二班', '10', 'N');
INSERT INTO `class` VALUES ('7', '18154A3', '互金三班', '10', 'N');
INSERT INTO `class` VALUES ('8', '18154A4', '互金四班', '10', 'N');
INSERT INTO `class` VALUES ('9', '1815436', '计科六班', '2', 'Y');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `course_id` int(10) NOT NULL AUTO_INCREMENT,
  `course_name` varchar(30) NOT NULL,
  PRIMARY KEY (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('1', '数字电路');
INSERT INTO `course` VALUES ('2', 'javaEE');
INSERT INTO `course` VALUES ('3', '计算机网络');
INSERT INTO `course` VALUES ('4', '数据结构');
INSERT INTO `course` VALUES ('5', '离散数学');
INSERT INTO `course` VALUES ('6', '概率论');
INSERT INTO `course` VALUES ('7', '金融风险');
INSERT INTO `course` VALUES ('8', '互联网金融');
INSERT INTO `course` VALUES ('9', '软件工程');
INSERT INTO `course` VALUES ('10', 'python');

-- ----------------------------
-- Table structure for course_record
-- ----------------------------
DROP TABLE IF EXISTS `course_record`;
CREATE TABLE `course_record` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `t_id` int(10) DEFAULT NULL,
  `class_id` int(10) NOT NULL,
  `course_id` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_t_id` (`t_id`),
  KEY `fk_class_id` (`class_id`),
  KEY `fk_course_id` (`course_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of course_record
-- ----------------------------
INSERT INTO `course_record` VALUES ('1', '1', '1', '1');
INSERT INTO `course_record` VALUES ('2', '14', '2', '1');
INSERT INTO `course_record` VALUES ('3', '2', '3', '1');
INSERT INTO `course_record` VALUES ('4', '2', '4', '1');
INSERT INTO `course_record` VALUES ('5', '3', '1', '2');
INSERT INTO `course_record` VALUES ('6', '3', '2', '2');
INSERT INTO `course_record` VALUES ('7', '4', '3', '2');
INSERT INTO `course_record` VALUES ('8', '4', '4', '2');
INSERT INTO `course_record` VALUES ('9', '5', '1', '3');
INSERT INTO `course_record` VALUES ('10', '5', '2', '3');
INSERT INTO `course_record` VALUES ('11', '6', '3', '3');
INSERT INTO `course_record` VALUES ('12', '6', '4', '3');
INSERT INTO `course_record` VALUES ('13', '7', '5', '4');
INSERT INTO `course_record` VALUES ('14', '7', '6', '4');
INSERT INTO `course_record` VALUES ('15', '8', '7', '4');
INSERT INTO `course_record` VALUES ('16', '8', '8', '4');
INSERT INTO `course_record` VALUES ('17', '9', '5', '5');
INSERT INTO `course_record` VALUES ('18', '9', '6', '5');
INSERT INTO `course_record` VALUES ('19', '10', '7', '5');
INSERT INTO `course_record` VALUES ('20', '10', '8', '5');
INSERT INTO `course_record` VALUES ('21', '11', '5', '6');
INSERT INTO `course_record` VALUES ('22', '11', '6', '6');
INSERT INTO `course_record` VALUES ('23', '12', '7', '6');
INSERT INTO `course_record` VALUES ('24', '12', '8', '6');
INSERT INTO `course_record` VALUES ('25', null, '5', '1');
INSERT INTO `course_record` VALUES ('26', '14', '6', '1');
INSERT INTO `course_record` VALUES ('27', null, '1', '7');

-- ----------------------------
-- Table structure for perm
-- ----------------------------
DROP TABLE IF EXISTS `perm`;
CREATE TABLE `perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `perm_id` int(20) NOT NULL,
  `perm_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `perm_id` (`perm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of perm
-- ----------------------------
INSERT INTO `perm` VALUES ('1', '1', 'admin:all');
INSERT INTO `perm` VALUES ('2', '2', 'class:add');
INSERT INTO `perm` VALUES ('3', '3', 'class:update');
INSERT INTO `perm` VALUES ('4', '4', 'class:delete');
INSERT INTO `perm` VALUES ('5', '5', 'class:query');
INSERT INTO `perm` VALUES ('6', '6', 'student:add');
INSERT INTO `perm` VALUES ('7', '7', 'student:update');
INSERT INTO `perm` VALUES ('8', '8', 'student:delete');
INSERT INTO `perm` VALUES ('9', '9', 'student:query');
INSERT INTO `perm` VALUES ('10', '10', 'teacher:add');
INSERT INTO `perm` VALUES ('11', '11', 'teacher:update');
INSERT INTO `perm` VALUES ('12', '12', 'teacher:delete');
INSERT INTO `perm` VALUES ('13', '13', 'teacher:query');
INSERT INTO `perm` VALUES ('14', '14', 'course:add');
INSERT INTO `perm` VALUES ('15', '15', 'course:update');
INSERT INTO `perm` VALUES ('16', '16', 'course:delete');
INSERT INTO `perm` VALUES ('17', '17', 'course:query');
INSERT INTO `perm` VALUES ('18', '18', 'admin');
INSERT INTO `perm` VALUES ('19', '19', 'teacher');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(20) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('1', '1', 'super_admin');
INSERT INTO `role` VALUES ('2', '2', 'admin');
INSERT INTO `role` VALUES ('3', '3', 'main_teacher');
INSERT INTO `role` VALUES ('4', '4', 'teacher');

-- ----------------------------
-- Table structure for role_perm
-- ----------------------------
DROP TABLE IF EXISTS `role_perm`;
CREATE TABLE `role_perm` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_id` int(20) NOT NULL,
  `perm_id` int(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_role_id2` (`role_id`),
  KEY `fk_perm_id2` (`perm_id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of role_perm
-- ----------------------------
INSERT INTO `role_perm` VALUES ('1', '1', '1');
INSERT INTO `role_perm` VALUES ('2', '1', '2');
INSERT INTO `role_perm` VALUES ('3', '1', '3');
INSERT INTO `role_perm` VALUES ('4', '1', '4');
INSERT INTO `role_perm` VALUES ('5', '1', '5');
INSERT INTO `role_perm` VALUES ('6', '1', '6');
INSERT INTO `role_perm` VALUES ('7', '1', '7');
INSERT INTO `role_perm` VALUES ('8', '1', '8');
INSERT INTO `role_perm` VALUES ('9', '1', '9');
INSERT INTO `role_perm` VALUES ('10', '1', '10');
INSERT INTO `role_perm` VALUES ('11', '1', '11');
INSERT INTO `role_perm` VALUES ('12', '1', '12');
INSERT INTO `role_perm` VALUES ('13', '1', '13');
INSERT INTO `role_perm` VALUES ('14', '1', '14');
INSERT INTO `role_perm` VALUES ('15', '1', '15');
INSERT INTO `role_perm` VALUES ('16', '1', '16');
INSERT INTO `role_perm` VALUES ('17', '1', '17');
INSERT INTO `role_perm` VALUES ('18', '1', '18');
INSERT INTO `role_perm` VALUES ('19', '3', '5');
INSERT INTO `role_perm` VALUES ('20', '3', '6');
INSERT INTO `role_perm` VALUES ('21', '3', '7');
INSERT INTO `role_perm` VALUES ('22', '3', '8');
INSERT INTO `role_perm` VALUES ('23', '3', '9');
INSERT INTO `role_perm` VALUES ('24', '3', '11');
INSERT INTO `role_perm` VALUES ('25', '3', '13');
INSERT INTO `role_perm` VALUES ('26', '3', '17');
INSERT INTO `role_perm` VALUES ('27', '3', '19');
INSERT INTO `role_perm` VALUES ('28', '4', '5');
INSERT INTO `role_perm` VALUES ('29', '4', '9');
INSERT INTO `role_perm` VALUES ('30', '4', '11');
INSERT INTO `role_perm` VALUES ('31', '4', '13');
INSERT INTO `role_perm` VALUES ('32', '4', '17');
INSERT INTO `role_perm` VALUES ('33', '4', '19');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `stu_id` int(11) NOT NULL AUTO_INCREMENT,
  `stu_no` varchar(9) COLLATE utf8_bin DEFAULT NULL,
  `stu_name` varchar(4) COLLATE utf8_bin NOT NULL,
  `gender` char(2) COLLATE utf8_bin DEFAULT NULL,
  `stu_phone` varchar(11) COLLATE utf8_bin DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  `graduated` varchar(2) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`stu_id`),
  KEY `fk_emp_dept` (`class_id`) USING BTREE,
  CONSTRAINT `student_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('1', '181543101', '陈楚', 'F', '18154310101', '181543101@163.com', '1', 'N');
INSERT INTO `student` VALUES ('2', '181543102', '陈晓怡', 'F', '18154310202', '181543102@163.com', '1', 'N');
INSERT INTO `student` VALUES ('3', '181543103', '冯雪雯', 'M', '18154310303', '181543103@163.com', '1', 'N');
INSERT INTO `student` VALUES ('4', '181543104', '何桂梅', 'F', '18154310404', '1427732068@163.com', '1', 'N');
INSERT INTO `student` VALUES ('5', '181543105', '洪诗欣', 'F', '18154310505', '181543105@163.com', '1', 'N');
INSERT INTO `student` VALUES ('6', '181543106', '赖少卿', 'M', '18154310606', '181543106@163.com', '1', 'N');
INSERT INTO `student` VALUES ('7', '181543107', '李雅琪', 'M', '18154310707', '181543107@163.com', '1', 'N');
INSERT INTO `student` VALUES ('8', '181543108', '林嘉怡', 'M', '18154310808', '181543108@163.com', '1', 'N');
INSERT INTO `student` VALUES ('9', '181543109', '林锚烁', 'M', '18154310909', '181543109@163.com', '1', 'N');
INSERT INTO `student` VALUES ('10', '181543110', '王怡纯', 'M', '18154311010', '181543110@163.com', '1', 'N');
INSERT INTO `student` VALUES ('11', '181543202', '陈静汶', 'F', '18154320202', '181543202@163.com', '2', 'N');
INSERT INTO `student` VALUES ('12', '181543203', '陈思侨', 'F', '18154320303', '181543203@163.com', '2', 'N');
INSERT INTO `student` VALUES ('13', '181543204', '邓颖琳', 'F', '18154320404', '181543204@163.com', '2', 'N');
INSERT INTO `student` VALUES ('14', '181543205', '关美霞', 'F', '18154320505', '181543205@163.com', '2', 'N');
INSERT INTO `student` VALUES ('15', '181543206', '黄凯丽', 'F', '18154320606', '181543206@163.com', '2', 'N');
INSERT INTO `student` VALUES ('16', '181543207', '梁宝莹', 'M', '18154320707', '181543207@163.com', '2', 'N');
INSERT INTO `student` VALUES ('17', '181543208', '林素娟', 'M', '18154320808', '181543208@163.com', '2', 'N');
INSERT INTO `student` VALUES ('18', '181543209', '吕杏', 'M', '18154320909', '181543209@163.com', '2', 'N');
INSERT INTO `student` VALUES ('19', '181543210', '余佰蒽', 'M', '18154321010', '181543210@163.com', '2', 'N');
INSERT INTO `student` VALUES ('20', '181543211', '郑贤玲', 'M', '18154321111', '181543211@163.com', '2', 'N');
INSERT INTO `student` VALUES ('21', '181543301', '曾珉慧', 'F', '18154330101', '181543301@163.com', '3', 'N');
INSERT INTO `student` VALUES ('22', '181543302', '方薇', 'F', '18154330202', '181543302@163.com', '3', 'N');
INSERT INTO `student` VALUES ('23', '181543303', '冯潇', 'F', '18154330303', '181543303@163.com', '3', 'N');
INSERT INTO `student` VALUES ('24', '181543304', '黄永玲', 'F', '18154330404', '181543304@163.com', '3', 'N');
INSERT INTO `student` VALUES ('25', '181543305', '李佳萍', 'F', '18154330505', '181543305@163.com', '3', 'N');
INSERT INTO `student` VALUES ('26', '181543306', '林旋华', 'M', '18154330606', '181543306@163.com', '3', 'N');
INSERT INTO `student` VALUES ('27', '181543307', '林依岚', 'M', '18154330707', '181543307@163.com', '3', 'N');
INSERT INTO `student` VALUES ('28', '181543308', '祁琪', 'M', '18154330808', '181543308@163.com', '3', 'N');
INSERT INTO `student` VALUES ('29', '181543309', '乔巧', 'M', '18154330909', '181543309@163.com', '3', 'N');
INSERT INTO `student` VALUES ('30', '181543310', '褥映言', 'M', '18154331010', '181543310@163.com', '3', 'N');
INSERT INTO `student` VALUES ('31', '181543401', '蔡冰梅', 'F', '18154340101', '181543401@163.com', '4', 'N');
INSERT INTO `student` VALUES ('32', '181543402', '冯钰洁', 'F', '18154340202', '181543402@163.com', '4', 'N');
INSERT INTO `student` VALUES ('33', '181543403', '李锐雯', 'F', '18154340303', '181543403@163.com', '4', 'N');
INSERT INTO `student` VALUES ('34', '181543404', '刘家旻', 'F', '18154340404', '181543404@163.com', '4', 'N');
INSERT INTO `student` VALUES ('35', '181543405', '秦一唯', 'F', '18154340505', '181543405@163.com', '4', 'N');
INSERT INTO `student` VALUES ('36', '181543406', '丘雯', 'M', '18154340606', '181543406@163.com', '4', 'N');
INSERT INTO `student` VALUES ('37', '181543407', '王瑞敏', 'M', '18154340707', '181543407@163.com', '4', 'N');
INSERT INTO `student` VALUES ('38', '181543408', '吴晓婷', 'M', '18154340808', '181543408@163.com', '4', 'N');
INSERT INTO `student` VALUES ('39', '181543409', '徐晓珊', 'M', '18154340909', '181543409@163.com', '4', 'N');
INSERT INTO `student` VALUES ('40', '181543410', '杨莹仪', 'M', '18154341010', '181543410@163.com', '4', 'N');
INSERT INTO `student` VALUES ('41', '18154A101', '陈苗', 'F', '18154010101', '18154A101@163.com', '5', 'N');
INSERT INTO `student` VALUES ('42', '18154A102', '陈伟璇', 'F', '18154010202', '18154A102@163.com', '5', 'N');
INSERT INTO `student` VALUES ('43', '18154A103', '陈怡韵', 'F', '18154010303', '18154A103@163.com', '5', 'N');
INSERT INTO `student` VALUES ('44', '18154A104', '陈玉雯', 'F', '18154010404', '18154A104@163.com', '5', 'N');
INSERT INTO `student` VALUES ('45', '18154A105', '方梓茵', 'F', '18154010505', '18154A105@163.com', '5', 'N');
INSERT INTO `student` VALUES ('46', '18154A106', '洪文妍', 'M', '18154010606', '18154A106@163.com', '5', 'N');
INSERT INTO `student` VALUES ('47', '18154A107', '黄超婷', 'M', '18154010707', '18154A107@163.com', '5', 'N');
INSERT INTO `student` VALUES ('48', '18154A108', '黄芸儿', 'M', '18154010808', '18154A108@163.com', '5', 'N');
INSERT INTO `student` VALUES ('49', '18154A109', '李慧玲', 'M', '18154010909', '18154A109@163.com', '5', 'N');
INSERT INTO `student` VALUES ('50', '18154A110', '李旖涵', 'M', '18154011010', '18154A110@163.com', '5', 'N');
INSERT INTO `student` VALUES ('51', '18154A201', '陈冰妍', 'F', '18154020101', '18154A201@163.com', '6', 'N');
INSERT INTO `student` VALUES ('52', '18154A202', '陈春霞', 'F', '18154020202', '18154A202@163.com', '6', 'N');
INSERT INTO `student` VALUES ('53', '18154A203', '陈洁莹', 'F', '18154020303', '18154A203@163.com', '6', 'N');
INSERT INTO `student` VALUES ('54', '18154A204', '程惠纤', 'F', '18154020404', '18154A204@163.com', '6', 'N');
INSERT INTO `student` VALUES ('55', '18154A205', '郭焯婷', 'F', '18154020505', '18154A205@163.com', '6', 'N');
INSERT INTO `student` VALUES ('56', '18154A206', '侯靖宜', 'M', '18154020606', '18154A206@163.com', '6', 'N');
INSERT INTO `student` VALUES ('57', '18154A207', '黄嘉瑜', 'M', '18154020707', '18154A207@163.com', '6', 'N');
INSERT INTO `student` VALUES ('58', '18154A208', '黄思颖', 'M', '18154020808', '18154A208@163.com', '6', 'N');
INSERT INTO `student` VALUES ('59', '18154A209', '梁枫烨', 'M', '18154020909', '18154A209@163.com', '6', 'N');
INSERT INTO `student` VALUES ('60', '18154A210', '梁禧童', 'M', '18154021010', '18154A210@163.com', '6', 'N');
INSERT INTO `student` VALUES ('61', '18154A301', '蔡佳纯', 'F', '18154030101', '18154A301@163.com', '7', 'N');
INSERT INTO `student` VALUES ('62', '18154A302', '陈碧萱', 'F', '18154030202', '18154A302@163.com', '7', 'N');
INSERT INTO `student` VALUES ('63', '18154A303', '陈晓纯', 'F', '18154030303', '18154A303@163.com', '7', 'N');
INSERT INTO `student` VALUES ('64', '18154A304', '邓洁', 'F', '18154030404', '18154A304@163.com', '7', 'N');
INSERT INTO `student` VALUES ('65', '18154A305', '范佳慧', 'F', '18154030505', '18154A305@163.com', '7', 'N');
INSERT INTO `student` VALUES ('66', '18154A306', '付思浓', 'M', '18154030606', '18154A306@163.com', '7', 'N');
INSERT INTO `student` VALUES ('67', '18154A307', '黄凯祥', 'M', '18154030707', '18154A307@163.com', '7', 'N');
INSERT INTO `student` VALUES ('68', '18154A308', '黄妍菁', 'M', '18154030808', '18154A308@163.com', '7', 'N');
INSERT INTO `student` VALUES ('69', '18154A309', '黄毓婷', 'M', '18154030909', '18154A309@163.com', '7', 'N');
INSERT INTO `student` VALUES ('70', '18154A310', '柯欢欢', 'M', '18154031010', '18154A310@163.com', '7', 'N');
INSERT INTO `student` VALUES ('71', '18154A401', '蔡婷妹', 'F', '18154040101', '18154A401@163.com', '8', 'N');
INSERT INTO `student` VALUES ('72', '18154A402', '陈楚榆', 'F', '18154040202', '18154A402@163.com', '8', 'N');
INSERT INTO `student` VALUES ('73', '18154A403', '陈佩琛', 'F', '18154040303', '18154A403@163.com', '8', 'N');
INSERT INTO `student` VALUES ('74', '18154A404', '陈星宇', 'F', '18154040404', '18154A404@163.com', '8', 'N');
INSERT INTO `student` VALUES ('75', '18154A405', '程烨', 'F', '18154040505', '18154A405@163.com', '8', 'N');
INSERT INTO `student` VALUES ('76', '18154A406', '何美璇', 'M', '18154040606', '18154A406@163.com', '8', 'N');
INSERT INTO `student` VALUES ('77', '18154A407', '洪晓曼', 'M', '18154040707', '18154A407@163.com', '8', 'N');
INSERT INTO `student` VALUES ('78', '18154A408', '黄冰', 'M', '18154040808', '18154A408@163.com', '8', 'N');
INSERT INTO `student` VALUES ('79', '18154A409', '黄思曼', 'M', '18154040909', '18154A409@163.com', '8', 'N');
INSERT INTO `student` VALUES ('80', '18154A410', '邝嘉仪', 'M', '18154041010', '18154A410@163.com', '8', 'N');
INSERT INTO `student` VALUES ('84', '181543147', '张洵锴', 'M', '15521066014', '1399375290@qq.com', '1', 'Y');
INSERT INTO `student` VALUES ('85', '181543148', '张映彬', 'M', '15521066014', '1399375290@qq.com', '1', 'Y');
INSERT INTO `student` VALUES ('86', '181543601', '张嘉乐', 'F', '15521066014', '1399375290@qq.com', '9', 'Y');
INSERT INTO `student` VALUES ('87', '181543602', '张洵锴', 'M', '15521066014', '1399375290@qq.com', '9', 'Y');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `t_id` int(11) NOT NULL AUTO_INCREMENT,
  `t_no` varchar(9) DEFAULT NULL,
  `t_name` varchar(4) DEFAULT NULL,
  `t_pwd` varchar(20) DEFAULT NULL,
  `t_image` varchar(80) DEFAULT NULL,
  `gender` varchar(2) DEFAULT NULL,
  `t_phone` varchar(11) DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `inservice` varchar(2) DEFAULT NULL,
  `ismain` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('1', '123456789', '张标啊', '1234', '123456789.jpg', 'M', '15512345678', '15512345678@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('2', '123456788', '刘禹熹', '1234', '123456788.jpg', 'M', '15512345677', '15512345677@qq.com', 'Y', 'N');
INSERT INTO `teacher` VALUES ('3', '123456787', '刘芳', '1234', '123456787.jpg', 'F', '15512345676', '15512345676@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('4', '123456786', '张三', '1234', '123456786.jpg', 'F', '15512345675', '15512345675@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('5', '123456785', '李四', '1234', '123456785.jpg', 'M', '15512345674', '15512345674@qq.com', 'Y', 'N');
INSERT INTO `teacher` VALUES ('6', '123456784', '王五', '1234', '123456784.jpg', 'F', '15512345673', '15512345673@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('7', '123456783', '赵六', '1234', '123456783.jpg', 'F', '15512345672', '15512345672@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('8', '123456782', '巴巴', '1234', '123456782.jpg', 'M', '15512345671', '15512345671@qq.com', 'Y', 'N');
INSERT INTO `teacher` VALUES ('9', '123456781', '九九', '1234', '123456781.jpg', 'F', '15512345669', '15512345669@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('10', '123456780', '时时', '1234', '123456780.jpg', 'F', '15512345668', '15512345668@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('11', '123456779', '一一', '1234', '123456779.jpg', 'M', '15512345667', '15512345667@qq.com', 'Y', 'N');
INSERT INTO `teacher` VALUES ('12', '123456778', '十二', '1234', '123456778.jpg', 'M', '15512345666', '15512345666@qq.com', 'Y', 'Y');
INSERT INTO `teacher` VALUES ('14', '123456754', '寒冬', '00000000', '123456754jpg', 'M', '15521044544', 'handong@qq.com', 'N', 'Y');
INSERT INTO `teacher` VALUES ('18', '123451234', '丘成峰', '00000000', '123451234.jpg', 'M', '15521044544', '1399375290@qq.com', 'N', 'N');
INSERT INTO `teacher` VALUES ('22', '123456123', '黄丽霞', '00000000', '123456123.jpg', 'F', '15521044544', 'huanglixia@qq.com', 'Y', 'Y');

-- ----------------------------
-- Table structure for teacher_class
-- ----------------------------
DROP TABLE IF EXISTS `teacher_class`;
CREATE TABLE `teacher_class` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_id` int(11) DEFAULT NULL,
  `class_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher_class
-- ----------------------------
INSERT INTO `teacher_class` VALUES ('1', '1', '1');
INSERT INTO `teacher_class` VALUES ('2', '3', '2');
INSERT INTO `teacher_class` VALUES ('3', '4', '3');
INSERT INTO `teacher_class` VALUES ('4', '6', '4');
INSERT INTO `teacher_class` VALUES ('5', '7', '5');
INSERT INTO `teacher_class` VALUES ('6', '9', '6');
INSERT INTO `teacher_class` VALUES ('10', '14', '8');

-- ----------------------------
-- Table structure for teacher_role
-- ----------------------------
DROP TABLE IF EXISTS `teacher_role`;
CREATE TABLE `teacher_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `t_id` int(9) DEFAULT NULL,
  `role_id` int(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher_role
-- ----------------------------
INSERT INTO `teacher_role` VALUES ('1', '1', '3');
INSERT INTO `teacher_role` VALUES ('2', '2', '4');
INSERT INTO `teacher_role` VALUES ('3', '3', '3');
INSERT INTO `teacher_role` VALUES ('4', '4', '3');
INSERT INTO `teacher_role` VALUES ('5', '5', '4');
INSERT INTO `teacher_role` VALUES ('6', '6', '3');
INSERT INTO `teacher_role` VALUES ('7', '7', '3');
INSERT INTO `teacher_role` VALUES ('8', '8', '4');
INSERT INTO `teacher_role` VALUES ('9', '9', '3');
INSERT INTO `teacher_role` VALUES ('10', '10', '3');
INSERT INTO `teacher_role` VALUES ('11', '11', '4');
INSERT INTO `teacher_role` VALUES ('12', '12', '3');
INSERT INTO `teacher_role` VALUES ('13', '14', '3');
INSERT INTO `teacher_role` VALUES ('14', '18', '4');
INSERT INTO `teacher_role` VALUES ('15', '22', '3');
