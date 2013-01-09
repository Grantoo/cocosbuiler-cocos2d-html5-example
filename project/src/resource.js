/* http://www.grantoo.org
 *
 * Copyright (c) 2013 Grantoo, LLC. All rights reserved.
 *
 */

var rsSize = 'small';
var rsOrientation = 'l';

var getResourceCCB = function (resourceCCB) {
    var resourcePath = "Resources/ccb/" + resourceCCB + "-" + rsSize + "-" + rsOrientation + ".ccbi";
    return resourcePath;
};

var setResourceType = function(size, orientation) {
    rsSize = size;
    rsOrientation = orientation;
};