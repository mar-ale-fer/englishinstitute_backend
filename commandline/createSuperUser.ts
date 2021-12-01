import prompt from 'prompt';
import { insertUser } from '../model-utils/insertUser';
import { userType } from '../types/userType';

const properties = [
    {
        name: 'instituteName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Institute name must be only letters, spaces, or dashes'
    },
    {
        name: 'code',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Code must be only letters, spaces, or dashes'
    },    
    {
        name: 'firstName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'First name must be only letters, spaces, or dashes'
    },
    {
        name: 'lastName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Last name must be only letters, spaces, or dashes'
    },    
    {
        name: 'email',
        validator: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        warning: 'Incorrect email format'
    },   
    {
        name: 'password',
        hidden: true
    },    
];

prompt.start();

prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Institute name: ' + result.instituteName);    
    console.log('  Code: ' + result.code);
    console.log('  First name: ' + result.firstName);
    console.log('  Last name: ' + result.lastName);
    console.log('  Email: ' + result.email);    
    console.log('  Password: *****' );

    const newUser : userType = {
        id: 0,
        code: result.code as string,
        firstName: result.firstName as string,
        lastName: result.lastName as string,
        email: result.email as string,
        backend: true,
        password: result.password as string,
        roles: "[]"
    }

    insertUser(newUser)

});
function onErr(err : any) {
    console.log(err);
    return 1;
}
