#!/bin/sh

# 压缩AWS平台的JavaScript文件
export lib=./yuicompressor-2.4.7.jar

# 删除旧文件
rm /q ../js/aws.pc.all.debug.js

# 合并文件
for line in $(cat ./2.aws.pc.jslist.linux.txt)
do
    cat ${line} >>../js/aws.pc.all.debug.js
done

# 压缩文件
$(/usr/libexec/java_home -v 1.8) -jar ${lib} --type js --charset UTF-8 ../js/aws.pc.all.debug.js -o ../js/aws.pc.all.js
