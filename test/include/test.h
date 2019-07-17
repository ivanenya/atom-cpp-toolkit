

#pragma once

namespace mmbizuvstat
{
enum MMBizUVStatCommOSS
{
    OSS_COMM_ID = 112765,
    OSS_COMM_KEY_AGENT_START = 1,
    OSS_COMM_KEY_AGENT_STOP = 2,
    OSS_COMM_KEY_AGENT_SIG_STOP = 3,
    OSS_COMM_KEY_AGENT_COREDUMP = 4,
    OSS_COMM_KEY_AGENT_INIT_FAILED = 5,
    OSS_COMM_KEY_AGENT_CHILD_RUN_FAIL = 6,

};

enum MMBizUVStatOss
{
    /// busi 1  112764
// svr
    OSS_KEY_POOL_INC_TOTAL               =  11,
    OSS_KEY_POOL_INC_SUCC                =  12,
    OSS_KEY_POOL_INC_FAIL                =  13,

    OSS_KEY_BF_INSERT_TOTAL              =  21,
    OSS_KEY_BF_INSERT_SUCC               =  22,
    OSS_KEY_BF_INSERT_FAIL               =  23,

    OSS_KEY_BF_QUERY_TOTAL               =  24,
    OSS_KEY_BF_QUERY_SUCC                =  25,
    OSS_KEY_BF_QUERY_FAIL                =  26,
    OSS_KEY_BF_QUERY_CONTAIN             =  27,
    OSS_KEY_BF_QUERY_NOT_CONTAIN         =  28,


    // cache
    OSS_KEY_CACHE_GET_TOTAL              =  31,
    OSS_KEY_CACHE_GET_FAIL               =  32,
    OSS_KEY_CACHE_GET_EMPTY              =  33,
    OSS_KEY_CACHE_GET_SUCC               =  34,
    OSS_KEY_CACHE_GET_HIT_RATE           =  35,

    OSS_KEY_CACHE_SET_TOTAL              =  36,
    OSS_KEY_CACHE_SET_SUCC               =  37,
    OSS_KEY_CACHE_SET_FAIL               =  38,
    OSS_KEY_CACHE_SET_CONFLICT           =  39,

    // kv
    OSS_KEY_KV_GET_TOTAL                 =  41,
    OSS_KEY_KV_GET_FAIL                  =  42,
    OSS_KEY_KV_GET_EMPTY                 =  43,
    OSS_KEY_KV_GET_SUCC                  =  44,

    OSS_KEY_KV_SET_TOTAL                 =  46,
    OSS_KEY_KV_SET_SUCC                  =  47,
    OSS_KEY_KV_SET_FAIL                  =  48,
    OSS_KEY_KV_SET_CONFLICT              =  49,

    // agent
    //
    //
    OSS_KEY_POOL_CLEAR_OLD               =  51,
    OSS_KEY_POOL_SWITCH_INDEX            =  52,

    OSS_KEY_POOL_TRAVERSE_CALLBACK_TOTAL =  53,
    OSS_KEY_POOL_TRAVERSE_CALLBACK_FAIL  =  54,
    OSS_KEY_POOL_TRAVERSE_CALLBACK_SUCC  =  55,

    // idc merge mq

    OSS_KEY_MQ_IDC_MERGE_ENQUEUE_TOTAL   =  61,
    OSS_KEY_MQ_IDC_MERGE_ENQUEUE_SUCC    =  62,
    OSS_KEY_MQ_IDC_MERGE_ENQUEUE_FAIL    =  63,


    // idc merge shm queue

    OSS_KEY_IDC_SHMQUEUE_PUT_TOTAL       =  66,
    OSS_KEY_IDC_SHMQUEUE_PUT_SUCC        =  67,
    OSS_KEY_IDC_SHMQUEUE_PUT_FAIL        =  68,

    OSS_KEY_IDC_SHMQUEUE_GET_TOTAL       =  69,
    OSS_KEY_IDC_SHMQUEUE_GET_SUCC        =  70,
    OSS_KEY_IDC_SHMQUEUE_GET_FAIL        =  71,
    OSS_KEY_IDC_PKG_SIZE                 =  72,
    OSS_KEY_IDC_SHMQUEUE_USAGE           =  73,

    // idc queue
    OSS_KEY_IDCQUEUE_ENQUEUE_TOTAL       =  81,
    OSS_KEY_IDCQUEUE_ENQUEUE_SUCC        =  82,
    OSS_KEY_IDCQUEUE_ENQUEUE_FAIL        =  83,

    OSS_KEY_MQ_KV_MERGE_ENQUEUE_TOTAL    =  84,
    OSS_KEY_MQ_KV_MERGE_ENQUEUE_SUCC     =  85,
    OSS_KEY_MQ_KV_MERGE_ENQUEUE_FAIL     =  86,

    OSS_KEY_ASYNC_MODIFY_TOTAL           =  91,
    OSS_KEY_ASYNC_MODIFY_FAIL            =  92,
    OSS_KEY_ASYNC_MODIFY_SUCC            =  93,

    OSS_KEY_ASYNC_COVER_SET_TOTAL        =  96,
    OSS_KEY_ASYNC_COVER_SET_SUCC         =  97,
    OSS_KEY_ASYNC_COVER_SET_FAIL         =  98,
    OSS_KEY_ASYNC_COVER_SET_TOTAL_COUNT  =  99,
    OSS_KEY_ASYNC_COVER_SET_SUCC_COUNT   =  100,
    OSS_KEY_ASYNC_COVER_SET_FAIL_COUNT   =  101,

    int GetStat( uint32_t busi_type, const std::string &key, mmbizuvstat::UVStatInfo *info, uint64_t *piVersion );
    int SetStat( uint32_t busi_type, const std::string &key, const mmbizuvstat::UVStatInfo &info, uint64_t iVersion );

    a =  b;
    c += x;
    if ( a &= b ) a =
    {

    }
    int a = 1;
    int b = 2;

// for agent
// for worker
};

}
