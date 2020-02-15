export default function createStatementData(invoice, plays) {
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(addPerformance);
    result.totalAmount = totalAmount(result);
    result.totalVolumeCredits = totalVolumeCredits(result);
    return result;


    function addPerformance(_performance) {
        const result = Object.assign({}, _performance);
        result.play = playFor(result);
        result.amount = amountFor(result)
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(_performance) {
        return plays[_performance.playID];
    }

    function amountFor(_performance) {
        let result = 0;
        switch (_performance.play.type) {
            case "tragedy":
                thisAmount = 40000;
                if (_performance.audience > 30) {
                    result += 1000 * (_performance.audience - 30);
                }
                break;
            case "comedy":
                result = 30000;
                if (_performance.audience > 20) {
                    result += 10000 + 500 * (_performance.audience - 20);
                }
                result += 300 * _performance.audience;
                break;
            default:
                throw new Error(`неизвестный тип: ${_performance.play.type}`);
        }
        return result;
    }

    function volumeCreditsFor(_performance) {
        let result = 0;
        result += Math.max(_performance.audience - 30, 0);
        if ("comedy" === _performance.play.type) result += Math.floor(_performance.audience / 5);
        return result;

    }

    function totalAmount(data) {
        return data.performances
            .reduce((total, p) => total + p.amount, 0)

    }

    function totalVolumeCredits(data) {
        return data.performances
            .reduce((total, p) => total + p.volumeCredits, 0)
    }
}