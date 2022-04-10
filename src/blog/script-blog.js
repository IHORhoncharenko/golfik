import "./style-blog.css";

const scriptTags = document.getElementsByTagName('script');
const linkTags = document.getElementsByTagName('link');
const scriptArrSrcValue = getSrcValueScripts(scriptTags);
const linkArrHrefValue = getHrefValueLink(linkTags);
const scriptArrSrcValueSplit = createMultiArr(scriptArrSrcValue);
const linkArrHrefValueSplit = createMultiArr(linkArrHrefValue);
const scriptStrErr = findErrorStr(scriptArrSrcValueSplit, 'blog');
const linkStrErr = findErrorStr(linkArrHrefValueSplit, 'blog');

deleteErrorTag(scriptTags, scriptStrErr);
deleteErrorTag(linkTags, linkStrErr);


function getSrcValueScripts(script) {
    const arrValueSrc = [];
    for (let i = 0; i < script.length; i++) {
        arrValueSrc.push(script[i].attributes.src.value)
    }
    return arrValueSrc;
}

function getHrefValueLink(link) {
    const arrValueHref = [];
    for (let i = 0; i < link.length; i++) {
        if (link[i].attributes.rel.value === 'stylesheet') {
            arrValueHref.push(link[i].attributes.href.value)
        }
    }
    return arrValueHref;
}

function createMultiArr(arrValue) {
    const buff = [];
    for (let i = 0; i < arrValue.length; i++) {
        buff.push(arrValue[i].split('.'));
    }
    return buff;
}

function findErrorStr(arrSplit, target) {
    const vendorsValue = `vendors-node_modules_mini-css-extract-plugin_dist_hmr_hotModuleReplacement_js-node_modules_we-b3310a`;

    for (let i = 0; i < arrSplit.length; i++) {
        for (let k = 0; k < arrSplit[i].length; k++) {
            if (arrSplit[i][k] !== `${target}` && arrSplit[i][0] !== vendorsValue) {
                return arrSplit[i].join('.');

            }
        }
    }
}

function deleteErrorTag(arr, strTarget) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].localName === 'script') {
            if (arr[i].attributes.src.value === strTarget) {
                arr[i].remove();
            }
        } else if (arr[i].localName === 'link') {
            if (arr[i].attributes.href.value === strTarget) {
                arr[i].remove();
            }
        }
    }
}
