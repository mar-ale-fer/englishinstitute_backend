import { roleType } from "../../types/roleType";
import { resource, studentAllResources, userAllResources, userOwnResources } from "./resourcesBackend";
import { levelAllResources } from "./resourcesBackend";
export let ROLE_ACCESSES = new Map<roleType, resource[]>();

ROLE_ACCESSES.set('INSTITUTE', [...userOwnResources, ...levelAllResources, ...userAllResources])

ROLE_ACCESSES.set('ADMINISTRATOR', [...userOwnResources, 'LEVELS'])
ROLE_ACCESSES.set('SECRETARY', [...userOwnResources, ...levelAllResources, ...studentAllResources])
ROLE_ACCESSES.set('STUDENT', [...userOwnResources])
ROLE_ACCESSES.set('TEACHER', [...userOwnResources])