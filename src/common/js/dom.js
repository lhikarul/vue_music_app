export function addClass (el,className) {
    if (hasClass(el, className)) return;

    var newClass = el.className.split(' ');
    newClass.push(className);

    el.className = newClass.join(' ');

}

export function hasClass(el,className) {
    var reg = new RegExp('(^|\\s)' + className + '(\\s|$)');
    return reg.test(el.className);
}