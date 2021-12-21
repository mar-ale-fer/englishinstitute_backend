import { levelType } from "../../types/levelType";
export class LevelError extends Error {
    level : levelType
    constructor ( message: string, level : levelType) {
        super()
        this.message = message
        this.level = level
    }
}