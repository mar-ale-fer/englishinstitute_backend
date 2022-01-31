import { roleType } from "../../types/roleType";
import { resource, userAllResources, userOwnResources } from "./resourcesBackend";
import { levelAllResources } from "./resourcesBackend";
export let ROLE_ACCESSES = new Map<roleType,  resource[]>();

ROLE_ACCESSES.set('INSTITUTE',  [...userOwnResources,...levelAllResources, ...userAllResources])

ROLE_ACCESSES.set('ADMINISTRATOR',[...userOwnResources,'LEVELS'])
ROLE_ACCESSES.set('SECRETARY', [...userOwnResources,...levelAllResources])
ROLE_ACCESSES.set('STUDENT',[])
ROLE_ACCESSES.set('TEACHER',[])