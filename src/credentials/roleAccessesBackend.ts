import { roleType } from "../../types/roleType";
import { resource, userAllResources } from "./resourcesBackend";
import { levelAllResources } from "./resourcesBackend";
export let ROLE_ACCESSES = new Map<roleType,  resource[]>();

ROLE_ACCESSES.set('INSTITUTE',  [...levelAllResources, ...userAllResources])

ROLE_ACCESSES.set('ADMINISTRATOR',['LEVELS'])
ROLE_ACCESSES.set('SECRETARY',[])
ROLE_ACCESSES.set('STUDENT',[])
ROLE_ACCESSES.set('TEACHER',[])