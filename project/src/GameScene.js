/* http://www.grantoo.org
 *
 * Copyright (c) 2013 Grantoo, LLC. All rights reserved.
 *
 */

var GameScene = cc.Layer.extend({
    scrollViewHost:null,

    ctor:function () {
        this._super();
        cc.log("GameScene Scene ctor");
    },

    onResolveCCBCCMenuItemSelector:function (target, selectorName) {

        if (target == this && selectorName == "goBack") {
            return this.goBack;
        }

        return null;
    },

    onAssignCCBMemberVariable:function(target, memberVarAssignmentName, node) {

        if (target == this && memberVarAssignmentName == 'ScrollViewHost') {
            this.scrollViewHost = node;
            return true;
        }

        return false;
    },

    onEnter:function() {
        this._super();
        cc.log("GameScene OnEnter");

        // load up the list widgets
        var list = new cc.Node();
        var listHeight = 0;
        var listWidth = 0;
        var i;
        for (i=0;i<20;i++) {
            var listItem = cc.BuilderReader.load(getResourceCCB('ListWidget'));
            listItem.setPosition(cc.p(0,0 + listHeight));
            listItem.listText.setString("ListItem " + i);
            list.addChild(listItem);

            var listItemSize = listItem.getContentSize();
            if (listHeight == 0) {
                listHeight = listItemSize.height+1;
                listWidth = listItemSize.width;
            } else {
                listHeight += listItemSize.height+1;
            }
        }
        list.setContentSize(cc.size(listWidth, listHeight));

        var viewSize = cc.size(listWidth, this.scrollViewHost.getContentSize().height);

        var scrollView = cc.ScrollView.create(viewSize, list);
        scrollView.setPosition(this.scrollViewHost.getPosition());
        scrollView.setAnchorPoint(this.scrollViewHost.getAnchorPoint());
        scrollView.setDirection(cc.SCROLLVIEW_DIRECTION_VERTICAL);
        scrollView.setContentSize(list.getContentSize());
        scrollView.setContentOffset(cc.p(0,0));

        this.addChild(scrollView);
    },

    goBack:function() {
        cc.log("goBack");
        var scene = cc.BuilderReader.loadAsScene(getResourceCCB('MainMenuScene'));
        cc.Director.getInstance().replaceScene(scene);
    }
});


var GameSceneLoader = cc.LayerLoader.extend({

    loadCCNode:function (parent, ccbReader) {
        cc.log("Game Scene Loader create node");
        return new GameScene();
    }

});

GameSceneLoader.loader = function () {
    return new GameSceneLoader();
};