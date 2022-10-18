// Практическое задание

/* 1. Добавьте стили для верхнего меню, товара, списка товаров и кнопки вызова корзины.
2. Добавьте значения по умолчанию для аргументов функции. Как можно упростить или
сократить запись функций?
3. * Сейчас после каждого товара на странице выводится запятая. Из-за чего это происходит?
Как это исправить?
 */

// Решение:

// 1 и 2)

'use strict';

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];


const renderGoodsItem = (title = 'someGood', price = 0) =>
    `<div class="goods-item"><h3>${title}</h3><p>${price}</p></div>`;
;
const renderGoodsList = (list = goods) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    let productList = goodsList.join('');
    document.querySelector('.goods-list').innerHTML = productList;
}
renderGoodsList();


// 3)

/* По умолчанию элементы массива выводятся в строку через запятую. Данное свойство можно изменить, использовав метод массива .join() и указать то, 
что будет между элементами массива выводиться в строку вместо ',', в данном случае нужно указать пустую строку ''. 
*/
