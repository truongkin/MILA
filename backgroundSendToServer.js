chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "translate") {
        (async() => {
            if (localStorage.getItem("currentUser") && localStorage.getItem("language")) {
                let res = await translate(request.key);
                sendResponse({
                    data: res
                })
            } else {
                sendResponse({
                    data: ""
                });
            }
        })();
        return true;
    } else
    if (request.method == "translate_two") {
        (async() => {
            if (localStorage.getItem("currentUser") && localStorage.getItem("language")) {
                let res = await translate_two(request.key);
                sendResponse({
                    data: res
                })
            } else {
                sendResponse({
                    data: ""
                });
            }
        })();
        return true;
    } else
    if (request.method == "tranlateAudio") {
        (async() => {
            if (localStorage.getItem("currentUser") && localStorage.getItem("language")) {
                let res = await tranlateAudio(request.key);
                sendResponse({
                    data: res
                })
            } else {
                sendResponse({
                    data: ""
                });
            }
        })();
        return true;
    } else
        sendResponse({}); // snub them.
});

function translate_two(key) {
    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("currentUser")).token;
        let language = localStorage.getItem("language")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("key", key);
        urlencoded.append("nation", language);
        urlencoded.append("token", token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://45.32.113.69:11051/api/loadbalance", requestOptions)
            .then(response => response.text())
            .then(result => {
                let result1 = JSON.parse(result);
                if(result1.status == 200 || result1.status == 400){
                    if(result1.status == 200){
                        addMess(key , result1.data)
                    }
                    resolve(result1.data)
                }else{
                    var myHeaders = new Headers();
                    myHeaders.append("Host", "translate.google.sn");
                    myHeaders.append("Connection", "keep-alive");
                    myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36");
                    myHeaders.append("Content-type", "application/x-www-form-urlencoded");
                    myHeaders.append("Accept", "*/*");
                    myHeaders.append("X-Client-Data", "CIm2yQEIpLbJAQjBtskBCKmdygEI67jKAQisx8oBCPbHygEI6cjKAQi0y8oBCNzVygEI7pfLAQiYmssBCM2aywEYi8HKARifwcoB");
                    myHeaders.append("Sec-Fetch-Site", "none");
                    myHeaders.append("Sec-Fetch-Mode", "cors");
                    myHeaders.append("Sec-Fetch-Dest", "empty");
                    myHeaders.append("Accept-Encoding", "");
                    myHeaders.append("Accept-Language", "vi,vi-VN;q=0.9");
                    myHeaders.append("Cookie", "NID=204=L3ebov3qdQKfcO7b2PxSJOdFVFIfTP5gUmLo8UxZo_EvBWSI3iaZYnRqScQmhEK7sn3LAqv7E6tHlIPHGOcaK814_DcZ1MaaFjYLaE55Z5XABixdBZQUL328W-lRIQf_oM9KBkceBNLW3e6O2KLkD5hfVqcuk5WstS07YhdQpYo");
                    var requestOptions = {
                    method: 'GET',
                    headers: myHeaders,
                    redirect: 'follow'
                    };

                    return fetch(`https://translate.google.sn/translate_a/t?client=dict-chrome-ex&sl=auto&tl=${localStorage.getItem("language")}&q=${key}&tbb=1&ie=UTF-8&oe=UTF-8&tk=470223|593139`, requestOptions)
                    .then(response => response.text())
                    .then(result => {
                        let result1 = JSON.parse(result);
                        let tran = "";
                        result1.sentences.forEach(element => {
                            if(element.trans) tran += element.trans
                        });
                        addMess(key , tran)
                        resolve( tran);
                    })
                    .catch(error => console.log('error', error));
                }
                
            }).
        catch(error => {
            resolve()
        });
        
    });

}
function tranlateAudio(key) {
    return new Promise((resolve, reject) => {
        let token = JSON.parse(localStorage.getItem("currentUser")).token;
        let language = localStorage.getItem("language")
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

        var urlencoded = new URLSearchParams();
        urlencoded.append("link", key);
        urlencoded.append("language", language);
        urlencoded.append("token", token);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
            redirect: 'follow'
        };

        fetch("http://45.32.113.69:11051/api/loadbalance-audio", requestOptions)
            .then(response => response.text())
            .then(result => {
                let result1 = JSON.parse(result);
                resolve(result1.data)
            }).
        catch(error => {
            resolve()
        });
    });

}

