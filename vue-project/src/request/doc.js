import myaxios from './index'
export const req_docs  = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/finance/voucher/range/list',
        data,
        errfn
    });
}
