import myaxios from './index'
export const req_reportDebt  = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/finance/assets/debt/sheet/customer/list',
        data,
        errfn
    });
}