export function addClass(el,className) {
    
    if (hasClass(el,className)) return;

    var newClass = el.className.split(' ');

    newClass.push(className);
    el.className = newClass.join(' ');
    // 添加 slider-item 的 class

}

export function hasClass(el, className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}

export function getDataSet (el,name,val) {

    const prefix = 'data-';
    name = prefix + name;

    if (val) {
        return el.setAttribute(name,val);
    }else {
        return el.getAttribute(name);
    }

}

var elementStyle = document.createElement('div').style;

var vendor = (() => {
    var transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'Otransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (let key in transformNames) {
        if (elementStyle[key] !== undefined) {
        return key;
        }
    }

    return false;

})()

export function prefixStyle (style) {
    if (vendor === false) return false;

    if (vendor === 'standard') {
        return style;
    }

    return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}