{
	"targets": [{
		"target_name": "iohook",
		"win_delay_load_hook": "true",
		"type": "loadable_module",
		"sources": [
			"src/iohook.cc",
			"src/iohook.h"
		],
		"dependencies": [
			"./uiohook.gyp:uiohook"
		],
		"cflags": [
			"-fPIC",
			"-fexceptions"
		],
		"ccflags": [
			"-std=c++14",
			"-fPIC",
			"-fexceptions"
		],
		'cflags!': [
			'-fno-exceptions'
		],
		'cflags_cc!': [
			'-fno-exceptions'
		],
		"defines": [
			"USE_XKBCOMMON",
			"USE_EVDEV",
			"NAPI_CPP_EXCEPTIONS"
		],
		"link_settings": {
			"libraries": [
				"-Wl,-rpath,<!(node -e \"console.log('builds/' + process.env.gyp_iohook_runtime + '-v' + process.env.gyp_iohook_abi + '-' + process.env.gyp_iohook_platform + '-' + process.env.gyp_iohook_arch + '/build/Release')\")",
				"-Wl,-rpath,<!(pwd)/build/Release/"
			]
		},
		"include_dirs": [
			'<!(node -p "require(\'node-addon-api\').include_dir")',
			"libuiohook/include"
		],
		"configurations": {
			"Release": {}
		}
	}]
}
