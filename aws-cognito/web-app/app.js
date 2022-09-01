var app = {

    auth: {
        /*URI: 'https://cop-arch-test.auth.sa-east-1.amazoncognito.com/login?response_type=code&client_id=4cbd5g1tjvk67hehd6rgvhtbaa&redirect_uri=http://localhost:8080/'*/
        URI: 'https://cop-arch-test.auth.sa-east-1.amazoncognito.com/login?response_type=token&client_id=4cbd5g1tjvk67hehd6rgvhtbaa&redirect_uri=http://localhost:8080/',
        token: ''
    },

    servicesURLs: {
        lambdaFunctionURI: 'https://vyiz7ebzy3.execute-api.sa-east-1.amazonaws.com/default/helloCognitoV1',
    },

    onLoad : function() {
        
        const queryString = window.location.hash;

        const urlParams = new URLSearchParams(queryString.substring(1));

        const token = urlParams.get('id_token');

        if (token == null) {
            window.location = this.auth.URI;
        }else{

            if(token != null) {

                app.auth.token = token;

                const data = this.parseToken(token);

                this.fillTable(data);
            }
        }
    },

    parseToken: function(token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    },

    fillTable: function(data) {

        var table = document.getElementById("tableUser").getElementsByTagName('tbody')[0];

        var row = table.insertRow(0);

        row.insertCell(0).innerHTML = data.name;
        row.insertCell(1).innerHTML = data.email;
        row.insertCell(2).innerHTML = data.phone_number;
    },

    logoff: function() {
        window.location = this.auth.URI;
    },

    callLambdaFunction() {
        this.sendGet(this.callLambdaFunction_onResult);
    },

    callLambdaFunction_onResult() {

        if (this.readyState === 4) {

            if (this.status === 200) {

                var resultObj = JSON.parse(this.response);

                if(resultObj.message !== undefined &&
                    resultObj.message !== null && resultObj.message.trim() !== '') {

                    alert(resultObj.message);
                }
            } else {

                alert('Erro. ' + this.statusText);
                console.log('Error', this.statusText);
            }
        }
    },

    sendGet: function(callBack) {

        var request = new XMLHttpRequest();

        request.open('GET', app.servicesURLs.lambdaFunctionURI, true);
        request.setRequestHeader('Authorization', 'Bearer ' + app.auth.token);
        request.onreadystatechange = callBack;

        request.send();
    }
}