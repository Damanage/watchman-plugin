declare interface UserOperation {
    
 start_date: Date;
 end_date: Date;

 load_size : number;

duration_client_ms: number;

duration_idle_ms: number;

 duration_loading_ms: number;

 duration_network_ms: number;

 duration_other_ms: number;

 duration_painting_ms: number;

 duration_rendering_ms: number;

 duration_scripting_ms: number;

 duration_total_ms: number;

 request_count : number;

 request_num_failed : number;

 request_num_from_cache : number;

 server_time:number;

 message_log: string;

 cpu_load : number;

 hdd_load : number;

 ram_load_value : number;

 ram_load_per : number;

    plugin_version: string;

    plugin_update_date: Date;

 timestamp : number;

 audio_handlers : number;

 documents : number;

 frames : number;

 js_event_listeners : number;

 layout_objects : number;

 media_key_sessions : number;

 media_keys : number;

 nodes : number;

 resources : number;

 script_promises : number;

 pausable_objects : number;

 v8_per_context_datas : number;

 worker_global_scopes : number;

 uacss_resources : number;

 layout_count : number;

 recalc_style_count : number;

 layout_duration : number;

 recalc_style_duration : number;

 script_duration : number;

 task_duration : number;

 js_heap_used_size : number;

 js_heap_total_size : number;

 first_meaningful_paint : number;

 dom_content_loaded : number;

 navigation_start : number;

    id: string;
}
