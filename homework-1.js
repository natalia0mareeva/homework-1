const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = q => new Promise(res => rl.question(q, res));

function printSteps(height) {
    let built = 0;
    for (let i = 1; i <= height; i++) {
        if (i === 4) continue;          // ступень 4 не строят
        console.log(`Ступень ${i}`);
        built++;
        if (i === 10) {                 // после 10-й — стоп
            console.log('Дальше лестница не построена');
            break;
        }
    }
    console.log(`Всего построено: ${built}`);
}

function ticketPrice(category) {
    switch (category) {
        case 1: return 300;
        case 2: return 500;
        case 3: return 900;
        default: return 0;
    }
}

function maxTickets(budget, price) {
    if (price <= 0) return 0;
    let count = 0;
    let rest = budget;
    while (rest >= price) {
        rest -= price;
        count++;
    }
    return count;
}

function printTicketResult(category, budget) {
    const price = ticketPrice(category);
    if (price === 0) {
        console.log('неизвестная категория');
        return;
    }
    const n = maxTickets(budget, price);
    console.log(`Категория ${category}, билет ${price} руб., бюджет ${budget} руб.: можно купить ${n} шт.`);
}

function deliveryPrice(distance, total) {
    if (total >= 3000) return 0;
    if (distance <= 3) return 0;
    if (distance <= 10) return 200;
    return 200 + 25 * (distance - 10);
}

function printDelivery(distance, total) {
    const price = deliveryPrice(distance, total);
    console.log(`Расстояние ${distance} км, заказ ${total} руб.: доставка ${price} руб.`);
}

async function main() {
    console.log('Выберите задачу:');
    console.log('1 — билетная касса');
    console.log('2 — доставка заказа');
    console.log('3 — лестница');

    const choice = parseInt((await ask('Ваш выбор: ')).trim());

    if (choice === 1) {
        const category = parseInt((await ask('Категория билета: ')).trim());
        const budget = parseInt((await ask('Бюджет: ')).trim());
        printTicketResult(category, budget);
    } else if (choice === 2) {
        const distance = parseFloat((await ask('Расстояние: ')).trim());
        const total = parseFloat((await ask('Сумма заказа: ')).trim());
        printDelivery(distance, total);
    } else if (choice === 3) {
        const height = parseInt((await ask('Высота лестницы: ')).trim());
        printSteps(height);
    } else {
        console.log('такой задачи нет');
    }

    rl.close();
}

main();