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

let dev = {
    INTERFACE: "http://mt.guoanfamily.com/handbook/",
    UPLOAD_IMAGE: `http://mt.guoanfamily.com/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `http://mt.guoanfamily.com/handbook/detailimgupload`,
    UPLOAD_FILE: `http://mt.guoanfamily.com/handbook/HbfileSave`,
    UPLOAD_TRIP: `http://mt.guoanfamily.com/handbook/ImportTrip`,
};

let test = {};

let prod = {
    INTERFACE: "http://mt.guoanfamily.com/handbook/",
    UPLOAD_IMAGE: `http://mt.guoanfamily.com/handbook/imgupload`,
    UPLOAD_EDITOR_IMAGE: `http://mt.guoanfamily.com/handbook/detailimgupload`,
    UPLOAD_FILE: `http://mt.guoanfamily.com/handbook/HbfileSave`,
    UPLOAD_TRIP: `http://mt.guoanfamily.com/handbook/ImportTrip`,
};

let config = dev;

if (isTest()) {
    config = test;
} else if (isPublish()) {
    config = prod;
}

config = Object.assign(config, def);
export {config}
