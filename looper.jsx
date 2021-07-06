//batch list for easy lookup
var infoTechCache = {}
var canvasWidth = 50
var canvasHeight = 25
var maxDocHeight = 50
var sheetsNeeded = 1

function windowDisplay() {
  //Setting initial widnow variables
  var spacingOptions = [0, 0.125, 0.25, 0.5]
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
  // space = parseFloat(spacingSelection.selection)
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
    FolderLooper(source, extraPrints, parseFloat(space.text));
    return w.close();
  }

  myButtonGroup.add("button", undefined, "Cancel");
  w.show();

  return;
}

function saveAndClose(doc, dest) {
  var saveName = new File(dest);
  saveOpts = new PDFSaveOptions();
  saveOpts.compatibility = PDFCompatibility.ACROBAT7;
  saveOpts.generateThumbnails = false;
  saveOpts.preserveEditability = false;
  doc.saveAs(saveName, saveOpts);
  doc.close();
}

function newFile(quantity, width, height, space, canvasWidth, canvasHeight, filePath, infoPath, dest, batch, columns, sheetCount, qtyPerSheet, rows) {

  var filePath = File(filePath);
  var infoPath = File(infoPath);
  // var docWidth = points(canvasWidth);
  // var docHeight = (quantity / columns) * points(height + space);
  // var doc = app.documents.add(
  //   DocumentColorSpace.CMYK,
  //   docWidth,
  //   docHeight,
  //   1
  // );


// Loop for however many sheets we need
for (var i = 0; i < sheetCount; i++) {
  if (i == 0) {

var RemainingPrintQTY = quantity;
var columns = Math.floor(points(canvasWidth) / (points(width) + points(space)));
var docWidth = (columns * points(width + space))

if (sheetsNeeded > 1) {
  var docHeight = (rows * points(height + space));
  }
  else {
    if (sheetsNeeded == 0) {
     return 
     } 
  var docHeight = points((Math.ceil((RemainingPrintQTY + 1) / columns) * (height + space)))
}

var doc = app.documents.add(
  DocumentColorSpace.CMYK,
  docWidth,
  docHeight,
  1
);

  var xPosition = 0;
  var yPosition = docHeight;
  for (var i = 0; i < qtyPerSheet; i++) {
    if (i == 0) {
      var thePDF = doc.groupItems.createFromFile(infoPath);
    }
    else{
      var thePDF = doc.groupItems.createFromFile(filePath);
    }
    // else {
    //   app.copy();
    //   var thePDF = app.paste();
    // }

    if ( i % columns === 0 && i !== 0 ) {
      xPosition = 0;
      yPosition = yPosition - ( points(height) + points(space) );
    }

    thePDF.position = [xPosition, yPosition]
    xPosition = xPosition + points(width) + points(space);
  }
 
  RemainingPrintQTY = (RemainingPrintQTY - qtyPerSheet)
  dest = dest + "/" + String(batch) + "_" + sheetsNeeded + ".pdf";
  sheetsNeeded = (sheetsNeeded - 1)
  saveAndClose(doc, dest);

  if (sheetsNeeded > 0) {
    newFile(RemainingPrintQTY, width, height, space, canvasWidth, canvasHeight, filePath, infoPath, destination, batch, columns, sheetCount, qtyPerSheet, rows)
  }

    }
  }
}

function points(inches) {
  return inches * 72;
}

