/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org


 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var cocos2dApp = cc.Application.extend({
    config:document['ccConfig'],
    sdk_assets_common:null,
    sdk_assets_orientation:null,

    ctor:function (scene) {
        this._super();
        this.startScene = scene;
        cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
        cc.initDebugSetting();
        cc.setup(this.config['tag']);
        cc.Loader.getInstance().onloading = function () {
            cc.LoaderScene.getInstance().draw();
        };
        cc.Loader.getInstance().onload = function () {
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        };

        // check the size of the window to determine the assets we will load
        // initially this is set to the size of the canvas
        var director = cc.Director.getInstance();
        var designSize = cc.size(480, 320);
        var currentSize = director.getWinSize();

        var comparisonSize = {};
        var orientation;

        if (currentSize.width < currentSize.height) {
            orientation = 'p';
            comparisonSize.width = currentSize.height;
            comparisonSize.height = currentSize.width;
        } else {
            orientation = 'l';
            comparisonSize.width = currentSize.width;
            comparisonSize.height = currentSize.height;
        }


        if (comparisonSize.height > designSize.height || comparisonSize.width > designSize.width) {
            // use large assets and scale
            setResourceType('large',orientation);
            this.sdk_assets_common = "Resources/sdk-large-c";
            this.sdk_assets_orientation = "Resources/sdk-large-" + orientation;
        } else {
            // use small assets and scale
            setResourceType('small',orientation);
            this.sdk_assets_common = "Resources/sdk-small-c";
            this.sdk_assets_orientation = "Resources/sdk-small-" + orientation;
        }

        cc.Loader.getInstance().preload([
            {type:"image", src:this.sdk_assets_common + ".png"},
            {type:"plist", src:this.sdk_assets_common + ".plist"},
            {type:"image", src:this.sdk_assets_orientation + ".png"},
            {type:"plist", src:this.sdk_assets_orientation + ".plist"}
        ]);

    },
    applicationDidFinishLaunching:function () {
        // initialize director
        var director = cc.Director.getInstance();

        // turn on display FPS
        director.setDisplayStats(this.config['showFPS']);

        // set FPS. the default value is 1.0/60 if you don't call this
        director.setAnimationInterval(1.0 / this.config['frameRate']);

        // load in the assets.
        var frameCache = cc.SpriteFrameCache.getInstance();
        frameCache.addSpriteFrames(this.sdk_assets_common + ".plist", this.sdk_assets_common + ".png");
        frameCache.addSpriteFrames(this.sdk_assets_orientation + ".plist", this.sdk_assets_orientation + ".png");

        // create a scene. it's an autorelease object
        var nodeLibrary = cc.NodeLoaderLibrary.sharedCCNodeLoaderLibrary();
        nodeLibrary.registerCCNodeLoader("GameScene", GameSceneLoader.loader());
        nodeLibrary.registerCCNodeLoader("MainMenuScene", MainMenuSceneLoader.loader());
        nodeLibrary.registerCCNodeLoader("ListWidget", ListWidgetLoader.loader());

        // run
        var scene = cc.BuilderReader.loadAsScene(getResourceCCB('MainMenuScene'));
        director.runWithScene(scene);

        return true;
    }
});
var myApp = new cocos2dApp(null);
