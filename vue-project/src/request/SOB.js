import myaxios from './index'
export const req_submitSOBCreation = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/crm/customer/book/account/add',
        data,
        errfn
    }, 'json');
}