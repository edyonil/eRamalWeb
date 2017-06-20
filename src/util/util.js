export default class Util
{
    static uri = 'http://agencia7bahia.com:8080/';

    static mountHeader()
    {
        let token = localStorage.getItem('token');
        
        let header = new Headers();
        
        //header.append('Content-Type', 'application/x-www-form-urlencoded');
        header.append('Content-Type', 'application/json');
        
        if (token) {
            header.append('Authorization', 'Bearer ' + token);
        }

        return header;
    }

    static getUri()
    {
        return Util.uri;
    }
}