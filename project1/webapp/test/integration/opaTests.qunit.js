/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require(["ns/project1/test/integration/AllJourneys"
	], function () {
		QUnit.start();
	});
});
