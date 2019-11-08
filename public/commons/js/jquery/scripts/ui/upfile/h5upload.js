//图片压缩处理

; (function ($) {
    $.extend($, {
        fileUpload: function (options) {
            var para = {
            	filebase: "mfile",//mvc后台需要对应的名称,可随便写
                auto: true,
                previewZoom: null,//预览Div id
                uploadComplete: function (res) {
                    console.log("uploadComplete", res);
                    uploadCount++;
                    core.checkComplete();
                },
                uploadError: function (err) {
                    console.log("uploadError", err);
                },
                onProgress: function (percent) {  // 提供给外部获取单个文件的上传进度，供外部实现上传进度效果
                    console.log(percent);
                },
            };
            para = $.extend(para, options);

            
            var divInput = ' <div ></div>';
            var $self = $(divInput);
            $self.insertAfter($("#"+para.filebutton));
           
            init();
            //先加入一个file元素
            var multiple = "";  // 设置多选的参数
            para.multiple ? multiple = "multiple" : multiple = "";
            $self.css('position', 'relative');
            var types = ["image/png", "image/jpeg", "image/gif", "image/bmp"];
            //accept="image/jpeg,.jpg,image/gif,.gif,image/png,.png,image/bmp,.bmp,.jpeg"
            
            var inputstr = '<span ><input id='+para.id+'  type="file" style="display:none;" name="fileselect[]" ' + multiple + ' '+ para.accept + ' ></span>';
            $self.append(inputstr);
            
            var doms = {
                "fileToUpload": $self.find("#"+para.id),
            };
            function init() {
                $self.find("#"+para.id).remove();
                $(document).off("change", "#"+para.id);
                $(document).off("click", para.filebutton);
                $(document).off("click", para.uploadButton);
            }
            function getBase64Image(img) {
                var canvas = document.createElement("canvas");
                canvas.width = img.width;
                canvas.height = img.height;

                var ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, img.width, img.height);

                var dataURL = canvas.toDataURL("image/jpeg");
                return dataURL;

                // return dataURL.replace("data:image/png;base64,", "");
            }
            function simpleSize(size) {
                if (!size) return "0";
                if (size < 1024) {
                    return size;
                }
                var kb = size / 1024;
                if (kb < 1024) {
                    return kb.toFixed(2) + "K";
                }
                var mb = kb / 1024;
                if (mb < 1024) {
                    return mb.toFixed(2) + "M";

                }
                var gb = mb / 1024;
                return gb.toFixed(2) + "G";
            };
            
            function dataURItoBlob(dataURI) {
        	    // convert base64/URLEncoded data component to raw binary data held in a string
        	    var byteString;
        	    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        	        byteString = atob(dataURI.split(',')[1]);
        	    else
        	        byteString = unescape(dataURI.split(',')[1]);

        	    // separate out the mime component
        	    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

        	    // write the bytes of the string to a typed array
        	    var ia = new Uint8Array(byteString.length);
        	    for (var i = 0; i < byteString.length; i++) {
        	        ia[i] = byteString.charCodeAt(i);
        	    }

        	    return new Blob([ia], {type:mimeString});
        	}
  
            var uploadCount = 0;
            var core = {   

            		getExifOrientation: function (file, callback) {
            		    // Suggestion from http://code.flickr.net/2012/06/01/parsing-exif-client-side-using-javascript-2/:
            		    if (file.slice) {
            		        file = file.slice(0, 131072);
            		    } else if (file.webkitSlice) {
            		        file = file.webkitSlice(0, 131072);
            		    }

            		    var reader = new FileReader();
            		    reader.onload = function(e) {
            		        var view = new DataView(e.target.result);
            		        if (view.getUint16(0, false) != 0xFFD8) {
            		            callback(-2);
            		            return;
            		        }
            		        var length = view.byteLength, offset = 2;
            		        while (offset < length) {
            		            var marker = view.getUint16(offset, false);
            		            offset += 2;
            		            if (marker == 0xFFE1) {
            		                if (view.getUint32(offset += 2, false) != 0x45786966) {
            		                    callback(-1);
            		                    return;
            		                }
            		                var little = view.getUint16(offset += 6, false) == 0x4949;
            		                offset += view.getUint32(offset + 4, little);
            		                var tags = view.getUint16(offset, little);
            		                offset += 2;
            		                for (var i = 0; i < tags; i++)
            		                    if (view.getUint16(offset + (i * 12), little) == 0x0112) {
            		                        callback(view.getUint16(offset + (i * 12) + 8, little));
            		                        return;
            		                    }
            		            }
            		            else if ((marker & 0xFF00) != 0xFF00) break;
            		            else offset += view.getUint16(offset, false);
            		        }
            		        callback(-1);
            		    };
            		    reader.readAsArrayBuffer(file);
            		},

            		// Derived from https://stackoverflow.com/a/40867559, cc by-sa
            		imgToCanvasWithOrientation : function (img, rawWidth, rawHeight, orientation) {
            		    var canvas = document.createElement('canvas');
            		    if (orientation > 4) {
            		        canvas.width = rawHeight;
            		        canvas.height = rawWidth;
            		    } else {
            		        canvas.width = rawWidth;
            		        canvas.height = rawHeight;
            		    }

            		    if (orientation > 1) {
            		        console.log("EXIF orientation = " + orientation + ", rotating picture");
            		    }

            		    var ctx = canvas.getContext('2d');
            		    switch (orientation) {
            		        case 2: ctx.transform(-1, 0, 0, 1, rawWidth, 0); break;
            		        case 3: ctx.transform(-1, 0, 0, -1, rawWidth, rawHeight); break;
            		        case 4: ctx.transform(1, 0, 0, -1, 0, rawHeight); break;
            		        case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
            		        case 6: ctx.transform(0, 1, -1, 0, rawHeight, 0); break;
            		        case 7: ctx.transform(0, -1, -1, 0, rawHeight, rawWidth); break;
            		        case 8: ctx.transform(0, -1, 1, 0, 0, rawWidth); break;
            		    }
            		    ctx.drawImage(img, 0, 0, rawWidth, rawHeight);
            		    return canvas;
            		},

            		reduceFileSize : function (file, acceptFileSize, maxWidth, maxHeight, quality, callback) {
            		    if (file.size <= acceptFileSize) {
            		        callback(file);
            		        return;
            		    }
            		    var img = new Image();
            		    img.onerror = function() {
            		        URL.revokeObjectURL(this.src);
            		        callback(file);
            		    };
            		    img.onload = function() {
            		        URL.revokeObjectURL(this.src);
            		        core.getExifOrientation(file, function(orientation) {
            		            var w = img.width, h = img.height;
            		            var scale = (orientation > 4 ?
            		                Math.min(maxHeight / w, maxWidth / h, 1) :
            		                Math.min(maxWidth / w, maxHeight / h, 1));
            		            h = Math.round(h * scale);
            		            w = Math.round(w * scale);

            		            var canvas = core.imgToCanvasWithOrientation(img, w, h, orientation);
            		            canvas.toBlob(function(blob) {
            		                console.log("Resized image to " + w + "x" + h + ", " + (blob.size >> 10) + "kB");
            		                callback(blob);
            		            }, 'image/jpeg', quality);
            		        });
            		    };
            		    img.src = URL.createObjectURL(file);
            		},  

            		  
                fileSelected: function () {
                    var files = $("#"+para.id)[0].files;
                    var count = files.length;
                    for (var i = 0; i < count; i++) {
                        if (i >= para.limitCount) {
                            // imClient.customerSay("最多只能选择"+para.limitCount+"张图片!");
                            break;
                        }
                        var item = files[i];
                        if (item.size > 1024 * 1024 * para.maxSize) {
                            para.onMaxSize("文件太大不能上传!");
                            return;
                        }
                        if (!~types.indexOf(item.type)) {
                        	core.uploadFile(item);
                            return;
                        }
                        if (item.size > 1024 * 512) {
                            (function(img) {
                            	var itemName = item.name;
                            	
                            	core.reduceFileSize(img, 512*1024, 900, 1500, 0.9, function(blob) {
                            		 core.uploadBase64str(blob, itemName);
                            	    });
                            	
                            })(item);

                        } else {
//                            if (para.auto) 
                            core.uploadFile(item);
                        }
                    }
                },
                uploadBase64str: function (base64Str, fileName) {

                    //var blob = dataURItoBlob(base64Str);
                    //console.log("压缩后的文件大小", blob.size);
                    //core.uploadFile(blob);
                    var formdata = new FormData();
                    formdata.append(fileName, base64Str);
//                    formdata.append("fileName", fileName);
                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (e) {
                        var percentComplete = Math.round(e.loaded * 100 / e.total);
                        para.onProgress(percentComplete.toString() + '%');
                    });
                    xhr.addEventListener("load", function (e) {
                        para.uploadComplete(xhr.responseText);
                    });
                    xhr.addEventListener("error", function (e) {
                        para.uploadError(e);
                    });

                    xhr.open("post", para.url, true);
                    xhr.send(formdata);
                },
                uploadFile: function (file) {
                    console.log("开始上传");
                    var formdata = new FormData();

                    formdata.append(para.filebase, file);//这个名字要和mvc后台配合

                    var xhr = new XMLHttpRequest();
                    xhr.upload.addEventListener("progress", function (e) {

                        var percentComplete = Math.round(e.loaded * 100 / e.total);
                        para.onProgress(percentComplete.toString() + '%');
                    });
                    xhr.addEventListener("load", function (e) {
                        para.uploadComplete(xhr.responseText);
                    });
                    xhr.addEventListener("error", function (e) {
                        para.uploadError(e);
                    });

                    xhr.open("post", para.url, true);
                    xhr.send(formdata);
                },
                checkComplete:function() {
                    var all = (doms.fileToUpload)[0].files.length;
                    if (all == uploadCount) {
                        console.log(all + "个文件上传完毕");
                        doms.fileToUpload.remove();
                        //input有一个问题就是选择重复的文件不会触发change事件，所以做了一个处理，再每次上传完之后删掉这个元素再新增一个input。
                         $self.append(inputstr);
                    }
                },
                uploadFiles: function () {
                    var files = (doms.fileToUpload)[0].files;
                    for (var i = 0; i < files.length; i++) {
                        core.uploadFile(files[i]);
                    }
                },
                previewImage: function (file) {
                    if (!para.previewZoom) return;
                    var img = document.createElement("img");
                    img.file = file;
                    $(para.previewZoom).append(img);
                    // 使用FileReader方法显示图片内容
                    var reader = new FileReader();
                    reader.onload = (function (aImg) {
                        return function (e) {
                            aImg.src = e.target.result;
                        };
                    })(img);
                    reader.readAsDataURL(file);
                }
            }
            $(document).on("change", "#"+para.id, function () {
                core.fileSelected();
            });

            $(document).on("click", "#"+para.filebutton, function () {
                $("#"+para.id).trigger("click");
                
                return false;
            });
        }
    });
})(jQuery);
