var setting = {
    view: {
        selectedMulti: false,
    },
    data: {
        simpleData: {
            enable: true
        }
    },
    edit : {
        enable : true,
        editNameSelectAll : true,
        showRemoveBtn:true,
        removeTitle:'删除',
    },
};
var dropOptions = {
    hoverClass:"dropHover",//释放时指定鼠标停留在该元素上使用的css class
    activeClass:"dragActive",//可拖动到的元素使用的css class
};  
var paintStyle = {
    strokeStyle: "#404d5b",
    fillStyle: "#f9f9f9",
    radius:4
}                  
var sourceEndPointJSON = {     
    paintStyle:paintStyle,//设置连接点的颜色
    hoverPaintStyle: {fillStyle:"#61B7CF",radius:5},
    // endpointHoverStyle:{fillStyle:'#61B7CF',radius:5},
    isSource:true,  //是否可以拖动（作为连线起点）
    scope:"green",//连接点的标识符，只有标识符相同的连接点才能连接
    connectorStyle:{ strokeStyle:"#999", lineWidth:2},//连线颜色、粗细
    maxConnections:1,//设置连接点最多可以连接几条线
    isTarget:false,  //是否可以放置（作为连线终点）
    dropOptions : {}//设置放置相关的css
};
var targetEndPointJSON = {
    paintStyle:paintStyle,   //设置连接点的颜色、透明度
    hoverPaintStyle: {fillStyle:"#61B7CF",radius:5},
    // endpointHoverStyle:{fillStyle:'#61B7CF',radius:5},
    isSource:false,
    scope:'green', //同上
    connectorStyle:{ strokeStyle:"#999", lineWidth:2},//同上
    isTarget:true,  //同上
    maxConnections:1,//同上
    dropOptions : dropOptions,//同上
    maxConnections: 1,
    onMaxConnections: function (info, e) {
        $.each(mappingJSON, function(i,item){
           if (item.targetId == info.endpoint.id) {
                delete mappingJSON[info.connection.sourceId];
                alert("Maximum connections (" + info.maxConnections + ") reached");
                autoMapping();
           }
        });
    }
};
var mappingJSON = null;
var sourceJSON = null;
var targetJSON = null;
$(document).ready(function(){
    jsPlumbT();
});
$(window).resize(function(){
    $(".wrapper").css('height',$(document).height()+'px');
    jsPlumb.repaintEverything();
});

