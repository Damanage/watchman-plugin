import BrowserEventTypeEn from "../background classes/variables/BrowserEventTypeEn"

export default class BrowserEvent {
    constructor(public eventType: BrowserEventTypeEn, public eventParam?: any) { }
}