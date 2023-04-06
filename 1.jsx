var doc = app.activeDocument;
var Iheight = 0;
var topGroup;

var open_file = File.openDialog('', ["Zip:*.zip;"]);
open_file.open("r");
open_file.close();
var zip_file_name = open_file.name.split(".");
var xml_file_name = zip_file_name[0].split("_");

var svg_file_name = '';


var directory_name = '~/Downloads/' + zip_file_name[0];
// var directory_name = Folder.desktop + '/' + zip_file_name[0];

var f = Folder(directory_name);

var allFiles = f.getFiles();
var svgFile;
var svg_file_size = 0;;
var thisFile;

var imgFile;
var img_file_size = 0;
var img_file_name = '';
for (var i = 0; i < allFiles.length; i++) {
    thisFile = allFiles[i];
    if (thisFile instanceof File) {
        if (thisFile.name.indexOf('.') > -1) {
            var temp_file = thisFile.name.split(".");
            var tempFile = File(directory_name + '/' + thisFile.name);
            if (temp_file[1] == 'svg') {
                if (svg_file_size < tempFile.length) {
                    svgFile = tempFile;
                    svg_file_size = tempFile.length;
                    svg_file_name = thisFile.name;
                }
            }
            if (temp_file[1].toLowerCase() == 'jpg' || temp_file[1].toLowerCase() == 'jpeg') {
                if (tempFile.length < 100000 && img_file_size < tempFile.length) {
                    imgFile = tempFile;
                    img_file_size = tempFile.length;
                    img_file_name = thisFile.name;
                }
            }
        }
    }
}

while (svg_file_name == '' && img_file_name == '') {
    if (svg_file_name != '' && img_file_name != '') {
        first();
    }
}
if (svg_file_name != '' && img_file_name != '') {
    first();
}
function first() {
    if (svg_file_name == "") {
        alert("Please extract the zip file on Desktop.");
    }
    var fileObj = new File(directory_name + '/' + xml_file_name[1] + '.xml');

    fileObj.open("r:");
    var xmlString = new XML(fileObj.read());
    // if (svg_file_name == "2e9a7164-fa79-7862-80fc-9aef9a4c9c74.svg") {

        doc.groupItems.createFromFile(svgFile);

        var layers = app.activeDocument.layers;

        topGroup = layers.getByName('Layer 1').groupItems[0];
        topGroup.top = 0;
        topGroup.left = 0;
        setSizeGroup();


        for (var i = 0; i < topGroup.groupItems.length; i++) {
            var component = main(topGroup.groupItems[i]);
            if (component) {
                for (var j = 0; j < component.length; j++) {
                    var component2 = main(component[j]);
                    if (component2) {
                        for (var k = 0; k < component2.length; k++) {
                            var component3 = main(component2[k]);
                            if (component3) {
                                for (var l = 0; l < component3.length; l++) {
                                    var component4 = main(component3[l]);
                                    if (component4) {
                                        for (var n = 0; n < component4.length; n++) {
                                            var component5 = main(component4[n]);
                                            if (component5) {
                                                for (var m = 0; m < component5.length; m++) {
                                                    var component6 = main(component5[m]);
                                                    if (component6) {
                                                        for (var o = 0; o < component6.length; o++) {
                                                            var component7 = main(component6[o]);
                                                            if (component7) {
                                                                for (var p = 0; p < component7.length; p++) {
                                                                    var component8 = main(component7[p]);
                                                                    if (component8) {
                                                                        for (var q = 0; q < component8.length; q++) {
                                                                            var component9 = main(component8[q]);
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        var orderId = xmlString.orderId.split("-");
        var exportFileName = '~/Downloads' + '/result/' + orderId[orderId.length - 1] + ".png";
        exportFileToPNG24(exportFileName);
    // } else {
        // var itemToPlace = doc.placedItems.add();

        // itemToPlace.file = imgFile;
        // itemToPlace.top = 0;
        // itemToPlace.left = 0;
        // itemToPlace.width = 2400;
        // itemToPlace.height = 1800;
        // var orderId = xmlString.orderId.split("-");
        // var exportFileName = Folder.desktop + '/result/' + orderId[orderId.length - 1] + ".png";
        // exportFileToPNG24(exportFileName);
    // }
}

function main(group) {
    if (group.pathItems.length > 0) {
        group.pathItems[0].remove();
    }
    imageResize(group);
    textResize(group);
    return containChild(group.groupItems);
}

function imageResize(group) {
    if (group.placedItems.length) {
        var img_width = group.width;
        var img_height = group.height;
        var difference_rate = img_height / img_width;

        var reminder_width = 2400 - img_width;

        var calculate_height = reminder_width * difference_rate;

        if (group.groupItems.length === 0) {
            // // image position
            group.top = 0;
            group.left = 0;
        }

        // image resize
        group.width = 2400;
        group.height = calculate_height + img_height;
        Iheight = calculate_height + img_height;
    } else {
        return 0;
    }
}
function textResize(group) {
    if (group.textFrames.length == 1) {
        var textWidth = group.width;
        var textHeight = group.height;
        var text_rate = textHeight / textWidth;
        var reminder_textWidth = 2200 - textWidth;
        var calculate_textHeight = reminder_textWidth * text_rate;
        if (group.pathItems.length > 0) {
            group.pathItems[0].remove();
        }

        group.width = 2200;
        group.height = textHeight + calculate_textHeight - 100;

        if (group.groupItems.length == 0) {
            group.top = -Math.abs(1504);
            group.left = 100;
        }
    }
}

function exportFileToPNG24(dest) {
    if (app.documents.length > 0) {
        var exportOptions = new ExportOptionsPNG24();
        exportOptions.antiAliasing = false;
        exportOptions.transparency = false;
        exportOptions.saveAsHTML = true;

        var type = ExportType.PNG24;
        var fileSpec = new File(dest);

        app.activeDocument.exportFile(fileSpec, type, exportOptions);
    }
}
function setSizeGroup() {
    topGroup.width = 2400;
    topGroup.height = 1800;
}


function containChild(group) {
    if (group.length > 0) {
        return group;
    } else {
        return false;
    }
}