function mappingInit(sourceJSON,targetJSON,mappingJSON) {
    mappingJSON = mappingJSON;
    sourceJSON = sourceJSON;
    targetJSON = targetJSON;
    $(".wrapper").css('height',$(document).height()+'px');
    $.fn.zTree.init($("#treeLeft"), setting, sourceJSON);
    $.fn.zTree.init($("#treeRight"), setting, targetJSON);
    if ($(".right").height() <= $(".left").height()) {
        $(".right").css('height',$(".left").height());
    }
    createSourceFieldBtn();
    initData();
    uiEndPoint();
    autoMapping();
    addActions();
    var $defer = $.Deferred();
    $defer.resolve();
    return $defer;
}
function jsPlumbT() {
    return jsPlumb.ready(function() {
        jsPlumb.importDefaults({
            Anchors: [ "Right","Left"],//连接点的默认位置、
            Endpoint: [ "Dot", { radius: 4 } ],//连接点的默认形状
            Connector:['Bezier', {curviness:150}],
            //拖动时的演示
            DragOptions:{cursor:'pointer'},
            //hover时线样式
            HoverPaintStyle:{strokeStyle:'#61B7CF',lineWidth:3},
            //hover时点的样式
            ConnectionOverlays: [//连接覆盖图
                ["Arrow", {
                    location: 1,
                    id: "arrow",
                    width:11,
                    length: 11
                }],
                [ "Label", { label: "X", id:"",cssClass: "aLabel" }]
            ]
        });
        jsPlumb.bind('click', function (connInfo, originalEvent) {
            if (connInfo.label) {
                $.each(mappingJSON, function(i,item){
                   if (item.sourceId == connInfo.component.sourceId) {
                        delete mappingJSON[item.sourceId]
                   }
                });
                autoMapping();
            }
        });
        jsPlumb.bind("connection", function (connInfo, originalEvent) {  
            var sourceEndPointJSON1 = $.extend(true,"",sourceEndPointJSON);
            var targetEndPointJSON1 = $.extend(true,"",targetEndPointJSON);
            if ($("#"+connInfo.sourceId+"_a").hasClass('selectBg')) {
                $("#"+connInfo.targetId+"_a").addClass("selectBg");
                targetEndPointJSON1.paintStyle.fillStyle = "#61B7CF";
                targetEndPointJSON1.paintStyle.radius = 5;
                jsPlumb.addEndpoint(connInfo.targetId, { anchors:"Left"}, targetEndPointJSON1);
                $.each(mappingJSON, function(i,item){
                    if (item.targetId === connInfo.targetId) {
                        alert("Maximum connections (" + targetEndPointJSON1.maxConnections + ") reached");
                        jsPlumb.detachAllConnections(connInfo.sourceId);
                        $("div#"+connInfo.sourceId).remove();
                        delete mappingJSON[connInfo.sourceId];
                        uiEndPoint();
                        autoMapping();
                    } else {
                        mappingJSON[connInfo.sourceId] = {"sourceId":connInfo.sourceId,"targetId":connInfo.targetId,'isMapping':true};
                    }
                });
            }
        });
    });

}
function addActions() {
    // 单点击了连接线, 
    
    $(".main").scroll(function(){
        $(".right").css('height',$(".left").height());
        jsPlumb.repaintEverything();
    });
    $("#treeLeft li.level0 a.level0").off('click');
    $("#treeLeft li.level0 a.level0").on('click', function(event) {
        var _this = $(this);
        event.stopPropagation();
        treeShowHide(_this);
    });
    $('#treeLeft li.level a.level1').on('mousedown', function (e) {
        var id = $(this).attr("id").split("_a")[0];
        var oMakeSourceData = $.extend(true,{},sourceEndPointJSON); 
        oMakeSourceData.paintStyle.strokeStyle =  "transparent";
        // jsPlumb.makeSource(id, {
        //     filter: ".level1",
        //     endpoint: [ "Dot", { radius: 0} ],//连接点的默认形状
        //     endpointHoverStyle:{fillStyle:"transparent",radius:0},
        //     anchor: "Continuous",
        //     ReattachConnections : false,//是否重新连接使用鼠标分离的线
        //     Scope : "jsPlumb_DefaultScope"//范围，标识
        // },oMakeSourceData);
    });
    $("#treeLeft li a.level1").off('click');
    $("#treeLeft li a.level1").on('click',function(event) {
        event.stopPropagation();
        handleLilick(this);
    });
    $("#treeRight li a").on('dblclick',function(e){
        e.stopPropagation();
        return false;
    });
    $("#autoMapping").bind('click',function(){
        autoMapping();
    });
    $("#clearMapping").bind('click',function(){
        clearMapping();
    });
    $("#createField").bind('click',function(){
        showPopupWindow('MyDiv','fade');
    });
    $("#saveBtn").off('click');
    $("#saveBtn").on('click',function(){
        var name = $("#fieldName").val();
        createSourceField(name);
    });
}
function handleLilick(current) {
    var leftLis = $("#treeLeft li");
    var rightLis = $("#treeRight li");
    uiEndPoint();
    autoMapping();
    $.each(leftLis, function(i,el){
        if ($(el).find("ul").length == 0) {
            $(el).find("a").removeClass("selectBg");
            var sourceEndPointJSON1 = $.extend(true, "", sourceEndPointJSON);
            var id = $(current).attr("id").split("_a")[0];
            if (id === el.id) {
                $(current).addClass("selectBg");
                sourceEndPointJSON1.paintStyle.fillStyle = "#61B7CF";
                sourceEndPointJSON1.connectorStyle.strokeStyle = "#61B7CF";
                sourceEndPointJSON1.paintStyle.radius = 5;
                jsPlumb.removeAllEndpoints(id);
                jsPlumb.addEndpoint(id, { anchors:"Right"}, sourceEndPointJSON1);
            }
            $.each(mappingJSON, function(i,item){
                if (id == item.sourceId) {
                    setConnect(id,item.targetId,"#61B7CF");
                }
            });  
        }
    });
    jsPlumb.repaintEverything();
}
/**
 * other
 * 
 */
