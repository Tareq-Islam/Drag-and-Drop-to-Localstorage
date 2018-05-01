$(document).ready(function () {
    showProduct(item); // To load loaclstorage data
    jQuery.event.props.push('dataTransfer');
    $('#productList').on('dragstart', dragging);
    $('#dropZone').on('dragover', enterDropZone);
    $('#dropZone').on('dragleave', leaveDropZone);
    $('#dropZone').on('dragover', preventDefault);
    $('#dropZone').on('drop', dropItem);
    $('#clearList').on('click', clearBazarList);
    $('#reload').on('click', reloadBrowser);
});
// To set data to dataTransfer when start dragging
function dragging(e) {
    var val = e.target.getAttribute('data-value');
    e.dataTransfer.setData('text', val);
    e.dataTransfer.effectAllowed = 'copy';
}
// To add class when enter drop zone
function enterDropZone(e) {
    $('#dropZone').addClass('dropZoneOver');
}
// To remove class when leave drop zone
function leaveDropZone(e) {
    $('#dropZone').removeClass('dropZoneOver');
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
    $('#dropZone').removeClass('dropZoneOver');

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
