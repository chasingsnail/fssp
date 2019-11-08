0.文件名用英文防止意外乱码
1.此jquery-ui版本是1.12.1
2.针对grid版本2.3.0做了最精简整理(不是完整版).
3.升级办法:去官网,选择custom download,进入页面后取消选中Toggle All,依次勾选
   Widget , Position , Form Reset Mixin , Keycode , labels , uniqueId , Button , Checkboxradio , Controlgroup , Tooltip
   然后再download.
4.其中tooltip组件与平台冲突,但grid的validation又依赖此组件,所以批量替换此文件夹下 jquery-ui.js 和 jquery-ui.min.js 两个文件  把 ui.tooltip 全部替换为 ui.tooltipgrid (一个文件4处)
ps : 对应的jquery-ui.css位置为 : webserver\webapps\portal\commons\css\jQueryUI\jquery-ui.css