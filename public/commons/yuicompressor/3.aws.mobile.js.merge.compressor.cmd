rem 压缩AWS平台的JavaScript文件
set target=..\..\..\portal
set lib=.\yuicompressor-2.4.7.jar

rem 删除旧文件
del /q ..\js\aws.mobile.all.debug.js

rem 合并文件
for /f %%i in (3.aws.mobile.jslist.txt) do type %%i >>..\js\aws.mobile.all.debug.js

rem 压缩文件
..\..\..\..\..\jdk1.8\bin\java -jar %lib% --type js --charset UTF-8 ..\js\aws.mobile.all.debug.js -o ..\js\aws.mobile.all.js

timeout 10