import myaxios from './index'
export const req_reportDebt  = function(data, errfn) {
    return myaxios({
        'url': '/i/tenant/finance/assets/debt/sheet/customer/list',
        data,
        errfn
    });
}

export const req_reportIncomeStatement = function(data, errfn) {
    return myaxios({
        'url': '/i/customer/finance/sheet/profit/list',
        data,
        errfn
    });
}

export const req_reportQuarterlyReport = function(data, errfn) {
    return myaxios({
        'url': '/i/customer/finance/sheet/quarterly/profit/report',
        data,
        errfn
    });
}

export const req_reportCashFlow = function(data, errfn) {
    return myaxios({
        'url': '/i/customer/finance/sheet/cash/flow/list',
        data,
        errfn
    });
}

