/**
 * 项目配置信息
 */
const isPublish = () => {
    return window.location.host.indexOf("guoanfamily.com") !== -1;
};

const isTest = () => {
    return window.location.host.indexOf("rtest.guoanfamily.com") !== -1 || window.location.host.indexOf("rt.guoanfamily.com") !== -1;
};

let def = {};

const domain = `mt.guoanfamily.com`;
let dev = {
    INTERFACE: `http://${domain}/handbook/`,
    UPLOAD_IMAGE: `http://${domain}/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `http://${domain}/handbook/detailimgupload`,
    UPLOAD_FILE: `http://${domain}/handbook/HbfileSave`,
    UPLOAD_TRIP: `http://${domain}/handbook/ImportTrip`,
    SOCKET: `ws://${domain}/handbook/`
};

let test = {};

let prod = {
    INTERFACE: `http://${domain}/handbook/`,
    UPLOAD_IMAGE: `http://${domain}/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `http://${domain}/handbook/detailimgupload`,
    UPLOAD_FILE: `http://${domain}/handbook/HbfileSave`,
    UPLOAD_TRIP: `http://${domain}/handbook/ImportTrip`,
    SOCKET: `ws://${domain}/handbook/`
};

let config = dev;

if (isTest()) {
    config = test;
} else if (isPublish()) {
    config = prod;
}

config = Object.assign(config, def);
export {config}
