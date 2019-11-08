#!/bin/sh

# 压缩AWS平台的JavaScript文件

# get into run script dir (resolve to absolute path)
SCRIPT_DIR=$(cd $(dirname $0) && pwd)    # This dir is where this script live.
echo "SCRIPT_DIR:$SCRIPT_DIR"
cd $SCRIPT_DIR

export target="../../../portal"
export lib="./yuicompressor-2.4.7.jar"

# 样式表
java -jar ${lib} --type css --charset UTF-8 ${target}/apps/_bpm.portal/css/client.bpm.form.mobile.common.debug.css -o ${target}/apps/_bpm.portal/css/client.bpm.form.mobile.common.css
java -jar ${lib} --type css --charset UTF-8 ${target}/commons/js/jquery/themes/default/ui/aws.ui.all.debug.css -o ${target}/commons/js/jquery/themes/default/ui/aws.ui.all.css

# 平台表单相关
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/ui/client.ui.debug.js -o ${target}/apps/_bpm.portal/js/ui/client.ui.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.form.page.common.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.form.page.common.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.form.page.grid.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.form.page.grid.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.form.page.editgrid.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.form.page.editgrid.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.task.exec.performer.common.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.task.exec.performer.common.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.task.exec.adhoc.common.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.task.exec.adhoc.common.js
java -jar ${lib} --type js --charset UTF-8 ${target}/apps/_bpm.portal/js/client.bpm.form.page.multiformzone.debug.js -o ${target}/apps/_bpm.portal/js/client.bpm.form.page.multiformzone.js

# 附件内容
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-process.debug.js -o ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-process.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-ui.debug.js -o ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-ui.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload.debug.js -o ${target}/commons/js/jquery/scripts/ui/upfile/jquery.fileupload.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/aws.upfile.debug.js -o ${target}/commons/js/jquery/scripts/ui/aws.upfile.js

# 公共组件
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/check/icheck.debug.js -o ${target}/commons/js/jquery/scripts/ui/check/icheck.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/switchery/jquery.switchery.debug.js -o ${target}/commons/js/jquery/scripts/ui/switchery/jquery.switchery.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/jquery.ui.core.debug.js -o ${target}/commons/js/jquery/scripts/jquery.ui.core.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/jquery.ui.widget.debug.js -o ${target}/commons/js/jquery/scripts/jquery.ui.widget.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/awsui.debug.js -o ${target}/commons/js/awsui.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/public.debug.js -o ${target}/commons/js/public.js
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/plug-in/ueditor/ueditor.all.debug.js -o ${target}/commons/plug-in/ueditor/ueditor.all.js

# 地址簿
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/aws.address.debug.js -o ${target}/commons/js/jquery/scripts/ui/aws.address.js

# AWSUI库文件
java -jar ${lib} --type js --charset UTF-8 ${target}/commons/js/jquery/scripts/ui/aws.util.debug.js -o ${target}/commons/js/jquery/scripts/ui/aws.util.js
