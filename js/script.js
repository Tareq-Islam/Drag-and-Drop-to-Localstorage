window.onload = function() {
    showProduct(item);
};

function bindFunc(event, id, func) {
    var element = document.getElementById(id);
    return element.addEventListener(event, func, false);
}

bindFunc('dragstart', 'productList', dragging);
bindFunc('dragover', 'dropZone', enterDropZone);
bindFunc('dragleave', 'dropZone', leaveDropZone);
bindFunc('dragover', 'dropZone', preventDefault);
bindFunc('drop', 'dropZone', dropItem);
bindFunc('click', 'clearList', clearBazarList);
bindFunc('click', 'reload', reloadBrowser);


// To set data to dataTransfer when start dragging
function dragging(e) {
    var val = e.target.getAttribute('data-value');
    e.dataTransfer.setData('text', val);
    e.dataTransfer.effectAllowed = 'copy';
}
// To add class when enter drop zone
function enterDropZone(e) {
    var element = document.getElementById('dropZone');
    element.classList.add('dropZoneOver');
    e.preventDefault();
}
// To remove class when leave drop zone
function leaveDropZone(e) {
    var element = document.getElementById('dropZone');
    element.classList.remove('dropZoneOver');
    e.preventDefault();
}
// To prevent default
function preventDefault(e) {
    e.preventDefault();
}
// Define global localstorage variabe
if (localStorage.getItem('item') === null) {
    var item = [];
} else {
    var item = JSON.parse(localStorage.getItem('item'));
}
// To grab droped item and insert into localstorage
function dropItem(e) {
    e.preventDefault();
    var element = document.getElementById('dropZone');
    element.classList.remove('dropZoneOver');

    var data = e.dataTransfer.getData('text');

    if (localStorage.getItem('item') === null) {
        item.push(data);
        localStorage.setItem('item', JSON.stringify(item));
    } else {
        item.push(data);
        localStorage.setItem('item', JSON.stringify(item));
    }
    showProduct(item);
}
// To show product name in bazar list
function showProduct(product) {
    var allProducts = '';
    product.map(function(item) {
        allProducts += '<li>' + item + '</li>';
    });

    document.getElementById('dropZone').innerHTML = allProducts;
}
// To clear bazar list
function clearBazarList(item) {
    localStorage.clear();
    location.reload();
}
// To reload browser button
function reloadBrowser() {
    location.reload();
}
