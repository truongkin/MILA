!function(e) {
    const addBtn = ()=>{
        var b = document.getElementById("messageCol");
        c = b.getElementsByTagName('div')[1].getElementsByTagName('div')[0];
        document.querySelectorAll('.conversation-list-item').forEach(function(user){
            user.addEventListener('click', function(){
                // myLoop()
                myLoopIbox()
            })
        });
    }
    
    function myLoopIbox() {         
        setTimeout(function() {
            ibox = document.getElementById("reply_box")
          if (ibox == undefined) {           
            myLoopIbox();             
          }else{
            handkeIbox()
          }                      
        }, 1000)
    }
    function translateIbox(){
        ibox = document.getElementById("replyBoxComposer").value
        tranlate2(ibox.replaceAll("<br>", " ")).then(response => {
            document.getElementById("replyBoxComposer").value =response 
        });
    }
    function handkeIbox(){
        ibox = document.getElementById("reply_box").getElementsByTagName('div')[10]
        if(document.getElementById("reply_box").getElementsByTagName('div')[15] == undefined){
            const img = document.createElement('img');
            img.setAttribute("src",('https://cdn.iconscout.com/icon/free/png-512/google-translate-3-555703.png'))
            img.setAttribute("class","fb-icon-png noselect")
            img.setAttribute("style","width: 22px; height: 22px;")

            const div = document.createElement('div');
            div.setAttribute("style","float: right;")
            div.appendChild(img)
            div.addEventListener('click',translateIbox)
            ibox.appendChild(div);
        }
        
    }
    function tranlate(key){
    	return new Promise((resolve, reject) => {
	        chrome.runtime.sendMessage({method: "translate", key: key}, function(response) {
			  resolve (response.data);
			});
	    });
      // var myHeaders = new Headers();
      //       myHeaders.append("Host", "translate.google.sn");
      //       myHeaders.append("Connection", "keep-alive");
      //       myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36");
      //       myHeaders.append("Content-type", "application/x-www-form-urlencoded");
      //       myHeaders.append("Accept", "*/*");
      //       myHeaders.append("X-Client-Data", "CIm2yQEIpLbJAQjBtskBCKmdygEI67jKAQisx8oBCPbHygEI6cjKAQi0y8oBCNzVygEI7pfLAQiYmssBCM2aywEYi8HKARifwcoB");

      //       myHeaders.append("Sec-Fetch-Site", "none");
      //       myHeaders.append("Sec-Fetch-Mode", "cors");
      //       myHeaders.append("Sec-Fetch-Dest", "empty");
      //       myHeaders.append("Accept-Encoding", "");
      //       myHeaders.append("Accept-Language", "vi,vi-VN;q=0.9");
      //       myHeaders.append("Cookie", "NID=204=L3ebov3qdQKfcO7b2PxSJOdFVFIfTP5gUmLo8UxZo_EvBWSI3iaZYnRqScQmhEK7sn3LAqv7E6tHlIPHGOcaK814_DcZ1MaaFjYLaE55Z5XABixdBZQUL328W-lRIQf_oM9KBkceBNLW3e6O2KLkD5hfVqcuk5WstS07YhdQpYo");

      //       var requestOptions = {
      //       method: 'GET',
      //       headers: myHeaders,
      //       redirect: 'follow'
      //       };

      //       return fetch(`https://translate.google.sn/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=${key}&tbb=1&ie=UTF-8&oe=UTF-8&tk=470223|593139`, requestOptions)
      //       .then(response => response.text())
      //       .then(result => {
      //           let result1 = JSON.parse(result);
      //           return result1.sentences[0].trans;
      //       })
      //       .catch(error => console.log('error', error));
    }
    function tranlate2(key){
        return new Promise((resolve, reject) => {
	        chrome.runtime.sendMessage({method: "translate_two", key: key}, function(response) {
			  resolve (response.data);
			});
	    });
      // var myHeaders = new Headers();
      //       myHeaders.append("Host", "translate.google.sn");
      //       myHeaders.append("Connection", "keep-alive");
      //       myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36");
      //       myHeaders.append("Content-type", "application/x-www-form-urlencoded");
      //       myHeaders.append("Accept", "*/*");
      //       myHeaders.append("X-Client-Data", "CIm2yQEIpLbJAQjBtskBCKmdygEI67jKAQisx8oBCPbHygEI6cjKAQi0y8oBCNzVygEI7pfLAQiYmssBCM2aywEYi8HKARifwcoB");

      //       myHeaders.append("Sec-Fetch-Site", "none");
      //       myHeaders.append("Sec-Fetch-Mode", "cors");
      //       myHeaders.append("Sec-Fetch-Dest", "empty");
      //       myHeaders.append("Accept-Encoding", "");
      //       myHeaders.append("Accept-Language", "vi,vi-VN;q=0.9");
      //       myHeaders.append("Cookie", "NID=204=L3ebov3qdQKfcO7b2PxSJOdFVFIfTP5gUmLo8UxZo_EvBWSI3iaZYnRqScQmhEK7sn3LAqv7E6tHlIPHGOcaK814_DcZ1MaaFjYLaE55Z5XABixdBZQUL328W-lRIQf_oM9KBkceBNLW3e6O2KLkD5hfVqcuk5WstS07YhdQpYo");

      //       var requestOptions = {
      //       method: 'GET',
      //       headers: myHeaders,
      //       redirect: 'follow'
      //       };

      //       return fetch(`https://translate.google.sn/translate_a/t?client=dict-chrome-ex&sl=auto&tl=th&q=${key}&tbb=1&ie=UTF-8&oe=UTF-8&tk=470223|593139`, requestOptions)
      //       .then(response => response.text())
      //       .then(result => {
      //           let result1 = JSON.parse(result);
      //           return result1.sentences[0].trans;
      //       })
      //       .catch(error => console.log('error', error));
    }
    function tranlateAudio(key){
        return new Promise((resolve, reject) => {
          chrome.runtime.sendMessage({method: "tranlateAudio", key: key}, function(response) {
        resolve (response.data);
      });
      });
    }
    const execute = async () => {
        addBtn();
    }

    chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
         if (request.method == 'ping'){

            setTimeout(function(){
                var b = document.getElementById("messageCol");
                b.querySelectorAll('.message-text-ele ').forEach(function(el){

                    if(el.getElementsByTagName('a')[0] ==undefined){
                      // console.log(el.getElementsByTagName('div')[0].innerHTML)
                        let text = el.getElementsByTagName('div')[0].innerHTML;
                        tranlate(text.replaceAll("<br>", " ")).then(response => {
                            const aGM = document.createElement('a');
                            aGM.innerText = response;
                            el.appendChild(aGM);
                        });
                    }
                })
                sendResponse({ data: 'pong' });
            },2000)
          }
          if (request.method == 'watch_video'){
            console.log("ok")
            setTimeout(function(){
                var b = document.getElementById("messageCol");
                b.querySelectorAll('.inbox-message-ele').forEach(function(el){
                  // const aGM = document.createElement('p');
                  // aGM.innerText = "123";
                  // aGM.setAttribute("style", "margin-left: 58px;height: 20px;padding: 0 !important;padding-top: 10px;display: block;padding-top: 16px !important;");
                  // el.appendChild(aGM);
                  if(el.getElementsByTagName('audio')[0]){
                    el.removeAttribute("style")
                     if(el.getElementsByTagName('audio')[0].getAttribute("src")){
                        if(el.getElementsByTagName('p')[0] ==undefined){
                          tranlateAudio(el.getElementsByTagName('audio')[0].getAttribute("src")).then(response => {
                              const aGM = document.createElement('p');
                              aGM.innerText = response;
                              aGM.setAttribute("style", "margin-left: 58px;");
                              el.appendChild(aGM);
                          });
                      }
                     }
                  }
                  
                    // if(el.getElementsByTagName('audio')[0].getAttribute("src")){
                    //   if(el.getElementsByTagName('a')[0] ==undefined){
                    //       tranlateAudio(el.getElementsByTagName('audio')[0].getAttribute("src")).then(response => {
                    //           const aGM = document.createElement('a');
                    //           aGM.innerText = response;
                    //           el.appendChild(aGM);
                    //       });
                    //   }
                    // }
                })
                sendResponse({ data: 'xem audio' });
            },2000)
            // sendResponse({ data: 'xem audio' });
          }
          else {
            sendResponse({});
          }
    });
    
    window.addEventListener('load', execute);
}(chrome);

