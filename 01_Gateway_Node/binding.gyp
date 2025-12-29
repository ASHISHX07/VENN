{
    "targets": [
        {
            "target_name": "shm_bridge",
            "cflags!": [ "-fno-exceptions" ],
            "cflags-cc!": [ "-fno-exceptions" ],
            "sources": [ "bridge/shm-bridge.cpp" ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
                "C:/boost_1_90_0"
            ],
            "defines": [ "NAPI_DISABLE_CPP_EXCEPTIONS", "BOOST_DATE_TIME_NO_LIB" ],
            "msvc_settings": {
                "VCCLCompilerTool": { "ExceptionHandling": 1 }
            }
        }
    ]
}