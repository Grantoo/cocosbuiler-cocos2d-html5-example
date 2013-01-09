/* http://www.grantoo.org
 *
 * Copyright (c) 2013 Grantoo, LLC. All rights reserved.
 *
 */

var MainMenuScene = cc.Layer.extend({

    ctor:function () {
        this._super();
        cc.log("MainMenu Scene ctor");
    },

    onEnter:function () {
        this._super();
        cc.log("MainMenu Scene onEnter");
    },

    onResolveCCBCCMenuItemSelector:function (target, selectorName) {

        if (target == this && selectorName == "goPlay") {
            return this.goPlay;
        }

        return null;
    },

    goPlay:function() {
        cc.log("goPlay");
        var scene = cc.BuilderReader.loadAsScene(getResourceCCB('GameScene'));
        cc.Director.getInstance().replaceScene(scene);
    }
});


var MainMenuSceneLoader = cc.LayerLoader.extend({

    loadCCNode:function (parent, ccbReader) {
        cc.log("MainMenu Scene Loader create node");
        return new MainMenuScene();
    }

});

MainMenuSceneLoader.loader = function () {
    return new MainMenuSceneLoader();
};