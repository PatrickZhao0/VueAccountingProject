import myaxios from './index'
export const req_subjects = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/finance/subject/all`,
        data,
        errfn
    });
}

export const req_beanSetting = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/finance/subject/bean/setting/list`,
        data,
        errfn
    });
}

export const req_beanEnabledUpdate = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/finance/subject/bean/enable/update`,
        data,
        errfn
    }, 'json');
}

export const req_initialsSetting = function(data, errfn) {
    return myaxios({
        'url': `/i/tenant/finance/subject/bean/balance/setting/list`,
        data,
        errfn
    });
}