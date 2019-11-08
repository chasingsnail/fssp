/*!
 * User Profile
 */
var userprofile = function (option) {
	if (typeof option == 'string' && option == 'close') {
		var userProfileContainer;
		try {
			userProfileContainer = top.window.getUserProfileContainer();
		} catch (e) {
			userProfileContainer = top.window.document.body;
		}
		if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
			_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
			_profile_constainer.remove();
		}
	} else if (typeof option == 'string' && option == 'hide') {
		var userProfileContainer;
		try {
			userProfileContainer = top.window.getUserProfileContainer();
		} catch (e) {
			userProfileContainer = top.window.document.body;
		}
		if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
			_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
			_profile_constainer.remove();
			var _profile_operate = _profile_constainer.find('.awsui-upd-operate');
			if (_profile_constainer.css('right') == '0px') {
				_profile_constainer.animate({right: -_profile_constainer.width() + 'px'}, "slow", function () {
					_profile_operate.attr('title', 显示).text('<<');
					_profile_operate.hide();
				});
			}
		}
	}
	var tm;
	var tm1
	if ($.browser.isMobile || $.browser.isIPad) {
		return;
	}
	$(document).on("mouseenter.over", ".awsui-user-profile", function (event) {
		window.clearTimeout(tm1);
		var target = $(this);
		tm1 = setTimeout(function () {
			var id = 'awsui_userprofile';
			var userProfileContainer;
			try {
				userProfileContainer = top.window.getUserProfileContainer();
			} catch (e) {
				userProfileContainer = top.window.document.body;
			}
			var user_profile = $('<div id="' + id + '" class="awsui-userprofile-container"></div>');
			if ($("#sid").length > 0) {
				sid = $('#sid').val();
			}
			if (window.sid != undefined) {
				sid = window.sid;
			}
			if (sid == undefined) {
				user_profile.text(页面无法读取参数);
			}
			var userId = target.attr('userId');
			var flag = target.attr('id');
			if (userId == '') return;
			if (tm != undefined) {
				$('.awsui-userprofile-container').remove();
				window.clearTimeout(tm);
			}
			user_profile.appendTo(document.body);
			// 1. 处理显示位置
			var up = user_profile;
			var by = document.body;
			// 1.1 水平方向位置
			var targetOffsetLeft = target.offset().left;
			var upWidth = user_profile.outerWidth() + 5;
			var bodyScrollLeft = document.body.scrollLeft;
			var winWidth = $(window).width();
			if (targetOffsetLeft - bodyScrollLeft + upWidth > winWidth) {
				user_profile.css('left', (winWidth - upWidth) + 'px');
			} else {
				user_profile.css('left', (targetOffsetLeft + bodyScrollLeft) + 'px');
			}
			// 1.2 垂直方向位置
			var targetOffsetTop = target.offset().top;
			var upHeight = user_profile.outerHeight() + 5;
			var targetHeight = target.height();
			// 兼容IE和火狐
			var bodyScrollTop = window.pageYOffset
				|| document.documentElement.scrollTop
				|| document.body.scrollTop
				|| 0;
			var winHeight = $(window).height();
			if (targetOffsetTop - bodyScrollTop + targetHeight + upHeight > winHeight) {
				var tmpTop = targetOffsetTop - upHeight;
				if (tmpTop < 0) {//如果top小于0了，那么让top=5
					tmpTop = 5;
					//然后让left加上自身的宽度，防止user_profile挡住自身的文字
					var tmpLeft = parseInt(user_profile.css('left')) + target.width() + 5;
					user_profile.css('left', (tmpLeft) + 'px');
				}
				user_profile.css('top', (tmpTop) + 'px');
			} else {
				user_profile.css('top', (targetOffsetTop + targetHeight) + 'px');
			}
			var test_value = '\t target.offsetLeft\t ' + target.offset().left + '\t body.scrollLeft\t ' + by.scrollLeft + '\t win.width\t ' + $(window).width() + '\t up.width\t ' + up.width()
				+ '\t target.offsetTop\t ' + target.offset().top + '\t body.scrollTop\t ' + bodyScrollTop + '\t win.height \t ' + $(window).height() + '\t up.height\t ' + up.height() + ' \t target.height\t' + target.height();
			if (sid != undefined) {
				// 加载用户概要信息
				awsui.ajax.post('./jd?sid=' + sid + '&cmd=CLIENT_ORG_USER_PROFILE', {uid: userId}, function (ro) {
					var user_info_container = $('<div class="awsui-userprofile-info-container"></div>');
					if (ro.result == "warning" && ro.msg == "notFined") {
						//未找到人时，不显示头像
						var user_photo = "";//$('<div class="awsui-userprofile-photo-container"><img class="awsui-userprofile-photo" src="notfined" /></div>');
						var user_name = $('<span class="awsui-userprofile-info user-name">' + 对不起未找到此人信息 + '</span>');
						user_profile.append(user_photo).append(user_info_container);
						user_info_container.append(user_name);
						return;
					}
					var userInfo = ro['data'];
					var userProfileData = userInfo.userProfileData;
					var user_photo = $('<div class="awsui-userprofile-photo-container"></div>');
					user_profile.append(user_photo).append(user_info_container);
					for (var up = 0; up < userProfileData.length; up++) {
						var eachUp = userProfileData[up];
						var item = eachUp["item"];
						var name = eachUp["name"];
						var isOpen = eachUp["isOpen"];
						if (item == "userPhoto" && isOpen == true) {
							//user_photo = $('<div class="awsui-userprofile-photo-container"><img class="awsui-userprofile-photo" src="' + userInfo['userPhoto'] + '" /></div>');
							$(".awsui-userprofile-photo-container").append('<img class="awsui-userprofile-photo" src="' + userInfo['userPhoto'] + '" />');
							continue;
						} else if (item == "detail" && isOpen == true) {
							// 是否安装个人主页App
							if (userInfo['profile-app']) {
								var detail_btn = $('<span type="button" class="button blue custom" style="margin-top: 10px;padding:3px 4px; min-width:45px;">' + 详细 + '</span>');
								user_photo.append(detail_btn);
								// 点击查看详细信息
								detail_btn.click(function (e) {
									if (top.window.loadbackground) {
										top.window.loadbackground(user_profile, userProfileContainer, userInfo['userId'], flag, sid);
									} else {
										//对原版支持，考虑是否删除 by wzw
										loadbackground(user_profile, userProfileContainer, userInfo['userId'], flag, sid);
									}
									e.stopPropagation();    // 阻止事件冒泡
								});
							}
							continue;
						} else if (item == "online" && isOpen == true) {
							var user_online = $('<span class="awsui-userprofile-online" title="' + 在线 + '"></span>');	// 是否在线
							if (!userInfo['online']) {
								user_online.addClass('un');
								user_online.attr('title', 离线);
							}
							user_info_container.append(user_online);
							continue;
						} else if (item == "userName" && isOpen == true) {
							var userIdHtml = '';
							if (eachUp.showUserId === true) {
								userIdHtml = ' <span style="font-weight: initial;font-size: 12px;">(' + userInfo['userId'] + ')</span>';
							}
							var user_name = $('<span class="awsui-userprofile-info user-name" title="' + userInfo['userName'] + '">' + userInfo['userName'] + userIdHtml + '</span>');		// 用户姓名
							user_info_container.append(user_name);
							continue;
						} else if (item == "departmentName" && isOpen == true) {
							var dept_name = $('<div class="awsui-userprofile-info dept" title="' + userInfo['departmentName'] + '">' + userInfo['departmentName'] + '</div>');	// 部门
							user_info_container.append(dept_name);
							continue;
						} else if (item == "positionName" && isOpen == true) {
							var roleInfo = "";
							if (userInfo['roleName'] != undefined && userInfo['roleName'] != '') {//默认显示角色名称
								roleInfo = userInfo['roleName'];
							}
							if (userInfo['positionName'] != undefined && userInfo['positionName'] != '') {//如果设置了职位名称，则显示
								roleInfo = userInfo['positionName'];
							}
							var position_name = $('<div class="awsui-userprofile-info position" title="' + roleInfo + '">' + roleInfo + '</div>');	// 岗位
							// if (userInfo['positionName'] != undefined && userInfo['positionName'] != '') {
							user_info_container.append(position_name);
							// }
							continue;
						} else if (item == "mobile" && isOpen == true) {
							// 手机号
							if (userInfo['mobile'] != undefined && userInfo['mobile'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info mobile" title="' + userInfo['mobile'] + '"><span class="awsui-userprofile-info-label mobile"></span>' + userInfo['mobile'] + '</div>');
							}
							continue;
						} else if (item == "officeTel" && isOpen == true) {
							// 电话号码
							if (userInfo['officeTel'] != undefined && userInfo['officeTel'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info office-tel" title="' + userInfo['officeTel'] + '"><span class="awsui-userprofile-info-label office-tel"></span>' + userInfo['officeTel'] + '</div>');
							}
						} else if (item == "email" && isOpen == true) {
							// 邮件
							if (userInfo['email'] != undefined && userInfo['email'] != '') {
								user_info_container.append('<div class="awsui-userprofile-info email" title="' + userInfo['email'] + '"><span class="awsui-userprofile-info-label email"></span>' + userInfo['email'] + '</div>');
							}
							continue;
						}
					}
					var msgTypeOption = "";
					if (userInfo['profile-notification'] === true) {
						msgTypeOption += "<option value='com.actionsoft.apps.notification'>" + 通知 + "</option>";
					}
					if (userInfo['profile-notification-wechat'] === true) {
						msgTypeOption += "<option value='com.actionsoft.apps.wechat'>" + 微信 + "</option>";
					}
					// 发送系统消息
					if (msgTypeOption.length > 0) {
						var sendMsg = $('<span class="awsui-userprofile-info sendmsg" title="' + 发送消息 + '"></span>');
						user_info_container.append(sendMsg);
						sendMsg.on("click", function (e) {
							var msgDiv = "<table style='margin:0 auto;' class='awsui-ux'><tr>";
							msgDiv += "<td class='awsui-ux-title' style='width:20%;padding-left:0px;' nowrap='nowrap'>" + 接收人 + "</td>";
							msgDiv += "<td id='targetId' style='width:30%;overflow:hidden;' tit='" + userId + "'>" + userInfo['userName'] + "</td>";
							msgDiv += "<td class='awsui-ux-title' style='width:20%;'>" + 沟通方式 + "</td>";
							msgDiv += "<td style='width:30%;'>";
							msgDiv += "<select id='msgType' style='width:130px;' nofit='true' class='awsui-select'>";
							msgDiv += msgTypeOption;
							msgDiv += "</select>";
							msgDiv += "</td></tr>";
							msgDiv += "<tr><td class='awsui-ux-title' style='width:20%;padding-left:0px;' valign='top'>" + 消息内容 + "</td><td colspan='3' style='width:80%;' class='required' style='padding:10px 15px 0 0;'>";
							msgDiv += "<textarea id='msgContent' placeholder='" + 请输入内容 + "' style='resize:none;outline:none;width:348px;height:120px;' class='txt'></textarea>";
							msgDiv += "<span style='display: block; text-align: left; padding: 3px 0 10px 0; '>" + 还可输入 + "<span id='msgContentSize'>200</span>" + 字 + "</span></td></tr></table>";
							$("#dialog_msg").remove();
							var dialogDiv = document.createElement('div');
							dialogDiv.id = "dialog_msg";
							dialogDiv.style.display = "none";
							dialogDiv.innerHTML = msgDiv;
							document.body.appendChild(dialogDiv);
							$(".awsui-select").customSelect();
							$("#dialog_msg td").css("padding-top", "15px");
							$('#msgContent').on('keyup', function (e) {
								var len = target.val().length;
								if (len > 200) {
									$.simpleAlert(最多允许输入200字);
									target.val(target.val().substring(0, 200));
									target.focus();
								}
								$('#msgContentSize').text(200 - (len > 200 ? 200 : len));
							});
							$("#dialog_msg").dialog({
								title: 发送消息,
								width: 500,
								height: 320,
								model: true,
								buttons: [{
									text: 发送,
									cls: "blue",
									handler: function () {
										var msgContent = $('#msgContent').val();
										if ($.trim(msgContent) == '') {
											$.simpleAlert('[' + 消息内容 + ']' + 不能为空, 'info');
											return;
										}
										var params = {};
										params.targetId = $("#targetId").attr("tit");
										params.msgContent = $("#msgContent").val();
										params.msgType = $("#msgType").val();
										$.post('./jd?sid=' + sid + '&cmd=com.actionsoft.apps.profile.communicate', params, function (responseObject) {
											if (responseObject['result'] == 'ok') {
												$("#dialog_msg").dialog('close');
												$("#msgContent").val("");
												$.simpleAlert('close');
												$.simpleAlert(发送成功, 'ok', 1000);
											} else {
												$.simpleAlert(responseObject['msg'], responseObject['result']);
											}
										}, 'json');
									}
								}]
							});
							e.stopPropagation();    // 阻止事件冒泡
						});
					}
				}, 'json');
			}
			target.off("mouseleave.over").on("mouseleave.over", function (e) {
				tm = window.setTimeout(function () {
					$(".awsui-userprofile-container").remove();
				}, 200);
				e.preventDefault();
			});
			$(".awsui-userprofile-container").on("mouseenter", function () {
				window.clearTimeout(tm);
			});
			$(".awsui-userprofile-container").on("mouseleave", function (e) {
				$(this).remove();
			});
		}, 300);
	});
	$(document).on("mouseleave.over", ".awsui-user-profile", function (e) {
		window.clearTimeout(tm1);
	});
};

function loadbackground(user_profile, userProfileContainer, userId, flag, sid) {
	user_profile.remove();
	var _profile_constainer;
	if ($(userProfileContainer).find('.awsui-upd-container')[0]) {
		_profile_constainer = $(userProfileContainer).find('.awsui-upd-container');
		var _profile_operate = _profile_constainer.find('.awsui-upd-operate');
		if (_profile_constainer.css('right') != '0px') {
			_profile_constainer.animate({right: '0'}, "slow");
		}
		if (_profile_constainer.attr('userId') == userId) {
			return;
		}
		if (top.window.awsuiProfileTabs != undefined) {
			top.window.awsuiProfileTabs.removeAllTabs();
		}
	} else {
		_profile_constainer = $('<div class="awsui-upd-container"></div>').appendTo(userProfileContainer);
		_profile_constainer.animate({right: '0'}, "slow");
//									_profile_constainer.css('right', 0).show();
		var _profile_operate = $('<div class=" awsui-iconfont awsui-upd-operate">&#xe6fe;</div>');
		_profile_constainer.append(_profile_operate);
		// 隐藏/展开
		_profile_operate.unbind('click').click(function (e) {
			var _self = $(this);
			if (_self.parent().css('right') == '0px') {
				_self.parent().animate({right: -_self.parent().width() + 'px'}, "slow");
			} else {
				_self.parent().animate({right: '0'}, "slow");
			}
		});
		// 组装页面
		var _profile_user_container = $('<div class="awsui-upd-user-container"></div>');
		var _profile_user_photo = $('<div class="awsui-upd-photo-container"><img class="awsui-upd-photo" /></div>');
		var _profile_info_container = $('<div class="awsui-upd-info-container"></div>');
		var _profile_info_user_name = $('<div class="awsui-upd-info user-name"></div>');
		_profile_info_user_name.append('<div class="awsui-upd-user-online"></div>');
		_profile_info_user_name.append('<span class="user-name"></span>');
		var _profile_info_position_name = $('<div class="awsui-upd-info position-name"></div>');
		var _profile_info_org_info = $('<div class="awsui-upd-info org-info"></div>');
		// 手机、电话、邮箱
		var _profile_info_mobile = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label mobile detail"></span><span class="awsui-userprofile-info-value mobile"></span></div>');	// 手机号
		var _profile_info_office_tel = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label office-tel detail"></span><span class="awsui-userprofile-info-value office-tel"></span></div>');	// 电话号码
		var _profile_info_email = $('<div class="awsui-upd-info"><span class="awsui-userprofile-info-label email detail"></span><span class="awsui-userprofile-info-value email"></span></div>');	// 邮件
		// 菜单信息
		var _profile_content_container = $('<div class="awsui-upd-content-container"></div>');
		var _profile_profile_container = $('<div class="awsui-upd-profile-conatiner"></div>');
		var _profile_profile_tabs = $('<div id="awsuiUpdProfileTabs" class="awsui-simple-tab" style="height: 35px;"></div>');
		var _profile_body_container = $('<iframe id="awsuUpdProfileContent" class="awsui-upd-iframe"></iframe>');
		_profile_constainer.append(_profile_user_container).append(_profile_content_container);
		_profile_user_container.append(_profile_user_photo).append(_profile_info_container);
		_profile_info_container.append(_profile_info_user_name).append(_profile_info_position_name).append(_profile_info_org_info)
			.append(_profile_info_mobile).append(_profile_info_office_tel).append(_profile_info_email);
		_profile_content_container.append(_profile_profile_container);//.append(_profile_body_container);
		_profile_profile_container.append(_profile_profile_tabs).append(_profile_body_container);
		_profile_body_container.css('height', _profile_profile_container.height() - _profile_profile_tabs.height() - 5);
		// 菜单信息
		var options = {
			onClick: function (item) {
				//if(item.index==0){
				//在个人背景推出的相同人员名单中点击详细,解决隐藏相同名单DIV失效问题/切换tab标签移除该相同人员名单div
				if ($(userProfileContainer).find('.sameusercontainer').hasClass('sameusercontainer')) {
					var my_profile_constainer = $(userProfileContainer).find('.sameusercontainer');
					my_profile_constainer.remove();
				}
				//	}
				_profile_constainer.find('#awsuUpdProfileContent').attr('src', item.url);
				_profile_constainer.find('#awsuUpdProfileContent').find('.awsui-user-profile').removeClass('awsui-user-profile');
				return true;
			},
			height: 35,
			contentPanel: $("#awsuUpdProfileContent"),
			nogradient: true
		};
		top.window.awsuiProfileTabs = awsui.tabs.init(_profile_profile_tabs, options);
	}
	_profile_constainer.attr('userId', userId);
	// 加载聚合菜单
	awsui.ajax.post('./jd?sid=' + sid + '&cmd=com.actionsoft.apps.profile_load_profiles', {userId: userId}, function (ro) {
		// 用户信息
		var userInfo = ro['data']['userInfo'];
		_profile_constainer.find('.awsui-upd-photo').attr('src', userInfo['userPhoto']);
		_profile_constainer.find('.awsui-upd-info.user-name .user-name').text(userInfo['userName']).attr('title', userInfo['userName']);
		if (userInfo['online']) {
			_profile_constainer.find('.awsui-upd-user-online').removeClass('un').attr('title', 在线);
		} else {
			_profile_constainer.find('.awsui-upd-user-online').addClass('un').attr('title', 离线);
		}
		_profile_constainer.find('.awsui-upd-info.position-name').text(userInfo['positionName'] == undefined ? '' : userInfo['positionName']).attr('title', userInfo['positionName'] == undefined ? '' : userInfo['positionName']);
		_profile_constainer.find('.awsui-upd-info.org-info').text(userInfo['departmentName'] + '，' + userInfo['companyName']).attr('title', userInfo['departmentName'] + '，' + userInfo['companyName']);
		if (userInfo['mobile'] == undefined || userInfo['mobile'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.mobile').text(userInfo['mobile']).attr('title', userInfo['mobile']);
		}
		if (userInfo['officeTel'] == undefined || userInfo['officeTel'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.office-tel').text(userInfo['officeTel']).attr('title', userInfo['officeTel']);
		}
		if (userInfo['email'] == undefined || userInfo['email'] == '') {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').parent().hide();
		} else {
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').parent().show();
			_profile_constainer.find('.awsui-upd-info .awsui-userprofile-info-value.email').text(userInfo['email']).attr('title', userInfo['email']);
		}
		// 聚合菜单列表
		var profileList = ro['data']['profileList'];
		var len = profileList.length;
		var userId_rep = userInfo['userId'].replace(/\&/g, "%26");//账号包含＆符号时，我的动态和个人背景报错
		userId_rep = encodeURI(userId_rep);
		for (var i = 0; i < len; i++) {
			var time = (new Date()).valueOf();
			var setting = {
				item: {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[i]['id'] + '&userId=' + userId_rep,
					title: profileList[i]['menuName'],
					index: i
				},
				contextMenu: true,
				close: false
			};
			top.window.awsuiProfileTabs.addTab(setting);
		}
		if (len > 0) {
			if (flag == "userName") {
				// 选择个人背景
				var item = {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[1]['id'] + '&userId=' + userId_rep,
					title: profileList[1]['menuName'],
					index: 0
				};
				var obj = top.window.awsuiProfileTabs.getTabLast();
				$(obj).click();
				top.window.awsuiProfileTabs.tabContainer.stop().animate({
					left: "0px"
				}, 500);
				// 去除第一个选中的样式
				top.window.awsuiProfileTabs.getTabFirst().removeClass('current');
			} else {
				// 选择第一个
				var item = {
					url: './w?sid=' + sid + '&cmd=com.actionsoft.apps.profile_call_main&profileId=' + profileList[0]['id'] + '&userId=' + userId_rep,
					title: profileList[0]['menuName'],
					index: 0
				};
				var obj = top.window.awsuiProfileTabs.getTabFirst();
				$(obj).click();
				top.window.awsuiProfileTabs.tabContainer.stop().animate({
					left: "0px"
				}, 500);
				// 去除最后一个选中的样式
				top.window.awsuiProfileTabs.getTabLast().removeClass('current');
			}
		}
	}, 'json');
	_profile_constainer.unbind('scroll.awsui.userpofile').bind('scroll.awsui.userpofile', function (event, delta) {
		event.stopPropagation();    // 阻止事件冒泡
	});
}

$(document).ready(function () {
	userprofile();
});
