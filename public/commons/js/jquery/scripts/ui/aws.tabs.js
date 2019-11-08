awsui.tabs = {
    init: function (obj, options) {
        var tabs = {
            config: {
                height: "33",
                nogradient: false
            },
            memory: [],
            scrollObj : {},
            tabObj: null,
            tabContainer: null,
            tabContentPanel: null,
            addTab: function (setting, callback) {
                setting = $.extend(options, setting);
                var item = setting.item;
                //如果已经存在
                if (tabs.existsTab(item.index)) {
                    tabs.focusTab(item.index, setting);
                    return;
                }
                tabs.tabContainer.find(".awsui-tabs-items[index]").removeClass("current");
                tabs.tabContainer.find(".awsui-tabs-items[index]").children().children().removeClass("awsui-tab-curent-text");
                var tab_item = $("<div index=" + item.index + " class='awsui-tabs-items " + options.tabPosition + "'><span>" + item.title + "</span></div>")
                       .appendTo(tabs.tabContainer);
                setting.contentPanel.find(".awsui-tab-content-item").removeClass("awsui-tab-this");
                if (item && item.content) {
                    setting.contentPanel.append(item.content);
                    item.content.addClass("awsui-tab-this");
                    item.content.bind("mousewheel",function(event){
                        event.stopPropagation();
                        var that = $(this);
                        var scrollTop = tabs.tabContentPanel.scrollTop();
                        tabs.scrollObj["item"+item.index] = scrollTop;
                    });
                }
                tab_item.css({
                    height: options.height - 8,
                    "line-height": (options.height - 7) + "px"
                });
                tab_item.addClass("current");
                $(".current").children().children().addClass("awsui-tab-curent-text");
                //显示右键菜单
                if (setting.contextMenu) {
                    tabs.initContextMenu(item.index);
                }
                tabs.bindClick(item);
                //如果显示关闭图标
                if (setting.close) {
                    var close = $("<span class='awsui-tabs-icon close'></span>").appendTo(tab_item);
                    close.off("click.tabclose").on("click.tabclose", function (event) {
                        var b = tabs.onCloseTab(close.parent());
                        if (b !== false) {
                            tabs.closeTab(item.index, setting);
                        }
                        //阻止事件冒泡
                        event.stopPropagation();
                    });
                }
                tabs.focusTab(item.index);
                tabs.resizeTab(tab_item);
                if (callback != null) {
                    callback();
                }
            },
            /**
             * 关闭tab时的时间，返回boolean类型
             */
            onCloseTab: function (item_dom) {
                var b = true;
                if (options.onCloseTab != null) {
                    b = options.onCloseTab(item_dom);
                }
                return b;
            },
            closeTab: function (index, type) {
                var that = this;
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                if (type != null && type == "all") {
                    var leaveObj = null;
                    tabs.tabObj.find(".awsui-tabs-items").each(function () {
                        if ($(this).find(".awsui-tabs-icon.close").length > 0) {
                            var ind = $(this).attr("index");
                            $(".awsui-layout-iframe[index=\"" + ind + "\"]").remove();
                            $(this).remove();
                            if ($.inArray(ind, that.memory) >= 0) {
                                //如果存在，删除
                                that.memory.splice($.inArray(ind, that.memory), 1);
                            }
                        }
                    });
                    tabs.resizeTab("remove");
                    var size = this.memory.length;
                    if (size > 0) {
                        var tabindex;
                        if (size < 2) {
                            tabindex = this.memory[0];
                        } else {
                            tabindex = this.memory[size - 1];
                        }
                        var tab = this.getTabItem(tabindex);
                        tabs.focusTab(tab, setting);
                    }
                } else if (type != null && type == "others") {
                    tabs.tabObj.find(".awsui-tabs-items").each(function () {
                        var i = $(this).attr("index");
                        if (index != i && $(this).find(".awsui-tabs-icon.close").length > 0) {
                            $(".awsui-layout-iframe[index=\"" + i + "\"]").remove();
                            $(this).remove();
                        }
                    });
                    tabs.focusTab(index);
                    tabs.resizeTab("remove");
                } else {
                    //点击关闭后删除相关的页面和tab
                    if ($.inArray(index, this.memory) >= 0) {
                        //如果存在，删除
                        this.memory.splice($.inArray(index, this.memory), 1);
                    }
                    var size = this.memory.length;
                    if (obj.hasClass("current")) {
                        var tabindex;
                        if (size < 2) {
                            tabindex = this.memory[0];
                        } else {
                            tabindex = this.memory[size - 1];
                        }
                        var tab = this.getTabItem(tabindex);
                        tabs.focusTab(tab);
                    }
                    $(".awsui-layout-iframe[index=\"" + index + "\"]").remove();
                    obj.remove();
                    if (options.contentPanel.children().length != 0) {
                        options.contentPanel.find(".awsui-tab-content-item[index=\"" + index + "\"]").remove();
                        $(tabs.tabObj[0]).find(".awsui-tabs-items").eq(parseInt(index-2)).addClass('current');
                        $(tabs.tabObj[0]).find(".awsui-tabs-items[index="+(parseInt(index)-1)+"]").children().children().addClass("awsui-tab-curent-text");
                        options.contentPanel.find(".awsui-tab-content-item").eq(parseInt(index-2)).addClass('awsui-tab-this');
                    }
                    tabs.resizeTab("remove");
                    return;
                }
            },
            focusTab: function (obj) {
                tabs.tabContentPanel.scrollTop(0);
                $(".awsui-tabs-container.top").css("border-bottom", "1px solid #e9e9e9")
                if (typeof obj == "object") {
                    var index = obj.attr("index");
                    var item = {};
                    item.beforeTabIndex = tabs.getCurrentTab().attr("index");
                    $(".awsui-tabs-items[index=\"" + item.beforeTabIndex + "\"]").children().children().removeClass("awsui-tab-curent-text");
                    tabs.tabContainer.find("div[index]").removeClass("current");
                    obj.addClass("current");
                    obj.children().children().addClass("awsui-tab-curent-text");
                    if (options.contentPanel.children().length > 0) {
                        $(".awsui-tab-content-item[index=\"" + index + "\"]").siblings().removeClass("awsui-tab-this");
                        $(".awsui-tab-content-item[index=\"" + index + "\"]").addClass("awsui-tab-this");

                        /*$(".awsui-tab-content-item[index=" + index + "]").unbind('mousewheel');
                        $(".awsui-tab-content-item[index=" + index + "]").bind("mousewheel",function(event){
                            var that = $(this);
                            event.stopPropagation();
                            var scrollTop = tabs.tabContentPanel.scrollTop();
                            console.log(scrollTop);
                            tabs.scrollObj["item"+index] = scrollTop;
                        });*/

                        $.each(tabs.scrollObj, function (i, el) {
                            var num = i.split("item")[1];
                            if ( num == index) {
                                tabs.tabContentPanel.scrollTop(el);
                                tabs.tabContentPanel.attr("data-scrollTop",el);
                            }
                        });
                    }
                    $(".awsui-layout-iframe[index=\"" + index + "\"]").show().siblings(".awsui-layout-iframe").hide();
                    // $(".awsui-layout-iframe[index="+index+"]").attr("visibility", "visible").siblings(".awsui-layout-iframe").attr("visibility", "hidden");
                    //将tab记忆,如果先存在，删除
                    if ($.inArray(index, this.memory) >= 0) {
                        this.memory.splice($.inArray(index, this.memory), 1);
                    }
                    if (index != null) {
                        this.memory.push(index);
                    }
                    tabs.resizeTab(obj);
                    if (options.afterClick != null) {
                        b = options.afterClick(obj);
                    }
                    if (options.focusShowAfter != null && obj.beforeTabIndex != index) {
                        var name = obj.text();
                        item.title = name;
                        item.index = index;
                        options.focusShowAfter(item);
                    }
                    tabs.tabObj.trigger("scrollCustom",{focusTab:obj});
                } else {
                    var item = tabs.getTabItem(obj)
                    item.siblings().each(function () {
                        $(this).children().children().removeClass("awsui-tab-curent-text")
                    })
                    item.children().children().addClass("awsui-tab-curent-text")
                    tabs.focusTab(item);
                }
            },
            getTabFirst: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index]:first");
                return obj;
            },
            getTabLast: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index]:last");
                return obj;
            },
            getCurrentTab: function () {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index].current");
                return obj;
            },
            getTabItem: function (index) {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                return obj;
            },
            changeIndex: function (sourceIndex, targetIndex, setting) {
                var tab = this.getTabItem(sourceIndex);
                if (tab != null) {
                    tab.attr("index", targetIndex);
                }
                if ($(".awsui-layout-iframe[index=" + sourceIndex + "]").length) {
                    $(".awsui-layout-iframe[index=" + sourceIndex + "]").attr("index", targetIndex);
                }
                var item = {index: targetIndex, title: tab.html()};
                this.bindClick(item, setting);
            },
            removeAllTabs: function () {
                tabs.tabObj.find(".awsui-tabs-items[index]").remove();
                this.memory = [];
            },
            setTitle: function (index, title) {
                var item = tabs.getTabItem(index);
                var close;
                item.find('.awsui-tabs-icon.close').length == 0 ? close = false : close = true;
                if (close) {
                    item.html(title + "<span class='awsui-tabs-icon close'></span>");
                    var closespan = item.find('.awsui-tabs-icon.close').eq(0);
                    closespan.off("click.tabclose").on("click.tabclose", function (event) {
                        var b = tabs.onCloseTab(closespan.parent());
                        if (b !== false) {
                            tabs.closeTab(index);
                        }
                        //阻止事件冒泡
                        event.stopPropagation();
                    });
                } else {
                    item.html(title);
                }
            },
            getTabItemPrev: function (index) {
                var obj = tabs.tabObj.find(".awsui-tabs-items[index=\"" + index + "\"]");
                return obj.prev();
            },
            existsTab: function (i) {
                var exists = false;
                tabs.tabContainer.find(".awsui-tabs-items[index]").each(function () {
                    var index = $(this).attr("index");
                    if (index == i) {
                        exists = true;
                        current_item = $(this);
                    }
                });
                return exists;
            },
            //是否超过最大宽度
            isOverWidth: function () {
                var width = tabs.tabObj.outerWidth();
                var totalWidth = 0;
                tabs.tabObj.find(".awsui-tabs-items").each(function () {
                    totalWidth += $(this).outerWidth();
                });
                return (width > 0 && (totalWidth >= width - 25));
            },
            /**
             * 重新调整tab样式
             */
            resizeTab: function (type) {
                /**
                 * 如果超过最大宽度
                 */
                if (tabs.isOverWidth()) {
                    if (!$(".awsui-tabs-items-prev").length) {
                        createArrow();
                    }
                    //超过最大宽度后增加动画
                    tabs.bindMove(type);
                } else {
                    if (type == "remove") {
                        tabs.tabContainer.animate({
                            left: "0px"
                        }, 50);
                    }
                    removeArrow();
                }

                function createArrow() {
                    tabs.tabObj.append("<span class='awsui-tabs-items-prev'></span>" +
                           "<span class='awsui-tabs-items-next'></span>");
                    tabs.tabObj.find(".awsui-tabs-items-prev, .awsui-tabs-items-next").css({
                        height: options.height - 1
                    });
                }

                function removeArrow() {
                    if (tabs.tabObj.find(".awsui-tabs-items-next").length) {
                        tabs.tabObj.find(".awsui-tabs-items-next").remove();
                        tabs.tabObj.find(".awsui-tabs-items-prev").remove();
                    }
                }
            },
            bindMove: function (event_type) {
                //删除时
                if (event_type != null && event_type == "remove") {
                    //如果首页在左侧箭头右边的话，不执行移动
                    var left = $(".awsui-tabs-items-prev").offset().left;
                    var first = tabs.tabContainer.find(".awsui-tabs-items:first");
                    var current_left = first.offset().left;
                    if (current_left >= left) {
                        return;
                    }
                    tabs.tabContainer.animate({
                        left: "=+" + first.outerWidth()
                    }, 200, function () {
                    });
                } else if (typeof event_type == "object") {
                    if (event_type == null) {
                        return;
                    }
                    //点击显示不全的tab，使tab全部显示出来
                    var current_item_left = event_type.offset().left;
                    var prev_left = $(".awsui-tabs-items-prev").offset().left;
                    var next_left = $(".awsui-tabs-items-next").offset().left;
                    //在右侧显示不全
                    if (current_item_left <= next_left && (current_item_left + event_type.outerWidth()) > next_left) {
                        showHide("right");
                        $(".awsui-tabs-items-prev").removeClass("hide");
                    } else if (current_item_left <= prev_left && (current_item_left + event_type.outerWidth()) > prev_left) {
                        //在左侧显示不全
                        tabs.tabContainer.stop().animate({
                            left: "+=" + (prev_left - current_item_left + 25)
                        }, 200);
                        $(".awsui-tabs-items-next").removeClass("hide");
                    } else if ((current_item_left + event_type.outerWidth()) < prev_left) {
                        //在左边处于隐藏状态
                        showHide("left");
                    } else if (current_item_left > next_left) {
                        //在右侧处于隐藏状态
                        showHide("right");
                    }
                    if (tabs.tabContainer.find(".awsui-tabs-items:first").attr("index") == event_type.attr("index")) {
                        //$(".awsui-tabs-items-prev").addClass("hide");
                        $(".awsui-tabs-items-next").removeClass("hide");
                    }
                    if (tabs.tabContainer.find(".awsui-tabs-items:last").attr("index") == event_type.attr("index")) {
                        //$(".awsui-tabs-items-next").addClass("hide");
                        $(".awsui-tabs-items-prev").removeClass("hide");
                    }
                }
                //点击像左移动
                $(".awsui-tabs-items-prev").off().on("mousedown", function () {
                    move("scroll_right");
                });
                //点击向右移动
                $(".awsui-tabs-items-next").off().on("mousedown", function () {
                    move("scroll_left");
                });

                //滚动的核心函数
                function move(type) {
                    if (type == "scroll_left") {
                        var left = $(".awsui-tabs-items-next").offset().left;
                        var current_left = tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                        var lastWidth = tabs.tabContainer.find(".awsui-tabs-items:last").outerWidth();
                        if (current_left + lastWidth <= left - 7) {
                            return;
                        }
                        tabs.tabContainer.stop().animate({
                            left: "-=" + lastWidth
                        }, 200, function () {
                            current_left = tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                            if (current_left + lastWidth <= left - 7) {
                                $(".awsui-tabs-items-next").addClass("hide");
                                tabs.tabContainer.css({"right": 0 + "px"});
                            }
                            if ($(".awsui-tabs-items-prev").hasClass("hide")) {
                                $(".awsui-tabs-items-prev").removeClass("hide")
                            }
                        });
                    } else if (type == "scroll_right") {
                        var left = $(".awsui-tabs-items-prev").offset().left;
                        var current_left = tabs.tabContainer.find(".awsui-tabs-items:first").offset().left;
                        var firstWidth = tabs.tabContainer.find(".awsui-tabs-items:first").outerWidth();
                        if (current_left >= left + 7) {
                            return;
                        }
                        tabs.tabContainer.stop().animate({
                            left: "+=" + firstWidth
                        }, 200, function () {
                            current_left = tabs.tabContainer.find(".awsui-tabs-items:first").offset().left;
                            if (current_left >= left + 5) {
                                $(".awsui-tabs-items-prev").addClass("hide");
                                tabs.tabContainer.stop().animate({"left": 0 + "px"}, 50);
                            }
                            if ($(".awsui-tabs-items-next").hasClass("hide")) {
                                $(".awsui-tabs-items-next").removeClass("hide");
                            }
                        });
                    }
                }

                function showHide(type) {
                    if (type == "left") {
                        tabs.tabContainer.stop().animate({"left": "0px"}, 50);
                    } else if (type == "right") {
                        var left = $(".awsui-tabs-items-next").offset().left;
                        var current_left = tabs.tabContainer.data("left") || tabs.tabContainer.find(".awsui-tabs-items:last").offset().left;
                        var lastWidth = tabs.tabContainer.find(".awsui-tabs-items:last").outerWidth();
                        if (current_left + lastWidth <= left - 7) {
                            return;
                        }
                        var temp = (current_item_left + event_type.outerWidth() - next_left + 10);
                        current_left -= temp;
                        tabs.tabContainer.data("left", current_left);
                        tabs.tabContainer.stop().animate({
                            left: "-=" + temp
                        }, 200);
                    }
                }
            },
            bindClick: function (item, setting) {
                tabs.tabObj.find(".awsui-tabs-items[index=\"" + item.index + "\"]").off("click.tab").on("click.tab", function () {
                    var b = true;
                    if (options.onClick != null) {
                        b = options.onClick(item);
                    }
                    if (b) {
                        tabs.focusTab(item.index, setting);
                    }
                });
            },
            initContextMenu: function (index, setting) {
                $(".awsui-tabs-items[index=\"" + index + "\"]").off("mousedown").on("mousedown", function (e) {
                    var curr_obj = $(this);
                    //右键菜单
                    if (e.which == 3) {
                        //初始化右键菜单
                        var left = e.pageX;
                        var top = e.pageY;
                        var menu = [];
                        if (setting.close) {
                            menu.push({
                                text: 关闭, tit: "closeMe", method: function () {
                                    tabs.closeTab(index);
                                    $("#" + setting.contextMenuTarget).menu("close");
                                }
                            });
                        }
                        menu.push({
                            text: 关闭其他, tit: "closeOthers", method: function () {
                                tabs.closeTab(index, "others");
                                $("#" + setting.contextMenuTarget).menu("close");
                            }
                        });
                        if (setting.close) {
                            menu.push({
                                text: 关闭全部, tit: "closeAll", method: function () {
                                    tabs.closeTab(index, "all");
                                    $("#" + setting.contextMenuTarget).menu("close");
                                }
                            });
                        }
                        var option = {
                            left: left,
                            top: top,
                            items: menu
                        };
                        $("#" + setting.contextMenuTarget).menu(option);
                        //阻止事件冒泡
                        e.stopPropagation();
                        //阻止出现默认右键菜单
                        $(document).off("contextmenu").on("contextmenu", function () {
                            return false;
                        });
                    }
                });
            },
            resizePage: function (dom) {
                var height = dom.parent().height();
                var height_ = 0;
                dom.siblings(":visible").each(function () {
                    if ($(this).attr('id') === 'window-mask') {
                        return true;
                    }
                    //add by wangshibao 2016-12-03 不计算dialog的高度
                    if ($(this).hasClass('awsui-dialog')) {
                        return true;
                    }
                    height_ += $(this).height();
                });
                dom.css({
                    height: height - height_ - 1
                });
            }
        };
        if (options.tabPosition == null) {
            options.tabPosition = "top";
        }
        options = $.extend(tabs.config, options);
        tabs.tabObj = obj;
        tabs.tabObj.addClass("awsui-tabs").css({
            height: options.height
        });
        if (options.nogradient) {
            tabs.tabObj.addClass("nogradient");
        }
        if (options.noborder) {
            tabs.tabObj.addClass("awsui-no-border");
        }
        tabs.tabContainer = $("<div class='awsui-tabs-container " + options.tabPosition + "'></div>").appendTo(tabs.tabObj);
        tabs.tabContainer.css({
            height: options.height - 1
        });
        if (options.contentPanel != null) {
            tabs.tabContentPanel = options.contentPanel;
            tabs.resizePage(options.contentPanel);
        }
        //绑定resize
        $(window).resize(function () {
            tabs.resizePage(options.contentPanel);
        });

        $(".awsui-tab-curent-text").css("color", "options")
        return tabs;
    }
};