function translate(key) {
    return new Promise((resolve, reject) => {
        if(getMess(key) != undefined){
            resolve(getMess(key))
        }else{
            let token = JSON.parse(localStorage.getItem("currentUser")).token;
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            var urlencoded = new URLSearchParams();
            urlencoded.append("key", key);
            urlencoded.append("nation", "vi");
            urlencoded.append("token", token);
            
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };
            fetch("http://45.32.113.69:11051/api/loadbalance", requestOptions)
                .then(response => response.text())
                .then(result => {
                    
                    let result1 = JSON.parse(result);
                    if(result1.status == 200 || result1.status == 400){
                        if(result1.language && localStorage.getItem("language") != result1.language){
                            localStorage.setItem("language" , result1.language);
                        }
                        if(result1.status == 200){
                            addMess(key , result1.data)
                        }
                        resolve(result1.data)
                    }else{
                        var myHeaders = new Headers();
                        myHeaders.append("Host", "translate.google.sn");
                        myHeaders.append("Connection", "keep-alive");
                        myHeaders.append("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36");
                        myHeaders.append("Content-type", "application/x-www-form-urlencoded");
                        myHeaders.append("Accept", "*/*");
                        myHeaders.append("X-Client-Data", "CIm2yQEIpLbJAQjBtskBCKmdygEI67jKAQisx8oBCPbHygEI6cjKAQi0y8oBCNzVygEI7pfLAQiYmssBCM2aywEYi8HKARifwcoB");
                        myHeaders.append("Sec-Fetch-Site", "none");
                        myHeaders.append("Sec-Fetch-Mode", "cors");
                        myHeaders.append("Sec-Fetch-Dest", "empty");
                        myHeaders.append("Accept-Encoding", "");
                        myHeaders.append("Accept-Language", "vi,vi-VN;q=0.9");
                        myHeaders.append("Cookie", "NID=204=L3ebov3qdQKfcO7b2PxSJOdFVFIfTP5gUmLo8UxZo_EvBWSI3iaZYnRqScQmhEK7sn3LAqv7E6tHlIPHGOcaK814_DcZ1MaaFjYLaE55Z5XABixdBZQUL328W-lRIQf_oM9KBkceBNLW3e6O2KLkD5hfVqcuk5WstS07YhdQpYo");
                        var requestOptions = {
                            method: 'GET',
                            headers: myHeaders,
                            redirect: 'follow'
                        };

                        return fetch(`https://translate.google.sn/translate_a/t?client=dict-chrome-ex&sl=auto&tl=vi&q=${key}&tbb=1&ie=UTF-8&oe=UTF-8&tk=470223|593139`, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            let result1 = JSON.parse(result);
                            localStorage.setItem("language" , result1.ld_result.extended_srclangs[0]);
                            
                            let tran = "";
                            result1.sentences.forEach(element => {
                                if(element.trans) tran += element.trans
                            });
                            addMess(key , tran)
                            resolve( tran);
                            
                        })
                        .catch(error => console.log('error', error));
                    }
                    
                }).
            catch(error => {
                // console.log("123")
                resolve()
            });
        }
        
    });
}
function addMess(key , value){
    console.log("ad")
    let a = localStorage.getItem("mess_old");
    let b_cv = JSON.parse(a)
    console.log(b_cv.length)
    if(b_cv.length >300){
        b_cv = []
    }
    let c = {}
    c.key = key;
    c.value = value;
    b_cv.push(c);
    localStorage.setItem("mess_old",JSON.stringify(b_cv));
}
function getMess(key){
    let a = localStorage.getItem("mess_old");
    let b_cv = JSON.parse(a)
    if(b_cv.find(x => x.key === key) != undefined){
        return b_cv.find(x => x.key === key).value
    }else{
        return undefined;
    }
}
chrome.webRequest.onCompleted.addListener(
    function(details) {
        if ( details.url.indexOf('messages?customer_id') > -1 || details.url.indexOf('messages?current_count') > -1) {
            chrome.tabs.getSelected(null, function(tab) {
              chrome.tabs.sendRequest(tab.id, {method: 'ping'}, function(response) {
                console.log(response.data);
              });
            });    
        }
        if ( details.url.indexOf('get_attachments?is_video_inline') > -1 ) {
            console.log("xem audio")
            chrome.tabs.getSelected(null, function(tab) {
              chrome.tabs.sendRequest(tab.id, {method: 'watch_video'}, function(response) {
                console.log(response.data);
              });
            });    
        }
    },
    {urls: ["<all_urls>"]},
    ["responseHeaders"]
 );

