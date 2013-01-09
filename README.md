cocosbuiler-cocos2d-html5-example
=================================

Project demonstrating cocosbuilder usage with cocos2d-html5

The project allows a single piece of code to deliver the application in two orientations and two sizes (portrait & landscape, small & large). Small and Large have been arbitrarily designated as the 480x320 and 1024x768 sizes respectively. The code will only pull in the assets for the target orientation and size as needed. The purpose was to give content generators more control and to be able to adjust appropriately to each orientation and size with a single code base (allowing for future re-skinning and re-layout on each orientation and size individually).

A small batch file which launches a python simple server is included (should be usable on Macs & Linux out of the box). Application can be run with

./simpleserver.sh run in the directory of installation

using a browser (tested on firefox and chrome and safari) enter the following to see how the code pulls in the assets. 

http://localhost:8000/project/index.html?gameOrientation=portrait&screenD1=320&screenD2=480
http://localhost:8000/project/index.html?gameOrientation=portrait&screenD1=768&screenD2=1024
http://localhost:8000/project/index.html?gameOrientation=landscape&screenD1=480&screenD2=320
http://localhost:8000/project/index.html?gameOrientation=landscape&screenD1=1024&screenD2=768

http://localhost:8000/project/index.html is equivalent to the small landscape size and orientation

Screens show a variety of images and buttons and animations. On the game scene a ScrollView is shown with items added which are widgets created in CocosBuilder as well. Each layout is controlled separately and can be found in the two cocosbuilder projects (small and large are separated to allow content providers to have WYSIWYG). Because the ScrollView contents are built dynamically (although the content is provided via cocosbuilder) it uses a proxy ccnode for its location and size.

For assets there are 6 directories (3 for each size) with a common, landscape only and portrait only directory (e.g. small, small-l, & small-p directory).

This code uses the unified release of cocos family products on Dec 5 2012 and thereby based on cocos2d-html5 and cocosbuilder 3.0.

Cocosbuilder reader files have been modified with two changes to code to allow the project to not require the jscontrolled flag to be set for a JS project. This allows the content to be generated for any platform (cocos2d-iphone, cocos2d-x, cocos2d-html5) without any changes on the content creation side. Reasons for the changes (and the two small changes) are mentioned in this post:

http://www.cocos2d-x.org/boards/19/topics/20243

Further refinements and optimizations can be made to the CCBReader files to optimize the loading of the ccbi files without having the CocosBuilder product altered in any way.