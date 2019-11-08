var path = "../";//path路径从引入js时传入
var scArr = document.getElementsByTagName('script');
for (var i = scArr.length - 1; i >= 0; i--) {
	var script = scArr[i];
	if (script.src.indexOf("rsa.pwd.public.js") > -1) {
		if (script.src.split('?')[1] == undefined) {
			break;
		}
		var paramsArr = script.src.split('?')[1].split('&');
		if (paramsArr.length > 0) {
			param = paramsArr[0].split('=');
			var value = param[1];
			if (value != undefined) {
				path = value;
			}
		}
		break;
	}
}

document.write('<script language="JavaScript" type="text/javascript" src="' + path + 'commons/js/rsa/jsbn.js"></script>');
document.write('<script language="JavaScript" type="text/javascript" src="' + path + 'commons/js/rsa/prng4.js"></script>');
document.write('<script language="JavaScript" type="text/javascript" src="' + path + 'commons/js/rsa/rng.js"></script>');
document.write('<script language="JavaScript" type="text/javascript" src="' + path + 'commons/js/rsa/rsa.js"></script>');

function rsa_pwd(content) {
	//十六进制公钥
	var rsa_n = "8bcbceb956d3d6c0da8cd8847e50796eac0fb3d67d4901820fa85dcd8edbb30bd25966eb18223e1ace1308da181897df4559bf97cca6ae9a33a0baf6f53324334a385d2a7cbc186fb5070045080b6c948423e7ddcd795ac9eaa438317772f4a948409ecec92dfe222a10b4c327e8d0e494cc0aa42ebc786030a105da0637049d";
	var rsa = new RSAKey();
	rsa.setPublic(rsa_n, "10001");
	var content_rsa = rsa.encrypt(content);
	return content_rsa;
}
