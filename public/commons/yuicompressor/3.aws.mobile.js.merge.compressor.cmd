rem ѹ��AWSƽ̨��JavaScript�ļ�
set target=..\..\..\portal
set lib=.\yuicompressor-2.4.7.jar

rem ɾ�����ļ�
del /q ..\js\aws.mobile.all.debug.js

rem �ϲ��ļ�
for /f %%i in (3.aws.mobile.jslist.txt) do type %%i >>..\js\aws.mobile.all.debug.js

rem ѹ���ļ�
..\..\..\..\..\jdk1.8\bin\java -jar %lib% --type js --charset UTF-8 ..\js\aws.mobile.all.debug.js -o ..\js\aws.mobile.all.js

timeout 10