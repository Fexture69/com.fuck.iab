cmake_minimum_required(VERSION 3.22)

project(nativehook LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Default to Release if nothing was specified
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

set(SIZE_FLAGS "-Oz -DNDEBUG -ffunction-sections -fdata-sections -fvisibility=hidden -flto")
set(CMAKE_C_FLAGS_RELEASE   "${SIZE_FLAGS}")
set(CMAKE_CXX_FLAGS_RELEASE "${SIZE_FLAGS} -fvisibility-inlines-hidden -fno-exceptions -fno-rtti")

add_library(nativehook SHARED native_hook.cpp)

target_include_directories(nativehook PRIVATE ${CMAKE_SOURCE_DIR}/../libs/${ANDROID_ABI})

add_library(frida-gumjs STATIC IMPORTED)
set_target_properties(frida-gumjs PROPERTIES
        IMPORTED_LOCATION ${CMAKE_SOURCE_DIR}/../libs/${ANDROID_ABI}/libfrida-gumjs.a
)

target_link_libraries(nativehook frida-gumjs log dl m)

target_link_options(nativehook PRIVATE
        -flto
        -Wl,--gc-sections
        -Wl,--as-needed
        -Wl,--strip-all
        -Wl,--exclude-libs,ALL
        -Wl,--icf=all
        -Wl,--build-id=none
)