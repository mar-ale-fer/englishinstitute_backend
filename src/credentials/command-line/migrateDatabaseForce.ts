import prompt from 'prompt';
import db from '../../../models';


const properties = [
    {
        name: 'confirm',
        validator: /^confirm$/,
        warning: 'enter "confirm" to create/ re-create db'
    },

];

prompt.start();

prompt.get(properties, async function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  confirm: ' + result.confirm);

    if (result.confirm === 'confirm') {
        // //migration mode
        //db.sequelize.sync({ match: /_dev$/ }).then(() => {
        db.sequelize.sync({ match: /institutedb$/, force: true }).then(() => {
                console.log(`DB initialized`);
        })        
    } else {
        console.log("Db wasn't initialized")
    }
});
function onErr(err : any) {
    console.log(err);
    return 1;
}
