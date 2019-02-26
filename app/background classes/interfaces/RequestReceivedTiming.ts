//--- debug networkEvent.responseReceived.timing
export default interface RequestReceivedTiming {
    connectStart: number;//Started connecting to the remote host.
    connectEnd: number;//Connected to the remote host.
    dnsStart: number;//Started DNS address resolve.
    dnsEnd: number;//Finished DNS address resolve.
    proxyEnd: number;
    proxyStart: number;
    pushEnd: number;
    pushStart: number;
    receiveHeadersEnd: number;//Finished receiving response headers.
    requestTime: number;//Timing's requestTime is a baseline in seconds, while the other numbers are ticks in milliseconds relatively to this requestTime.
    sendEnd: number;//Finished sending request.
    sendStart: number;//Started sending request.
    sslEnd: number;//Finished SSL handshake.
    sslStart: number;//Started SSL handshake.
    workerReady: number;
    workerStart: number;
    //wait: timing.receiveHeadersEnd - timing.sendEnd
}