chrome.webRequest.onBeforeRequest.addListener(
    function(details)
    {
        // console.log(details.requestBody);
    },
     {urls: ["<all_urls>"]},
    ['requestBody']
);
// chrome.webRequest.onBeforeSendHeaders.addListener(
//         function(details) {
//             console.log(details);
//             // if (details.url !== undefined && details.url.indexOf('facebook.com/composer/ocelot/async_loader') > -1) {
//             //     console.log(details);
//             //     //details holds all request information. 

//         //     // for (var i = 0; i < details.requestHeaders.length; ++i) {
//         //     //     //Find and change the particular header.
//         //     //     if (details.requestHeaders[i].name === 'Origin') {
//         //     //         details.requestHeaders[i].value ="https://www.facebook.com";
//         //     //         // break;
//         //     //     }
//         //     //     if (details.requestHeaders[i].name === 'Referer') {
//         //     //         details.requestHeaders[i].value ="https://www.facebook.com";
//         //     //     }
//         //     // }
//         //     // details.requestHeaders.push({name: "Referer", value: "https://www.facebook.com"})
//         // }
//         // return { requestHeaders: details.requestHeaders };
//     },
//     {urls: ["<all_urls>"]},
//     ['blocking', 'requestHeaders']
// );
'use strict';

const prefs = {
    'enabled': true,
    'overwrite-origin': true,
    'methods': ['GET', 'PUT', 'POST', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'],
    'remove-x-frame': true,
    'allow-credentials': true,
    'allow-headers-value': '*',
    'expose-headers-value': '*',
    'allow-headers': true
};

const cors = {};
cors.onHeadersReceived = ({
    responseHeaders
}) => {
    if (prefs['overwrite-origin'] === true) {
        const o = responseHeaders.find(({
            name
        }) => name.toLowerCase() === 'access-control-allow-origin');
        if (o) {
            o.value = '*';
        } else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Origin',
                'value': '*'
            });
        }
    }
    if (prefs.methods.length > 3) { // GET, POST, HEAD are mandatory
        const o = responseHeaders.find(({
            name
        }) => name.toLowerCase() === 'access-control-allow-methods');
        if (o) {
            o.value = prefs.methods.join(', ');
        } else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Methods',
                'value': prefs.methods.join(', ')
            });
        }
    }
    if (prefs['allow-credentials'] === true) {
        const o = responseHeaders.find(({
            name
        }) => name.toLowerCase() === 'access-control-allow-credentials');
        if (o) {
            o.value = 'true';
        } else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Credentials',
                'value': 'true'
            });
        }
    }
    if (prefs['allow-headers'] === true) {
        const o = responseHeaders.find(({
            name
        }) => name.toLowerCase() === 'access-control-allow-headers');
        if (o) {
            o.value = prefs['allow-headers-value'];
        } else {
            responseHeaders.push({
                'name': 'Access-Control-Allow-Headers',
                'value': prefs['allow-headers-value']
            });
        }
    }
    if (prefs['allow-headers'] === true) {
        const o = responseHeaders.find(({
            name
        }) => name.toLowerCase() === 'access-control-expose-headers');
        if (o) {
            o.value = prefs['expose-headers-value'];
        } else {
            responseHeaders.push({
                'name': 'Access-Control-Expose-Headers',
                'value': prefs['expose-headers-value']
            });
        }
    }
    if (prefs['remove-x-frame'] === true) {
        const i = responseHeaders.findIndex(({
            name
        }) => name.toLowerCase() === 'x-frame-options');
        if (i !== -1) {
            responseHeaders.splice(i, 1);
        }
    }
    return {
        responseHeaders
    };
};
cors.install = () => {
    const extra = ['blocking', 'responseHeaders'];
    if (/Firefox/.test(navigator.userAgent) === false) {
        extra.push('extraHeaders');
    }
    chrome.webRequest.onHeadersReceived.addListener(cors.onHeadersReceived, {
        urls: ['<all_urls>']
    }, extra);
};
cors.install()