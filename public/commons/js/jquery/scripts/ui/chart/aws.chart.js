loadjs("./jquery/scripts/ui/chart/esl.js");
//loadjs("./jquery/scripts/ui/chart/echarts-plain.js");

(function($) {
	$.fn.chart = function(options, callback, theme) {
			var obj = $(this).children(".awsui-chart-main");
			var fileLocation=bootPATH + 'jquery/scripts/ui/chart/echarts-plain';
			require.config({
				paths : {
					 echarts : bootPATH + 'jquery/scripts/ui/chart/echarts' ,
					'echarts/chart/bar' : fileLocation,
					'echarts/chart/line' : fileLocation,
					'echarts/chart/pie' : fileLocation,
					'echarts/chart/force' : fileLocation,
					'echarts/chart/base' : fileLocation,
					'echarts/chart/chord' : fileLocation,
					'echarts/chart/forceLayoutWorker' : fileLocation,
					'echarts/chart/funnel' : fileLocation,
					'echarts/chart/gauge' : fileLocation,
					'echarts/chart/island' : fileLocation,
					'echarts/chart/k' : fileLocation,
					'echarts/chart/radar' : fileLocation,
					'echarts/chart/scatter' : fileLocation
				}
			});
			require([
				'echarts', 
				'echarts/chart/bar', 
				'echarts/chart/line',
				'echarts/chart/pie',
				'echarts/chart/force',
				'echarts/chart/base',
			 	'echarts/chart/chord', 
			 	'echarts/chart/forceLayoutWorker',
			  	'echarts/chart/funnel',
			    'echarts/chart/gauge', 
			    'echarts/chart/island', 
			    'echarts/chart/k', 
			    'echarts/chart/radar',
			    'echarts/chart/scatter'
				  ], function(ec) {
					var awsTheme = "";
					var themeId = 'echarts/' + theme;
					if (theme == undefined) {
						theme = "default";
						themeId = 'echarts';
					}
					var themePath = './jquery/scripts/ui/chart/echarts/' + theme;
					require.config({
						paths : {
							themeId : themePath
						}
					});
					require([themeId], function(tarTheme) {
						var awsChart;
						awsChart = ec.init(obj.get(0), tarTheme);
						awsChart.setOption(options);
						if (options.click) {
							awsChart.on("click", options.click);
						}
						if (options.loadSuccess) {
							options.loadSuccess(awsChart);
						}
						if(callback){
							callback(awsChart);
						}
					});
			});

			$(".awsui-chart").css("padding", "5px");
			$(".awsui-chart").css("border", "1px solid #DDDDDD");
			$(".awsui-chart-title").css("border-bottom", "1px solid #DDDDDD");
			obj.css("border", "0px");
			obj.css("width", "100%");
			obj.css("height", "100%");
	};
})(jQuery); 