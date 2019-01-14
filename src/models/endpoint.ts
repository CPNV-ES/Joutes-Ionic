export class Endpoint {
    name: string
    address: string
    type: number

    static TYPE_CURRENT: number = 1
    static TYPE_OFFICIAL: number = 2
    static TYPE_MANUAL: number = 3

    constructor(name: string, address: string, type: number) {
        this.address = address
        this.name = name
        this.type = type
    }
}