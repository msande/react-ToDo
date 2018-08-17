
export class IErrorContent {
    error;
    error_description;
    key;
}

export class IRestResponse {
    is_error;
    error_content;
    content;
};

export class IAuthResponse {
    token;
}

export class HttpService {

    //static get<T>(url: string): Promise<IRestResponse<T>> {
    //    return HttpService.request<T>('GET', url);
    //}

    static post(url, data) {
        return HttpService.request('POST', url, data);
    }

    static request(method, url, data) {
        
        let isJsonResponse = false;
        let isBadRequest = false;
        let body = data;
        let headers = new Headers();

        if (sessionStorage.getItem('JWT')) {
            headers.set('Authorization', `Bearer ${sessionStorage.getItem('JWT')}`);
        }

        headers.set('Accept', 'application/json');

        if (data) {
            if ((typeof data === 'object')) {
                headers.set('Content-Type', 'application/json');
                body = JSON.stringify(data);
            } else {
                headers.set('Content-Type', 'application/x-www-form-urlencoded');
            }
        }


        return fetch(url, {
            method: method,
            headers: headers,
            body: body
        }).then((response) => {
            
            if (response.status == 401) {
                // Unauthorized; redirect to sign-in
                sessionStorage.removeItem('JWT');
                window.location.href = `/?expired=1`;
            }

            isBadRequest = (response.status == 400);

            let responseContentType = response.headers.get("content-type");
            if (responseContentType && responseContentType.indexOf("application/json") !== -1) {
                isJsonResponse = true;
                return response.json();
            } else {
                return response.text();
            }
            //debugger;
        }).then((responseContent) => {
            let response = {
                is_error: isBadRequest,
                error_content: isBadRequest ? responseContent : null,
                content: isBadRequest ? null : responseContent
            };
            //debugger;
            return response;
        });
    }
}