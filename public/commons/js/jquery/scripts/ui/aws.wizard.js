/*!
 * =====================================================
 * AWSUI向导对话框组件
 * v1.0 (http://www.actionsoft.com.cn)
 * =====================================================
 */

(function($) {
    $.fn.wizard = function(options) {
        var defaults = {
            animate : false,
            animateTime : 300,
            currentStep : 0,
            nextLabel : 下一步,
            nextCls : "button",
            prevLabel : 上一步,
            prevCls : "button",
            finishLabel : 完成,
            finishCls : "button",
            items : [],
            onNext : null,
            onPrev : null,
            onFinish : null,
            btnHandle:null,
            fontSize:10,
            color:"#3983de"
        };
        var temp = $(this);
        var tempContent = null;
        var opt = $.extend(defaults, options);
        var wzd = {
            headDom : null,
            barDom : null,
            createTitle : function() {
                var head = $("<div class='awsui-wizard-head' style='width:"+opt.width+"px;'></div>");
                var bar = $("<div class='bar'></div>").appendTo(head);
                if (opt.items.length > 0) {
                    for (var i = 0; i < opt.items.length; i++) {
                        var item = opt.items[i];
                        var dotCls = "", itemCls = "", color = "",right=0;
                        if (i == opt.currentStep) {
                            color =opt.color;
                        }
                        var div = $("<div itemIndex='" + i + "' class='bar-items' style='color:"+color+"'>" +
                               "<div class='awsui-public-box-icon' style='height:18px; line-height:18px;'><div class='awsui-iconfont' style='font-size:"+opt.fontSize+"px; color:"+color+"';>&#xe6d5;</div></div>" +
                               "<div alt='title' class='bar-items-title'>" + item.title +"</div></div>");
                        div.appendTo(head);
                        temp.prepend(head);

                        if (i == opt.items.length-1) {
                            right = 0;
                        } else {
                            right = opt.width / (opt.items.length-1) - div.width() - div.width()/(opt.items.length-1);
                        }
                        div.css({
                            marginRight:right
                        });
                    }
                }
                bar.css({
                    width : opt.width - temp.find(".bar-items").width()-opt.fontSize,
                    left : temp.find(".bar-items").width()/2+opt.fontSize/2
                });
                head.css("height",temp.find(".bar-items").height() + 4);
                this.barDom = $("<div class='awsui-wizard-bar'></div>");
                head.after(this.barDom);
                this.headDom = head;
                return head;
            },
            destroy : function() {
                temp.find(".awsui-wizard-head").remove();
                temp.find(".awsui-wizard-bar").remove();
                temp.parent(".dialog-wrap").siblings().find(".awsui-wizard-bottom").remove();
                temp.find(".awsui-wizard-content-item:first").show().siblings().hide();
            },
            createBottom : function() {
                $(".awsui-wizard-bottom").remove();
                var bottom = $("<div class='awsui-wizard-bottom'></div>");
                tempContent.after(bottom);
                //默认增加按钮
                this.createButton(opt.currentStep);
                return bottom;
            },
            createButton : function(step) {
                var that = this;
                var bottom = tempContent.next(".awsui-wizard-bottom");
                var next = $("<span alt='next' class='" + (opt.nextCls == null ? "" : opt.nextCls ) + "'>" + opt.nextLabel + "</span>");
                var prev = $("<span alt='next' class='" + (opt.prevCls == null ? "" : opt.prevCls ) + "'>" + opt.prevLabel + "</span>");
                var finish = $("<span alt='finish' class='" + opt.finishCls + "'>" + opt.finishLabel + "</span>");
                bottom.empty();
                if (step == 0) {
                    bottom.append(next);
                    next.off().on("click", function() {
                        if (opt.onNext(opt)) {
                            doNext();
                        }
                    }).show();
                } else if (step == opt.items.length - 1) {
                    prev.appendTo(bottom);
                    finish.appendTo(bottom);
                    prev.off().on("click", function() {
                        if (opt.onPrev(opt)) {
                            doPrev();
                        }
                    });
                    finish.off().on("click", function() {
                        if (opt.onFinish(opt)) {
                            opt.currentStep++;
                            that.changeHeadIcon("next", opt.currentStep);
                            finish.awsui("disable").off("click");
                            next.awsui("disable").off("click");
                            prev.awsui("disable").off("click");
                        }
                    }).show();
                } else {
                    prev.appendTo(bottom);
                    next.appendTo(bottom);
                    prev.off().on("click", function() {
                        if (opt.onPrev(opt)) {
                            doPrev();
                        }
                    });
                    next.off().on("click", function() {
                        if (opt.onNext(opt)) {
                            doNext();
                        }
                    }).show();
                }
                that.showDesBar(opt.currentStep);
                function doNext() {
                    opt.currentStep++;
                    that.changeHeadIcon("next", opt.currentStep);
                    that.showDesBar(opt.currentStep);
                    that.setBarProgress(opt.currentStep);
                    that.showContent(opt.currentStep, "next");
                    that.createButton(opt.currentStep);

                }

                function doPrev() {
                    opt.currentStep--;
                    that.changeHeadIcon("prev", opt.currentStep);
                    that.showDesBar(opt.currentStep);
                    that.setBarProgress(opt.currentStep);
                    that.showContent(opt.currentStep, "prev");
                    that.createButton(opt.currentStep);
                }

            },
            changeHeadIcon : function(type, step) {
                var item = this.headDom.find("[itemIndex=" + step + "]");
                item.css("color",opt.color);
                item.find(".awsui-public-box-icon .awsui-iconfont").css("color",opt.color);
                if (type == "prev") {
                    item.next().css("color","");
                    item.next().find(".awsui-public-box-icon .awsui-iconfont").css("color","");
                }
            },
            showContent : function(step, target) {
                var content = temp.find(".awsui-wizard-content");
                content.children(".awsui-wizard-content-item").each(function(i, index) {
                    $(this).attr("alt", i);
                });
                content.children("[alt=" + step + "]").show().siblings().hide();
            },
            setBarProgress : function(step) {
                var bar = this.headDom.find(".bar");
                bar.empty();
                bar.append('<span class="awsui-wizard-bar-active"></span>');
                bar.find(".awsui-wizard-bar-active").css({
                    "width":bar.width()/(opt.items.length-1)*step,
                    "background":opt.color
                });
            },
            showDesBar : function(step) {
                var item = opt.items[step];
                this.barDom.empty();
                if (item.des != undefined && item.des!="") {
                    this.barDom.html(item.des);
                    this.barDom.css('height',30);
                } else {
                    this.barDom.css('height',"");
                }
            },
            goStep:function(step){
                var that = this;
                var barItems = this.headDom.find(".bar-items");
                if (barItems.length > 0) {
                    for (var i = 0; i < barItems.length; i++) {
                        var item = barItems.eq(i);
                        item.css("color","");
                        item.find(".awsui-public-box-icon .awsui-iconfont").css("color","");
                        if (i <= step) {
                            item.css("color",opt.color);
                            item.find(".awsui-public-box-icon .awsui-iconfont").css("color",opt.color);
                        }
                    }
                }
                that.showDesBar(step);
                that.setBarProgress(step);
                that.showContent(step);
                that.createButton(step);
            },
            btnHandle:function(status){
                if (status == "hide") {
                    temp.siblings(".awsui-wizard-bottom").remove();
                    return;
                } else if (status == "show"){
                    this.createBottom();
                }
            },
            initWizard : function() {
                wzd.destroy();
                var that = this;
                opt.width = temp.width();
                var title = that.createTitle();
                var bottom = that.createBottom();
                var content = temp.find(".awsui-wizard-content");
                var item= content.find(".awsui-wizard-content-item");
                //初始化content的样式
                if (opt.currentStep) {
                    that.goStep(opt.currentStep);
                }
            }
        };
        if ( typeof options == "string" && options == "destroy") {
            wzd.destroy();
            return;
        }

        if (opt.width) {
            temp.css('width',opt.width);
            temp.parents(".awsui-dialog").css('width', temp.outerWidth(true));
        }
        if (opt.height) {
            temp.css('height',opt.height);
        }
        if (temp.parent().hasClass("dialog-wrap")) {
            temp.css('border',0);
            temp.parent(".dialog-wrap").addClass("awsui-public-radius");
            tempContent = temp.parent(".dialog-wrap");
        } else {
            temp.addClass("awsui-public-border awsui-public-radius");
            tempContent = temp;
        }
        wzd.initWizard();
        if (!temp.parents().hasClass("awsui-dialog")) {
            temp.parent().dialog({isExist: true});
            wzd.initWizard();
        }
        $(window).off("resize.wizard").on("resize.wizard", function() {
            wzd.initWizard();
        });
        return wzd;
    }
})(jQuery);