rem ѹ��AWSƽ̨��JavaScript�ļ�
set JAVA=..\..\..\..\..\jdk1.8\bin
set target=../../../portal
set lib=.\yuicompressor-2.4.7.jar

rem ��ʽ��
%JAVA%\java -jar %lib% --type css --charset UTF-8 %target%/apps/_bpm.portal/css/client.bpm.form.mobile.common.debug.css -o %target%/apps/_bpm.portal/css/client.bpm.form.mobile.common.css
%JAVA%\java -jar %lib% --type css --charset UTF-8 %target%/commons/js/jquery/themes/default/ui/aws.ui.all.debug.css -o %target%/commons/js/jquery/themes/default/ui/aws.ui.all.css

rem ƽ̨�����
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/ui/client.ui.debug.js -o %target%/apps/_bpm.portal/js/ui/client.ui.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.form.page.common.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.form.page.common.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.form.page.grid.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.form.page.grid.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.form.page.editgrid.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.form.page.editgrid.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.task.exec.performer.common.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.task.exec.performer.common.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.task.exec.adhoc.common.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.task.exec.adhoc.common.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/apps/_bpm.portal/js/client.bpm.form.page.multiformzone.debug.js -o %target%/apps/_bpm.portal/js/client.bpm.form.page.multiformzone.js

rem ��������
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-process.debug.js -o %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-process.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-ui.debug.js -o %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload-ui.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload.debug.js -o %target%/commons/js/jquery/scripts/ui/upfile/jquery.fileupload.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/aws.upfile.debug.js -o %target%/commons/js/jquery/scripts/ui/aws.upfile.js

rem �������
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/check/icheck.debug.js -o %target%/commons/js/jquery/scripts/ui/check/icheck.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/aws.pqgrid.debug.js -o %target%/commons/js/jquery/scripts/ui/aws.pqgrid.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/switchery/jquery.switchery.debug.js -o %target%/commons/js/jquery/scripts/ui/switchery/jquery.switchery.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/jquery.ui.core.debug.js -o %target%/commons/js/jquery/scripts/jquery.ui.core.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/jquery.ui.widget.debug.js -o %target%/commons/js/jquery/scripts/jquery.ui.widget.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/awsui.debug.js -o %target%/commons/js/awsui.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/public.debug.js -o %target%/commons/js/public.js
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/plug-in/ueditor/ueditor.all.debug.js -o %target%/commons/plug-in/ueditor/ueditor.all.js


rem ��ַ��
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/aws.address.debug.js -o %target%/commons/js/jquery/scripts/ui/aws.address.js

rem AWSUI���ļ�
%JAVA%\java -jar %lib% --type js --charset UTF-8 %target%/commons/js/jquery/scripts/ui/aws.util.debug.js -o %target%/commons/js/jquery/scripts/ui/aws.util.js
timeout 30