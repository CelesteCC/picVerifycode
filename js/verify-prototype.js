window.onload=function(){
	var oVf = document.getElementById('Verify');
	var oBar = getElementsByClassName( oVf,'verify_bar','div' )[0];
	var oCon = getElementsByClassName( oVf,'verify_con','div' )[0];
	var oImg = getElementsByClassName( oVf,'verify_slide_img','div' )[0];
	var oBtn = getElementsByClassName( oVf,'verify_btn','p' )[0];
	var oBg = getElementsByClassName( oVf,'verify_slide_bg','div' )[0];
	var oRignt = getElementsByClassName( oVf,'verify_right','p' )[0];
	var oError = getElementsByClassName( oVf,'verify_error','p' )[0];
	var oBgImg = oBg.getElementsByTagName('img')[0];
	var timer = null;
	var s = 0;
	var f = true;
	
	var data = [
		{"ot":21,"ol":107,"osrc":"code_1_bg.png","obtn":"code_1_pice.png",},
		{"ot":21,"ol":56,"osrc":"code_2_bg.png","obtn":"code_2_pice.png",},
		{"ot":21,"ol":185,"osrc":"code_3_bg.png","obtn":"code_3_pice.png",},
		{"ot":21,"ol":225,"osrc":"code_4_bg.png","obtn":"code_4_pice.png",},
		{"ot":44,"ol":179,"osrc":"code_5_bg.png","obtn":"code_5_pice.png",},
		{"ot":56,"ol":152,"osrc":"code_6_bg.png","obtn":"code_6_pice.png",},
		{"ot":21,"ol":158,"osrc":"code_7_bg.png","obtn":"code_7_pice.png",},
		{"ot":21,"ol":152,"osrc":"code_8_bg.png","obtn":"code_8_pice.png",},
		{"ot":21,"ol":161,"osrc":"code_9_bg.png","obtn":"code_9_pice.png",},
		{"ot":21,"ol":183,"osrc":"code_10_bg.png","obtn":"code_10_pice.png",}
	];
	
	//图片随机
	var i = Math.round(Math.random()*(data.length-1));
	oImg.style.backgroundImage = 'url(img/'+data[i].obtn+')';
	oImg.style.backgroundPositionY = data[i].ot + 'px';
	oBgImg.setAttribute('src','img/'+data[i].osrc);
	
	oBar.onmouseover = function(){
		if(f){
		oCon.style.display = 'block';
		
		oBtn.onmousedown = function(ev){
			if(f){
			
			var ev = ev || window.event;
			disX = ev.clientX - this.getBoundingClientRect().left;
			oBtn.onmousemove = function(ev){
				
				var ev = ev || window.event;
				var valueL = ev.clientX - disX - oBar.getBoundingClientRect().left ;
				
				if( valueL <= 0 ){
					
					valueL = 0;
					
				}else if( valueL >= this.parentNode.clientWidth-this.clientWidth ){
					
					valueL = this.parentNode.clientWidth-this.clientWidth
					
				}
				this.style.left = valueL + 'px';
				oImg.style.left = valueL + 'px';
			}
			}
			
		}

		oBtn.onmouseup = function(event){
			
			var oL = this.offsetLeft;
			clearInterval(timer);

			//匹配左边距，相差5px
			if( oImg.offsetLeft>=(data[i].ol-5) && oImg.offsetLeft<=(data[i].ol+5) ){
				//匹配成功
				oCon.style.display = 'none';
				oRignt.style.display = 'block';
				oError.style.display = 'none';
				this.style.background = 'url(img/slider_valid.png) center center no-repeat';
				f = false;
				console.log(f)

			}else{
				//匹配失败
				oError.style.display = 'block';
				oRignt.style.display = 'none';
				this.style.background = 'url(img/slider_invalid.png) center center no-repeat';
				setTimeout(function(){
					oError.style.display = 'none';
					oBtn.style.background = 'url(img/slider.png) center center no-repeat';
					//clearInterval(timer);
					timer = setInterval(function(){
						s++;
						oBtn.style.left = oL - s + 1 + 'px';
						oImg.style.left = oL - s + 'px';
						if(oL - s<1){
							clearInterval(timer);
						}
					},4)
					
				},500);
				s = 0;
			}
			
			//500毫秒后更换背景图片
			setTimeout(function(){
				var j = Math.round(Math.random()*(data.length-1));
				oImg.style.backgroundImage = 'url(img/'+data[j].obtn+')';
				oImg.style.backgroundPositionY = data[j].ot + 'px';
				oBgImg.setAttribute('src','img/'+data[j].osrc);
				i = j;
			},1000)
			
			this.onmousemove = null;
			this.onmouseup = null;
			
		}
		}
	}
	
	 
	oBar.onmouseout = function(){
		oCon.style.display = 'none';
	}
	
}
//通过class选择
function getElementsByClassName( parent,ClassName,TagName ){
	var aEls = parent.getElementsByTagName( TagName );
	var arr = [];

	for (var i = 0; i < aEls.length; i++) {
		var aClassName = aEls[i].className.split(' ');   //多个样式
		for (var j = 0; j < aClassName.length; j++) {
			if ( aClassName[j] == ClassName ) {
				arr.push( aEls[i] );
				break;//避免样式名称重复
			}
		}
	}
	return arr;
}