import prompt from 'prompt';
import { userType } from '../types/userType';
import { instituteType } from '../types/instituteType';
import { insertUser } from '../model-utils/insertUser';
import { insertInstitute } from '../model-utils/insertInstitute';


const properties = [
    {
        name: 'instituteName',
        validator: /^[a-zA-Z\s\-]+$/,
        warning: 'Institute name must be only letters, spaces, or dashes'
    },
    {
        name: 'userCode',
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

prompt.get(properties, async function (err, result) {
    if (err) { return onErr(err); }
    console.log('Command-line input received:');
    console.log('  Institute name: ' + result.instituteName);    
    console.log('  Code: ' + result.userCode);
    console.log('  First name: ' + result.firstName);
    console.log('  Last name: ' + result.lastName);
    console.log('  Email: ' + result.email);    
    console.log('  Password: *****' );

    const newInstitute : instituteType = {
        id : null,
        name : result.instituteName as string

    }

    const InstituteId : number = await insertInstitute(newInstitute)

    const newUser : userType = {
        id: null,
        code: result.userCode as string,
        firstName: result.firstName as string,
        lastName: result.lastName as string,
        email: result.email as string,
        backend: true,
        password: result.password as string,
        roles: "[]",
        InstituteId: InstituteId
    }
    insertUser(newUser)

});
function onErr(err : any) {
    console.log(err);
    return 1;
}