var sourceIdJSON = {};
var targetIdJSON = {};
function initData(){
    var leftLis = $("#treeLeft").find("li");
    var rightLis = $("#treeRight").find("li");
    $.each(leftLis, function(i,el){
        if ($(el).find("ul").css("display") == 'block') {
            $.each($(el).find("ul").find("li"), function(i,el){
                sourceIdJSON[el.id] = {sourceId:el.id};
            });
        }
    });
    $.each(rightLis, function(i,el){
        if ($(el).find("ul").css("display") == 'block') {
            $.each($(el).find("ul").find("li"), function(i,el){
                targetIdJSON[el.id] = {targetId:el.id};
            });
        }
    });
    if (mappingJSON == null) {
        mappingJSON = {};
        $.each(leftLis, function(i,el_left){
            $.each(rightLis, function(j,el_right){
                if ($(el_left).text() == $(el_right).text()) {
                    mappingJSON[$(el_left).attr("id")] = {"sourceId":$(el_left).attr("id"),"targetId":$(el_right).attr("id"),'isMapping':true};
                }
            });
        });
    }
}
function setConnect(left_id,right_id,colorStyle) {
    var color = colorStyle || "#999";
    jsPlumb.connect({
        source: left_id,
        target: right_id,
        //连接线的样式
        paintStyle:{ 
            //连接线的宽度，int值
            lineWidth:2,
            //连接器的颜色
            strokeStyle:color,
        },
        endpointStyle: { fillStyle: "transparent"},
        anchor: ['Left', 'Right']
    });
    
    // jsPlumb.draggable($(el_right).attr("id"))
    //可拖动
    //jsPlumb.draggable($('._jsPlumb_endpoint_anchor_'));
}
function treeShowHide(_this) {
    if (_this.next("ul")) {
        var oUl = _this.next("ul");
        var list = _this.next("ul").find("li");
        if (oUl.css("display") == 'block') {
            _this.next("ul").css("display","none");  
            $.each(sourceIdJSON,function(i,item){
                $.each(list, function(i,el){
                    if ($(el).attr("id") == item.sourceId) {
                        delete sourceIdJSON[item.sourceId];
                    }
                });
            });
            $.each(mappingJSON,function(i,item){
                $.each(list, function(i,el){
                    if ($(el).attr("id") == item.sourceId) {
                        item.isMapping = false;
                    }
                });
            });
        } else {
            _this.next("ul").css("display","block");
            $.each(list, function(i,el){
                sourceIdJSON[$(el).attr("id")] = {sourceId:$(el).attr("id")};
            });
            $.each(mappingJSON,function(i,item){
                $.each(list, function(i,el){
                    if ($(el).attr("id") == item.sourceId) {
                        item.isMapping = true;
                    }
                });
            });
        }
    } 
    uiEndPoint();
    autoMapping();
    jsPlumb.repaintEverything();
}
function uiEndPoint() {
    $(".ztree li a").removeClass("selectBg");
    jsPlumb.deleteEveryEndpoint();
    jsPlumb.detachEveryConnection();
    $.each(sourceIdJSON, function(i,item){
        jsPlumb.addEndpoint(item.sourceId, { anchor:"RightMiddle"}, sourceEndPointJSON); 
    });
    $.each(targetIdJSON, function(i,item){
        jsPlumb.addEndpoint(item.targetId, { anchor:"LeftMiddle"}, targetEndPointJSON); 
    });
}
function autoMapping() {
    jsPlumb.detachEveryConnection();
    $.each(getMappings(), function(i,item){
        if (item.isMapping) {
            $("#"+item.sourceId+"_a").removeClass("selectBg");
            $("#"+item.targetId+"_a").removeClass("selectBg");
            jsPlumb.removeAllEndpoints(item.sourceId);
            jsPlumb.removeAllEndpoints(item.targetId);
            jsPlumb.addEndpoint(item.sourceId, { anchor:"RightMiddle" }, sourceEndPointJSON);
            jsPlumb.addEndpoint(item.targetId, { anchor:"LeftMiddle" }, targetEndPointJSON);
            setConnect(item.sourceId,item.targetId);
        }
    });
    jsPlumb.repaintEverything();
}
function clearMapping() {
    uiEndPoint();
    jsPlumb.detachEveryConnection();
}
function getMappings() { //获取mappings数据
    var resultJson = {};
    if (mappingJSON != null) {
        $.each(mappingJSON, function(i,item){
            resultJson[item.sourceId] = item;
        });
    }
    return resultJson;
}
function getSourceValue(id) {

}
function getTargetValue(id) {

}
var num = 0;
function createSourceField(name){
    var aSourseData = [];
    num++;
    if (num < 10) {
        num = '0'+num;
    }
    for (var i=0; i<sourceJSON.length; i++) {
        if (sourceJSON[i].open) {
            aSourseData.push(sourceJSON[i]);
        }
    }
    var id = aSourseData.length;
    var currentJson = { id:id+num, pId:id, name:name,isMapping:false,isModify:true,delId:"treeLeft_"+parseInt(sourceJSON.length+1)};
    sourceJSON.push(currentJson);
    closePopupWindow('MyDiv','fade');
    $.each(mappingJSON,function(i,item){
        item.isMapping = true;
    });
    mappingInit(sourceJSON,targetJSON,mappingJSON)
}
function createSourceFieldBtn() {
    var leftLis = $("#treeLeft").find("li");
    $.each(leftLis, function(i,el){
        if ($(el).find("a.level0").attr("title") == "自定义") {
            var customSourceLi = $(el).find("ul").find("li");
            $.each(customSourceLi, function(i,el){
                var oSpanHtml = $('<span class="delNodeBtn"></span>');
                $(el).find("a").append(oSpanHtml);
                $(el).off('mouseover');
                $(el).on('mouseover',function(e){
                    var _this = this;
                    $(_this).find(".delNodeBtn").css("display","inline-block");
                    $(_this).find(".delNodeBtn").off('click');
                    $(_this).find(".delNodeBtn").on('click',function() {
                        var id = $(this).parent("a").attr("id");
                        removeSourceTreeNode(id.split("_a")[0]);
                    });
                    e.stopPropagation();
                });
                $(el).on('mouseout',function(){
                   $(".delNodeBtn").css("display","none");
                });
            });
        }
    });
}
function removeSourceTreeNode(nodeId) {
    var id = parseInt(nodeId.split("treeLeft_")[1])-1;
    $.each(sourceJSON,function(i,item){
        if (id == i) {
            sourceJSON.splice(i,1);
        }
    });
    sourceIdJSON = {};
    mappingInit(sourceJSON,targetJSON,mappingJSON);
}; 
function showPopupWindow(show_div,bg_div){
    $("#"+show_div).css('display','block');
    $("#fieldName").val("");
    $("#"+bg_div).css({'width':$(document).width()+'px','height':$(document).height()+'px','display':'block'});
};
//关闭弹出层
function closePopupWindow(show_div,bg_div)
{
    $("#"+show_div).css('display','none');
    $("#"+bg_div).css('display','none');
};
function addBtnProperty(nodes){  
    $.each(nodes,function(i,node){  
        if(node.pid == 5){  
            node.noRemoveBtn=true;  
            node.noEditBtn=true;  
        }  
    })  
    return nodes;  
}




