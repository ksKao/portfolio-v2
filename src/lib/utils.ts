export function ensureObject<T extends object>(data: string | T) {
    if (typeof data !== "object") {
        throw new Error(`Invalid data type. Expected object, but got ${typeof data}`)
    }
    
    return data;
}