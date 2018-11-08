var cart = {}; //корзина


$.getJSON('goods1.json', function (data) {
    var goods = data; //все товары в массиве
    // console.log(goods);
    checkCart();
    //console.log(cart);
    showCart(); //вывожу товары на страницу

    function showCart() {
        if ($.isEmptyObject(cart)) {
            //корзина пуста
            var out = 'Корзина пуста. Добавьте товар в корзину ';
            $('#my-cart').html(out);
        }
        else {
            var out = '';
            for (var key in cart) {
                out += '<button class="delete" data-art="' + key + '" >x</button>';
                out += '<img src="' + goods[key].image + '" width="30" height="30">';
                out += goods[key].name;
                out += '   ';
                out += '<button class="minus" data-art="' + key + '">-</button>';
                out += '   ';
                out += cart[key];
                out += '   ';
                out += '<button class="plus" data-art="' + key + '">+</button>';
                out += '   ';
                out += cart[key] * goods[key].cost;
                out += '<br>';
            }
            $('#my-cart').html(out);
            $('.plus').on('click', plusGoods);
            $('.minus').on('click', minusGoods);
            $('.delete').on('click', deleteGoods);
        }
    }

    function plusGoods() {
        var articul = $(this).attr('data-art');
        cart[articul]++;
        saveCartToLS(); //сохраняю корзину в localStorage
        showCart();
    }

    function minusGoods() {
        var articul = $(this).attr('data-art');
        if (cart[articul] > 1) {
            cart[articul]--;
        }
        else {
            delete cart[articul];
        }
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }

    function deleteGoods() {
        var articul = $(this).attr('data-art');
        delete cart[articul];
        saveCartToLS();//сохраняю корзину в localStorage
        showCart();
    }


});

function checkCart() {
    //проверяю наличие корзины в localStorage;
    if (localStorage.getItem('cart') != null) {
        cart = JSON.parse(localStorage.getItem('cart'));
    }
}

function saveCartToLS() {
    localStorage.setItem('cart', JSON.stringify(cart));
}
function sendEmail() {
    var ename = $('#ename').val();
    var email = $('#email').val();
    var ephone = $('#ephone').val();
    if (ename!='' && email!='' && ephone!='') {
        if (isEmpty(cart)) {
            $.post(
                "core/mail.php",
                {
                    "ename" : ename,
                    "email" : email,
                    "ephone" : ephone,
                    "cart" : cart
                },
                function(data){
                    if (data==1) {
                        alert('Заказ отправлен');
                    }
                    else {
                        alert('Повторите заказ');
                    }
                }
            );
        }
        else {
            alert('Корзина пуста');
        }
    }
    else {
        alert('Заполните поля');
    }

}


$(document).ready(function () {
    loadCart();
    $('.send-email').on('click', sendEmail); // отправить письмо с заказом
});