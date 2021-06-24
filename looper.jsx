
function windowDisplay() {
  //Setting initial widnow variables
  var spacingOptions = ["0", "0.125", "0.25", "0.5"]
  var w = new Window("dialog", "Form");

  //Adding the Quantity, Extra and Spacing Info
  var myInputGroupInfo = w.add("group");

  // // Removed because it should pull this information from the Filename
  // myInputGroupInfo.add("statictext", undefined, "Quantity: ")
  // var QuantityText = myInputGroupInfo.add("edittext", undefined, "50")
  // QuantityText.characters = 3;
  // quantity = QuantityText.text

  myInputGroupInfo.add("statictext", undefined, "Extra Stickers: ")
  var extraStickersText = myInputGroupInfo.add("edittext", undefined, "5")
  extraStickersText.characters = 3;
  extraPrints = extraStickersText.text

  myInputGroupInfo.add("statictext", undefined, "Spacing: ")
  var spacingSelection = myInputGroupInfo.add("dropdownlist", undefined, spacingOptions)
  spacingSelection.selection = 1;
  space = spacingSelection.selection

  //Adding the Source Folder Path Input
  var myInputGroupSource = w.add("group");

  myInputGroupSource.add("statictext", undefined, "Source: ")
  var sourcePath = myInputGroupSource.add("edittext", undefined, "Source path")
  sourcePath.characters = 40;
  source = sourcePath.text
  var sourceButton = myInputGroupSource.add("button", undefined, "Browse")
  sourceButton.onClick = function() {
    var folderPath3 = Folder.selectDialog("Select the folder where you'd like to pull files from")
    if (folderPath3) {
      sourcePath.text = decodeURI(folderPath3.fsName);
      source = Folder(sourcePath.text);
    }
  }

  //Adding the output destination folder
  var myInputGroupDestination = w.add("group");

  myInputGroupDestination.add("statictext", undefined, "Destination: ")
  var destinationPath = myInputGroupDestination.add("edittext", undefined, "Destination path")
  destinationPath.characters = 40;
  destination = destinationPath.text
  var destinationButton = myInputGroupDestination.add("button", undefined, "Browse")
  destinationButton.onClick = function() {
    var folderPath3 = Folder.selectDialog("Select the folder where you'd like your generated sheets to save")
    if (folderPath3) {
      destinationPath.text = decodeURI(folderPath3.fsName);
      destination = Folder(destinationPath.text);
    }
  }

  //Adding the submit and cancel buttons
  var myButtonGroup = w.add("group");
  myButtonGroup.alignment = "right";
  var submitButton = myButtonGroup.add("button", undefined, "Submit");
  submitButton.onClick = function() {
    FolderLooper(source, extraPrints, space);
  }

  myButtonGroup.add("button", undefined, "Cancel");
  w.show();


}

function fileNameParser(filename) {

}

function FolderLooper(srcFolder, destinationFolder, extraPrints, space) {
  var csvOrder = srcFolder.getFiles(/\.csv$/i)
  var allPrintPDFs = srcFolder.getFiles(/PRINT\.pdf$/i);
  var allInfoPDFs = srcFolder.getFiles(/INFO\.pdf$/i);

  for (var i = 0; i < allInfoPDFs.length; i++) {
    var BatchNumber = String(allInfoPDFs[i]).match(/Batch%20\d{5}/).match(.{0,5})
    //var BatchNumber = String(allInfoPDFs[i]).indexOf('Batch%20');
    alert("Info " + BatchNumber)

  }

}

windowDisplay();
