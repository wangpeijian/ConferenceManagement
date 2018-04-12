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
    INTERFACE: "http://172.16.40.206:9091/",
    UPLOAD_IMAGE: `http://172.16.40.206:9091/imgupload`,
    UPLOAD_EDITOR_IMAGE: `http://172.16.40.206:9091/detailimgupload`,
    UPLOAD_FILE: `http://172.16.40.206:9091/HbfileSave`,
};

let test = {};

let prod = {};

let config = dev;

if (isTest()) {
    config = test;
} else if (isPublish()) {
    config = prod;
}

config = Object.assign(config, def);
export {config}
