var spacingOptions = ["0", "0.125", "0.25", "0.5"]
var printFilePath
var infoFilePath
var selectedSpacing
var desiredQty
var extraQty

// function mainWindow() {
        var w = new Window("dialog", "Form");
            var myInputGroup1 = w.add("group");
                myInputGroup1.add("statictext", undefined, "Print File Path:");
                var folderPathText = myInputGroup1.add("edittext",undefined,"Print file path");
                    folderPathText.characters = 40;
                    folderPathText.active = true;
                var browseButton = myInputGroup1.add("button",undefined,"Browse");
                    browseButton.onClick = function() {
                        // var folderPath = Folder.selectDialog("Select a folder to save the files");
                        var folderPath = File.openDialog ("Select the print PDF");
                        if (folderPath) {
                            folderPathText.text = decodeURI(folderPath.fsName);
                            printFilePath = decodeURI(folderPath.fsName);
                            }
                    }
            var myInputGroup2 = w.add("group");
                myInputGroup2.add("statictext",undefined,"InfoTech Path: ")
                    var infoFileText = myInputGroup2.add("edittext",undefined,"InfoTech file path");
                    infoFileText.characters = 40;
                var infoTechButton = myInputGroup2.add("button",undefined,"Browse");
                    infoTechButton.onClick = function() {
                        var folderPath = File.openDialog ("Select the InfoTech PDF");
                        if (folderPath) {
                            infoFileText.text = decodeURI(folderPath.fsname);
                            infoFilePath = decodeURI(folderPath.fsName);
                        }
                    }
            
            var myInputGroup3 = w.add("group");

                myInputGroup3.add("statictext",undefined,"Quantity: ")
                var QuantityText = myInputGroup3.add("edittext",undefined,"50")
                    QuantityText.characters = 3;
                    desiredQty = QuantityText.text

                myInputGroup3.add("statictext",undefined,"Extra Stickers: ")
                var extraStickersText = myInputGroup3.add("edittext",undefined,"5")
                    extraStickersText.characters = 3;
                    extraQty = extraStickersText.text

                myInputGroup3.add("statictext",undefined,"Spacing: ")
                var spacingSelection = myInputGroup3.add("dropdownlist",undefined,spacingOptions)
                spacingSelection.selection = 1;
                selectedSpacing = spacingSelection.selection

            var myButtonGroup = w.add("group");
                myButtonGroup.alignment = "right";
                var submitButton = myButtonGroup.add("button",undefined,"Submit");
                    submitButton.onClick = function() {
                        var MainScript = new File(C:\Users\jfuchs\Documents\JOHN\Scripts\GitHub\imposition-wizard\wizard-john.jsx)
                        MainScript.execute();
                    }

                myButtonGroup.add("button",undefined,"Cancel");
            w.show();
        
            module.exports = {MyParams};