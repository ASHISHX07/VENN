cmake_minimum_required(VERSION 3.10)
project(shm_bridge)

# 1. Enforce C++20
set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# 2. Definitions
add_definitions(-DNAPI_DISABLE_CPP_EXCEPTIONS)
add_definitions(-DBOOST_DATE_TIME_NO_LIB)

# 3. Sources
file(GLOB SOURCE_FILES "bridge/*.cpp")

# 4. Create Library
add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES})

# 5. INCLUDE PATHS (The Fix)
# We must include:
# A. ${CMAKE_JS_INC}  -> The Node.js headers (fixes node_api.h error)
# B. node-addon-api   -> The wrapper headers
# C. Boost            -> Your shared memory library
target_include_directories(${PROJECT_NAME} PRIVATE 
    ${CMAKE_JS_INC}
    "${CMAKE_CURRENT_SOURCE_DIR}/node_modules/node-addon-api"
    "D:/boost_1_90_0"
)

# 6. LINK LIBRARIES (This is the FIX)
# We must link against 'node.lib' (provided by cmake-js variable CMAKE_JS_LIB)
target_link_libraries(${PROJECT_NAME} PRIVATE ${CMAKE_JS_LIB})

# 7. Output Settings
set_target_properties(${PROJECT_NAME} PROPERTIES 
                      PREFIX "" 
                      SUFFIX ".node")

if(MSVC)
    target_compile_options(${PROJECT_NAME} PRIVATE /EHsc)
endif()