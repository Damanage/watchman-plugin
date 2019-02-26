import Metrics from "../interfaces/Metrics"
// Convert arr: {metrics: {name:string, value:number} }
export default function MetricsToObj(arr: { metrics: { name: string, value: number }[] }): Metrics {
    let o: any = {};
    if (!arr) return;
    for (var it of (arr.metrics || [])) {
        o[it.name] = Number(it.value);
    }
    return o;
}