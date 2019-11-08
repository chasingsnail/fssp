/**
 *create by 2012-08-25 pm 17:48
 *@author hexinglun@gmail.com
 *http://code.google.com/p/lazycode/
 *BASE64 Encode and Decode By UTF-8 unicode
 *可以和java的BASE64编码和解码互相转化
 */
(function() {
	var BASE64_MAPPING = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
			'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W',
			'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
			'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w',
			'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
			'+', '/' ];

	/**
	 *ascii convert to binary
	 */
	var _toBinary = function(ascii) {
		var binary = new Array();
		while (ascii > 0) {
			var b = ascii % 2;
			ascii = Math.floor(ascii / 2);
			binary.push(b);
		}
		/*
		var len = binary.length;
		if(6-len > 0){
			for(var i = 6-len ; i > 0 ; --i){
				binary.push(0);
			}
		}*/
		binary.reverse();
		return binary;
	};

	/**
	 *binary convert to decimal
	 */
	var _toDecimal = function(binary) {
		var dec = 0;
		var p = 0;
		for (var i = binary.length - 1; i >= 0; --i) {
			var b = binary[i];
			if (b == 1) {
				dec += Math.pow(2, p);
			}
			++p;
		}
		return dec;
	};

	/**
	 *unicode convert to utf-8
	 */
	var _toUTF8Binary = function(c, binaryArray) {
		var mustLen = (8 - (c + 1)) + ((c - 1) * 6);
		var fatLen = binaryArray.length;
		var diff = mustLen - fatLen;
		while (--diff >= 0) {
			binaryArray.unshift(0);
		}
		var binary = [];
		var _c = c;
		while (--_c >= 0) {
			binary.push(1);
		}
		binary.push(0);
		var i = 0, len = 8 - (c + 1);
		for (; i < len; ++i) {
			binary.push(binaryArray[i]);
		}

		for (var j = 0; j < c - 1; ++j) {
			binary.push(1);
			binary.push(0);
			var sum = 6;
			while (--sum >= 0) {
				binary.push(binaryArray[i++]);
			}
		}
		return binary;
	};

	var __BASE64 = {
		/**
		 *BASE64 Encode
		 */
		encoder : function(str) {
			var base64_Index = [];
			var binaryArray = [];
			for (var i = 0, len = str.length; i < len; ++i) {
				var unicode = str.charCodeAt(i);
				var _tmpBinary = _toBinary(unicode);
				if (unicode < 0x80) {
					var _tmpdiff = 8 - _tmpBinary.length;
					while (--_tmpdiff >= 0) {
						_tmpBinary.unshift(0);
					}
					binaryArray = binaryArray.concat(_tmpBinary);
				} else if (unicode >= 0x80 && unicode <= 0x7FF) {
					binaryArray = binaryArray.concat(_toUTF8Binary(2,
							_tmpBinary));
				} else if (unicode >= 0x800 && unicode <= 0xFFFF) {//UTF-8 3byte
					binaryArray = binaryArray.concat(_toUTF8Binary(3,
							_tmpBinary));
				} else if (unicode >= 0x10000 && unicode <= 0x1FFFFF) {//UTF-8 4byte
					binaryArray = binaryArray.concat(_toUTF8Binary(4,
							_tmpBinary));
				} else if (unicode >= 0x200000 && unicode <= 0x3FFFFFF) {//UTF-8 5byte
					binaryArray = binaryArray.concat(_toUTF8Binary(5,
							_tmpBinary));
				} else if (unicode >= 4000000 && unicode <= 0x7FFFFFFF) {//UTF-8 6byte
					binaryArray = binaryArray.concat(_toUTF8Binary(6,
							_tmpBinary));
				}
			}

			var extra_Zero_Count = 0;
			for (var i = 0, len = binaryArray.length; i < len; i += 6) {
				var diff = (i + 6) - len;
				if (diff == 2) {
					extra_Zero_Count = 2;
				} else if (diff == 4) {
					extra_Zero_Count = 4;
				}
				//if(extra_Zero_Count > 0){
				//	len += extra_Zero_Count+1;
				//}
				var _tmpExtra_Zero_Count = extra_Zero_Count;
				while (--_tmpExtra_Zero_Count >= 0) {
					binaryArray.push(0);
				}
				base64_Index.push(_toDecimal(binaryArray.slice(i, i + 6)));
			}

			var base64 = '';
			for (var i = 0, len = base64_Index.length; i < len; ++i) {
				base64 += BASE64_MAPPING[base64_Index[i]];
			}

			for (var i = 0, len = extra_Zero_Count / 2; i < len; ++i) {
				base64 += '=';
			}
			return base64;
		},
		/**
		 *BASE64  Decode for UTF-8 
		 */
		decoder : function(str) {
			var c1, c2, c3, c4;
			var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1,
					-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
					-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
					-1, -1, -1, -1, -1, 62, -1, -1, -1, 63, 52, 53, 54, 55, 56,
					57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3,
					4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
					20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28,
					29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
					44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
			var i = 0, len = str.length, string = '';

			while (i < len) {
				do {
					c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
				} while (i < len && c1 == -1);

				if (c1 == -1)
					break;

				do {
					c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff]
				} while (i < len && c2 == -1);

				if (c2 == -1)
					break;

				string += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

				do {
					c3 = str.charCodeAt(i++) & 0xff;
					if (c3 == 61)
						return string;

					c3 = base64DecodeChars[c3]
				} while (i < len && c3 == -1);

				if (c3 == -1)
					break;

				string += String.fromCharCode(((c2 & 0XF) << 4)
						| ((c3 & 0x3C) >> 2));

				do {
					c4 = str.charCodeAt(i++) & 0xff;
					if (c4 == 61)
						return string;
					c4 = base64DecodeChars[c4]
				} while (i < len && c4 == -1);

				if (c4 == -1)
					break;

				string += String.fromCharCode(((c3 & 0x03) << 6) | c4)
			}
			return string
		}
	};

	window.BASE64 = __BASE64;
})();