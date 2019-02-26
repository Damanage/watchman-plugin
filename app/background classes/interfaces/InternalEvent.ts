import TrackOperation from "../TrackOperation"
import InternalEventTypeEn from "../variables/InternalEventTypeEn"
export default interface InternalEvent {
    EventType: InternalEventTypeEn;
    TabId: number;
    EventSubType?: string;  // such as "Network.requestWillBeSent"
    Request?: any;
    Response?: any;
    Param?: any;
    TrackOperation?: TrackOperation
}