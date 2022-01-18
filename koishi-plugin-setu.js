const {getSetu} = require("./utils/setu_utils");
module.exports.name = 'project-e-setu'
module.exports.apply = (ctx) => {
    ctx.command("project-e/setu ")
        .alias('涩图')
        .alias('色图')
        .action(() => getSetu(false));
}