function InfoCut(width, height, positionX, positionY, infoPath, batch) {
  // Adds the batch number to a list for easy look up later
  infoTechCache[batch] =  infoPath;
  var infoPath = File(infoPath);
  open(infoPath);
  var width = points(width) - points(0.2)
  var height = points(height) - points(0.2)
  var positionX = points(positionX) + points(0.1)
  var positionY = points(positionY) - points(0.1)

  var accDoc = app.activeDocument;

  // Remove spot color if already exists
  if (app.activeDocument.spots[0].name == 'PerfCutContour' ) {
    accDoc.spots[0].remove()
  }

  var PerfCutSpot = accDoc.spots.add();
  var spotCMYK = new CMYKColor();
  spotCMYK.cyan = 100;
  spotCMYK.magenta = 0;
  spotCMYK.yellow = 100;
  spotCMYK.black = 0;
  PerfCutSpot.name = "PerfCutContour";
  PerfCutSpot.colorType = ColorModel.SPOT;
  PerfCutSpot.color = spotCMYK;
  var PerfCutContour = new SpotColor();
  PerfCutContour.spot = PerfCutSpot;
  var newRect = accDoc.pathItems.rectangle(positionY, positionX, width, height)
  newRect.stroked = true;
  newRect.strokeWidth = 0.25;
  newRect.strokeColor = PerfCutContour
  newRect.fillColor = NoColor;
  accDoc.close( SaveOptions.SAVECHANGES );

  return infoTechCache;
}

function fileNameParser(filename) {
  var itemSpecs = {}
  try {
    // Regular Expression are the devil.
    // These look for an obivous batch number in the file name string.
    var BatchNumber = String(filename).match(/Batch%20\d{5}/)
    var BatchNumber = String(BatchNumber).match(/(.{0,5})$/g)

    // These here look for an obvious width, then split it into just digits then into an Integer
    var width = String(filename).match(/TS_(\d)/g)
    var width = String(width).match(/(\d)/g)
    var width = parseInt(width)
    var height = String(filename).match(/TS_(\d)x(\d)/g)
    var height = String(height).match(/x(\d)/g)
    var height = String(height).match(/(\d)/g)
    var height = parseInt(height)
    var quantity = String(filename).match(/(qty-)(\d{1,5})/g)
    var quantity = String(quantity).match(/(\d{1,5})/g)
    var quantity = parseInt(quantity)

    itemSpecs.Batch = BatchNumber;
    itemSpecs.Width = width;
    itemSpecs.Height = height;
    itemSpecs.Quantity = quantity;

    return itemSpecs;
  } catch (e) {
    alert(filename + " Shows invalid file name")
  } finally {

  }

}

function FolderLooper(srcFolder, extraPrints, space) {
  var csvOrder = srcFolder.getFiles(/\.csv$/i)
  var allPrintPDFs = srcFolder.getFiles(/PRINT\.pdf$/i);
  var allInfoPDFs = srcFolder.getFiles(/TICKET\.pdf$/i);

  //This runs infoCut on all infoTech files
  for (var i = 0; i < allInfoPDFs.length; i++) {
    var itemSpecs = fileNameParser(allInfoPDFs[i]);
    InfoCut(itemSpecs.Width, itemSpecs.Height, 0, itemSpecs.Height, allInfoPDFs[i], itemSpecs.Batch);
  }

  //This loop will open all files
  for (var i = 0; i < allPrintPDFs.length; i++) {
    var itemSpecs = fileNameParser(allPrintPDFs[i]);
    var printQuantity = itemSpecs.Quantity + parseInt(extraPrints);

    // var rows = (points(maxDocHeight) / points(itemSpecs.Height + space))
    var rows = Math.floor(maxDocHeight / (itemSpecs.Height + space))
    // var columns = (canvasWidth / ( points(itemSpecs.Width) + points(space)))
    var columns = Math.floor(canvasWidth / (itemSpecs.Width + space))

    qtyPerSheet = (rows * columns)
    if (qtyPerSheet >= printQuantity) {
      qtyPerSheet = printQuantity
    }
    sheetsNeeded = Math.ceil(printQuantity / qtyPerSheet)
    RemainingPrintQTY = printQuantity

    newFile(printQuantity, itemSpecs.Width, itemSpecs.Height, space, canvasWidth, canvasHeight, allPrintPDFs[i], infoTechCache[itemSpecs.Batch], destination, itemSpecs.Batch, columns, sheetsNeeded, qtyPerSheet, rows)

  }
  return;
}

windowDisplay();
