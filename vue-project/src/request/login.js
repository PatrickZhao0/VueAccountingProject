import myaxios from './index'

export const req_login = function(data, errfn) {
    return myaxios({
        'url': '/login',
        data,
        errfn
    });
}

export const req_pwdReset = function(data, errfn) {
    return myaxios({
        'url': '/user/password/reset',
        data,
        errfn
    });
}
