export default function getJSESSION() {
    var cookie = document.cookie;

    var cookieInfo = {
        JSESSIONID: '',
        userId: ''
    }

    if(!cookie) return cookieInfo;

    var cookieList = cookie.split('; ');
    cookieList.forEach(function(value) {
        for(var i=0; i<cookieList.length; i++) {
            var cookieListTemp = value.split('=');
            if(cookieListTemp[0] === 'JSESSIONID') {
                cookieInfo.JSESSIONID = cookieListTemp[1];
            } else if (cookieListTemp[0] === 'userId') {
                cookieInfo.userId = cookieListTemp[1];
            }
        }
    });
    return cookieInfo;
}

