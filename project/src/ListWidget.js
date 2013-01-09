/* http://www.grantoo.org
 *
 * Copyright (c) 2013 Grantoo, LLC. All rights reserved.
 *
 */

var ListWidget = cc.Node.extend({

    listText:null,

    ctor:function () {
        this._super();
        cc.log("ListWidget ctor");
    },

    onResolveCCBCCMenuItemSelector:function (target, selectorName) {

        if (target == this && selectorName == "goPress") {
            return this.goPress;
        }

        return null;
    },

    onAssignCCBMemberVariable:function(target, memberVarAssignmentName, node) {

        if (target == this && memberVarAssignmentName == 'ListText') {
            this.listText = node;
            return true;
        }

        return false;
    },

    goPress:function() {
        cc.log("Widget " + this.listText.getString() + " Pressed");
    }

});


var ListWidgetLoader = cc.NodeLoader.extend({

    loadCCNode:function (parent, ccbReader) {
        cc.log("ListWidget Loader create node");
        return new ListWidget();
    }

});

ListWidgetLoader.loader = function () {
    return new ListWidgetLoader();
};