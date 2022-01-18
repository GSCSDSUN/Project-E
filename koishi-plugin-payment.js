const {User} = require("koishi-core");
const {getOrder, getRandomTradeNo, getPayment} = require("./utils/pay_utils");
module.exports.name = 'project-e-payment'
module.exports.apply = (ctx) => {
    ctx.command("project-e/payment","支付接口对接");
    ctx.command("project-e/payment/getPayment [type] [money] [name]","获取账单",{ authority : 4})
        .action((ctx,type,money,name) => cmdGetPayment(ctx,type,money,name));
    ctx.command("project-e/payment/getOrder [type:text]","获取订单",{ authority : 4})
        .action((ctx,out_trade_no) => getOrder(ctx,out_trade_no));
}
function cmdGetPayment(ctx,type,money,name) {

    if (type === "alipay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式:" + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("alipay",trade_no,money,name);
    } else if (type === "wxpay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式:" + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("wxpay",trade_no,money,name);
    } else if (type === "qqpay") {
        if ((money === undefined || name === undefined)) {
            return "[×] 金额或者商品名不能为空"
        }
        let trade_no = getRandomTradeNo();
        return "支付方式: " + type
            + "\n金额: " + money
            + "\n商品名:" + name
            + "\n订单号: " + trade_no
            + "\n付款链接:" + getPayment("qqpay",trade_no,money,name);
    } else return "[×] 支付方式错误 必须为 alipay wxpay qqpay";

}