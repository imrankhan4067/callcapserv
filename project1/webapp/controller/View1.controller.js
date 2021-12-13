sap.ui.define([
	"sap/ui/core/mvc/Controller"
],
	/**
	 * @param {typeof sap.ui.core.mvc.Controller} Controller
	 */
	function (Controller) {
		"use strict";

		return Controller.extend("ns.project1.controller.View1", {
			onInit: function () {
                debugger;

                var oModel = this.getOwnerComponent().getModel();
                var mParameters = {
                    success: function(oData,results){
                        debugger;
                        this.getOwnerComponent().getModel("device").setProperty("/Student",oData.results);

                    }.bind(this),
                    error: function(oError){
                        debugger;
                    }
                };

                oModel.read("/Student",mParameters);
                // var that = this;
                // that.oDataModel = this.getOwnerComponent().getModel();
                // var a = 26;
                // var obj = {
                //     "STDID": a,
                //     "name": "Adt",
                //     "gender": "Male",
                //     "title": null
                // };
                // var mParameters = {
                //     success: function(oData,response){
                //         debugger;
                //     },
                //     error: function(oError){
                //         debugger;
                //     }
                // }

                // that.oDataModel.create("/Student",obj,mParameters);

			},
            onSubmit: function(oEvent){
                var that = this;
                that.oDataModel = this.getOwnerComponent().getModel();
                that.oDataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
                that.oDataModel.setUseBatch(true);
                var aDeferredGroups = that.oDataModel.getDeferredGroups();
                aDeferredGroups = aDeferredGroups.concat(["exec"]);
                that.oDataModel.setDeferredGroups(aDeferredGroups);
                var arr = []
                var obj = {
                    "STDID": that.byId("no").getValue(),
                    "name": that.byId("name").getValue(),
                    "gender": that.byId("gender").getValue(),
                    "title": null
                };
                arr.push(obj);
                

                for(var i = 0; i < arr.length; i++){
                    that.oDataModel.create("/Student",arr[i],{
                        changeSetId: "exec",
                        groupId: "exec"
                    });
                }

                that.oDataModel.submitChanges({
                    success: function (oData, resp) {
                        debugger;
                    },
                    error: function(oError){
                        debugger;
                    }
            });
        },

        onSave: function(oEvent){
            debugger;

            var oModel = this.getOwnerComponent().getModel();
			oModel.setRefreshAfterChange(false);
			oModel.submitChanges({
				groupId: "changes",
				success: function (oData) {
                    debugger;
				}.bind(this),
				error: function (oError) {
					debugger;
				}.bind(this)
			}, this);
        }
		});
	});
