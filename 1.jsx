var doc = app.activeDocument;
var test = 1;
var Iheight = 0;
switch (test) {
    case 1:
        var directory_name = Folder.desktop + '/111-2191942-0309069_75400553768601';
        var svgFile = File(directory_name + '/2e9a7164-fa79-7862-80fc-9aef9a4c9c74.svg');
        var fileObj = new File(directory_name + '/75400553768601.xml');
        break;
    case 2:
        var directory_name = Folder.desktop + '/114-7099060-3188201_75645712750761';
        var svgFile = File(directory_name + '/eabf8dd5-169f-0eb1-abc3-61168da9f4c9.svg');
        var fileObj = new File(directory_name + '/75645712750761.xml');
        break;
    case 3:
        var directory_name = Folder.desktop + '/111-3122885-5033061_75633766422281';
        var svgFile = File(directory_name + '/dfe5b4f0-7604-71dd-d78a-2b615f1a6c90.svg');
        var fileObj = new File(directory_name + '/75633766422281.xml');
        break;
    case 4:
        var directory_name = Folder.desktop + '/114-5247093-7601019_75638978755921';
        var svgFile = File(directory_name + '/370f3b0a-254c-9e72-16ab-cca29a88f635.svg');
        var fileObj = new File(directory_name + '/75638978755921.xml');
        break;
    case 5:
        var directory_name = Folder.desktop + '/114-6454505-5868201_75631083656961';
        var svgFile = File(directory_name + '/bac99d6c-1559-3466-d97a-06ed25d7e3ff.svg');
        var fileObj = new File(directory_name + '/75631083656961.xml');
        break;
}

fileObj.open("r:");
var xmlString = new XML(fileObj.read());

doc.groupItems.createFromFile(svgFile);

var layers = app.activeDocument.layers;
// myDoc.layers.getByName(CLOSED_layer).visible = false;



var topGroup = layers.getByName('Layer 1').groupItems[0];
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

var orderId = xmlString.orderId.split("-");
var exportFileName = directory_name + '/' + orderId[orderId.length - 1] + ".png";

exportFileToPNG24(exportFileName);

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
