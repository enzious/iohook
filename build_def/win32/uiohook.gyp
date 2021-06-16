{
	"targets": [{
		"target_name": "uiohook",
		"type": "shared_library",
		"sources": [
			"libuiohook/include/uiohook.h",
			"libuiohook/src/logger.c",
			"libuiohook/src/logger.h",
			"libuiohook/src/windows/input_helper.h",
			"libuiohook/src/windows/input_helper.c",
			"libuiohook/src/windows/input_hook.c",
			"libuiohook/src/windows/post_event.c",
			"libuiohook/src/windows/system_properties.c"
		],
		"link_settings": {
			"libraries": [
				"-l dinput8",
				"-l dxguid",
				"-l ../glib/_build/glib/glib-2.0.lib",
				# "-l Ws2_32",
				# "-l winmm"
				# "-l intl"
			]
		},
		"copies": [
			{
				"destination": "<(module_root_dir)/build/Release/",
				"files": [
					"glib/_build/glib/glib-2.0-0.dll",
					"glib/_build/subprojects/proxy-libintl/intl.dll"
				]
			}
		],
		"include_dirs": [
			'node_modules/nan',
			'libuiohook/include',
			'libuiohook/src',
			'glib',
			'glib/glib',
			'glib/_build/glib'
		]
	}]
}
