import myaxios from './index'
export const req_menu = function(data, errfn) {
    
    return myaxios({
        'url': '/i/tenant/system/menu/config/list',
        data,
        errfn
    });
}