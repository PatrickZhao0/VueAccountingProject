import myaxios from './index'

export const req_consultants = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/crm/customer/list/consultant',
        data,
        errfn
    });
} 

export const req_tableData = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/crm/customer/finance/list',
        data,
        errfn
    });
}