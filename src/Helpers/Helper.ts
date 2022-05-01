export function getNextID<T>(list:T[]) : number {
    return list?.length + 1 ?? 0
}