#!/bin/sh

# 压缩AWS平台的JavaScript文件
export lib=./yuicompressor-2.4.7.jar

# 删除旧文件
rm /q ../js/aws.mobile.all.debug.js

# 合并文件
for line in $(cat ./3.aws.mobile.jslist.linux.txt)
do
    cat ${line} >>../js/aws.mobile.all.debug.js
done

# 压缩文件
$(/usr/libexec/java_home -v 1.8) -jar ${lib} --type js --charset UTF-8 ../js/aws.mobile.all.debug.js -o ../js/aws.mobile.all.js
