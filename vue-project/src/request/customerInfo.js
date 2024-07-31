import myaxios from './index'

export const req_cusSOBsetting = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/crm/customer/book/account/set`,
        'data': {
            'customerId': data,
            'currentPeriod': ''
        },
        errfn
    });
}

export const req_cusNameId = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/crm/customer/has/book/list`,
        data,
        errfn
    });
}

export const req_cusInfoSimp = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/crm/customer/info/management/${data}`,
        'data': null,
        errfn
    });
}

export const req_cusAvailPeriods = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/user/period/list`,
        'data': {
            'customerId': data
        },
        errfn
    });
}

export const req_cusDdl = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/finance/tax/work/time/deadline`,
        'data': {
            'customerId': data
        },
        errfn
    });
}

export const req_cusDictionary = function(data, errfn){
    return myaxios({
        'url': `/i/tenant/crm/customer/info/management/dictionary`,
        data,
        errfn
    });
}