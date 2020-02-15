import createStatementData from './createStatementData.js';

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data, plays) {
    let result = `Счет для ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}:${RUB(perf.amount)}  (${perf.audience}seats)\n`;
    }
    result += `Итого с вас ${RUB(data.totalAmount)}\n`;
    result += `Вы заработали ${data.totalVolumeCredits} бонусов\n`;
    return result;
}

function statementHTML(invoice, plays) {
    return renderHTML(createStatementData(invoice, plays));
}


function renderHTML(data) {
    let result = `<h1>Счет для ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>Пьеса</th><th>Места</th><th>Стоимость</th></tr>";
    for (let perf of data.performances) {
        result += ` <tr><td>${perf.play.name} </td><td> ${perf.audience}</td>`;
        result += `<td> ${RUB(perf.amount)}</td></tr>\n`;

    }
    result += "</table>\n";
    result += `Итого с вас ${RUB(data.totalAmount)}\n`;
    result += `Вы заработали ${data.totalVolumeCredits} бонусов\n`;
    return result;
}

function RUB(_number) {
    return new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2
    }).format(_number / 100);
}