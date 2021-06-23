//
// 8888888                                          d8b 888    d8b
//   888                                            Y8P 888    Y8P
//   888                                                888
//   888   88888b.d88b.  88888b.   .d88b.  .d8888b  888 888888 888  .d88b.  88888b.
//   888   888 "888 "88b 888 "88b d88""88b 88K      888 888    888 d88""88b 888 "88b
//   888   888  888  888 888  888 888  888 "Y8888b. 888 888    888 888  888 888  888
//   888   888  888  888 888 d88P Y88..88P      X88 888 Y88b.  888 Y88..88P 888  888
// 8888888 888  888  888 88888P"   "Y88P"   88888P' 888  "Y888 888  "Y88P"  888  888
//                       888
//                       888
//                       888
// 888       888 d8b                               888
// 888   o   888 Y8P                               888
// 888  d8b  888                                   888
// 888 d888b 888 888 88888888  8888b.  888d888 .d88888
// 888d88888b888 888    d88P      "88b 888P"  d88" 888
// 88888P Y88888 888   d88P   .d888888 888    888  888
// 8888P   Y8888 888  d88P    888  888 888    Y88b 888
// 888P     Y888 888 88888888 "Y888888 888     "Y88888

// ______  _     _ __   _  ______ _______  _____  __   _ _______
// |     \ |     | | \  | |  ____ |______ |     | | \  | |______
// |_____/ |_____| |  \_| |_____| |______ |_____| |  \_| ______|
//
//               _______ __   _ ______
//           ___ |_____| | \  | |     \ ___
//               |     | |  \_| |_____/
//
// ______  _____ _______        _____ __   _ _______ _______
// |     \   |   |______ |        |   | \  | |______ |______
// |_____/ __|__ |______ |_____ __|__ |  \_| |______ ______|
//
//
// Dave Blois, John Sam Fuchs
// June 16 2021
//
//Testing Branch

//(just making some changes for git purposes no i'm not)
// JSF 6/17/21 05:03PM PST
// - Finished sheet now crops down to artwork bounds
// - Added var "dimensions" for runtime access to artwork bounds
// - Added details to file output name
// - Created variables to use when implementing InfoTech data
// - If/when we make a GUI for this, I'd love for most of the init variables to be changeable by the operator. Stuff like quantity, spacing, extra prints, etc should have some flexibility for changing workflows and media.

var srcFolder = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/"
var printFilePath = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_PRINT.pdf"
var infoFilePath = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_INFO.pdf"
var destination = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_IMPO.pdf"
var quantity = 50
var space = 0.125
var maxDocHeight = 48
var maxDocWidth = 50
var extraPrints = 5
var orderNumber = '23300' //placeholder
var SKU = '21424' //placeholder
var dimensions = {}
var rows = 1
var columns = 1
var qtyPerSheet = quantity
var RemainingPrintQTY = quantity

var spacingOptions = ["0", "0.125", "0.25", "0.5"]

var w = new Window("dialog", "Form");
            var myInputGroup1 = w.add("group");
                myInputGroup1.add("statictext", undefined, "Print File Path:");
                var folderPathText = myInputGroup1.add("edittext",undefined,"Print file path");
                    folderPathText.characters = 40;
                    folderPathText.active = true;
                var browseButton = myInputGroup1.add("button",undefined,"Browse");
                    browseButton.onClick = function() {
                        // var folderPath = Folder.selectDialog("Select a folder to save the files");
                        var folderPath = Folder.openDialog ("Select the print PDF");
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
                        var folderPath2 = Folder.openDialog ("Select the InfoTech PDF");
                        if (folderPath2) {
                            infoFileText.text = decodeURI(folderPath2.fsName);
                            infoFilePath = decodeURI(folderPath2.fsName);
                        }
                    }

            var myInputGroup3 = w.add("group");

                myInputGroup3.add("statictext",undefined,"Quantity: ")
                var QuantityText = myInputGroup3.add("edittext",undefined,"50")
                    QuantityText.characters = 3;
                    quantity = QuantityText.text

                myInputGroup3.add("statictext",undefined,"Extra Stickers: ")
                var extraStickersText = myInputGroup3.add("edittext",undefined,"5")
                    extraStickersText.characters = 3;
                    extraPrints = extraStickersText.text

                myInputGroup3.add("statictext",undefined,"Spacing: ")
                var spacingSelection = myInputGroup3.add("dropdownlist",undefined,spacingOptions)
                spacingSelection.selection = 1;
                space = spacingSelection.selection



            var myInputGroup4 = w.add("group");

                myInputGroup4.add("statictext",undefined,"Destination: ")
                var destinationPath = myInputGroup4.add("edittext",undefined,"Destination path")
                destinationPath.characters = 40;
                destination = destinationPath.text
                var destinationButton = myInputGroup4.add("button",undefined,"Browse")
                  destinationButton.onClick = function() {
                    var folderPath3 = Folder.selectDialog ("Select the folder where you'd like your generated sheets to save")
                    if (folderPath3) {
                      destinationPath.text = decodeURI(folderPath3.fsName);
                      destination = destinationPath.text
                    }
                  }

            var myButtonGroup = w.add("group");
                myButtonGroup.alignment = "right";
                var submitButton = myButtonGroup.add("button",undefined,"Submit");
                    submitButton.onClick = function() {
                      doTheMath(quantity, extraPrints, dimensions.artWidth, dimensions.artHeight, space, maxDocWidth, printFilePath, infoFilePath)
                    }

                myButtonGroup.add("button",undefined,"Cancel");
            w.show();

function saveAndClose(doc, dest) {


      var finalDestination = (dest + orderNumber + "_" + SKU + "_" + dimensions.artWidth + "x" + dimensions.artHeight + "_qty" + quantity + "_sheet" + sheetsNeeded + ".pdf") //Create detailed file name
      sheetsNeeded = (sheetsNeeded - 1)
      var saveName = new File(finalDestination);
      saveOpts = new PDFSaveOptions();
      saveOpts.compatibility = PDFCompatibility.ACROBAT7;
      saveOpts.generateThumbnails = false;
      saveOpts.preserveEditability = false;
      doc.saveAs(saveName, saveOpts);
      doc.close()

  }

// Function to convert inches into points
function points(inches) {
  return inches * 72;
}

function doTheMath(quantity, extraPrints, width, height, space, canvasWidth, filePath, infoPath) {

  var filePath = File(filePath);
  open(filePath);
  dimensions = {artWidth : (app.activeDocument.width / 72) , artHeight : (app.activeDocument.height / 72) } //keep 'dimensions' as inches for consistency

  var printQuantity = quantity + extraPrints;
  var columns = Math.floor(points(canvasWidth) / (points(dimensions.artWidth) + points(space)));
  rows = Math.floor(points(maxDocHeight) / points(dimensions.artHeight + space))
  var docWidth = (columns * points(dimensions.artWidth + space));
  var docHeight = (printQuantity / columns) * points(dimensions.artHeight + space);
  qtyPerSheet = (rows * columns)
  if (qtyPerSheet >= printQuantity) {
    qtyPerSheet = printQuantity
  }
  sheetsNeeded = Math.ceil(quantity / qtyPerSheet)
  activeDocument.close();

  InfoCut(dimensions.artWidth, dimensions.artHeight, 0, dimensions.artHeight, infoFilePath)

  }

function newFile(quantity, sheetCount, width, height, space, canvasWidth, filePath, infoPath, dest, columns, rows) {

  var filePath = File(printFilePath);
  var infoPath = File(infoFilePath);
  var sheetCount = sheetsNeeded


// Loop for however many sheets we need
  for (var i = 0; i < sheetCount; i++) {
    if (i == 0) {

  var printQuantity = qtyPerSheet;
  var columns = Math.floor(points(canvasWidth) / (points(width) + points(space)));
  var docWidth = (columns * points(width + space))

  if (sheetsNeeded > 1) {
  var docHeight = (rows) * points(height + space);
  }
  else {
    var docHeight = Math.ceil(RemainingPrintQTY / columns) * (points(height + space))
  }

  var doc = app.documents.add(
    DocumentColorSpace.CMYK,
    docWidth,
    docHeight,
    1
  );

  var xPosition = 0;
  var yPosition = docHeight;

    for (var i = 0; i < printQuantity; i++) {
      if (i == 0) {
        var thePDF = doc.groupItems.createFromFile(infoPath);
      }
      else {
        var thePDF = doc.groupItems.createFromFile(filePath);
      }

      if ( i % columns === 0 && i !== 0 ) {
        xPosition = 0;
        yPosition = yPosition - ( points(height) + points(space) );
      }

      thePDF.position = [xPosition, yPosition]
      xPosition = xPosition + points(width) + points(space);
    }

        RemainingPrintQTY = (RemainingPrintQTY - qtyPerSheet)
        saveAndClose(doc, dest);
        newFile(qtyPerSheet, sheetCount, dimensions.artWidth, dimensions.artHeight, space, maxDocWidth, printFilePath, infoFilePath, destination, columns, rows)

      }
    }
  }

function InfoCut(width, height, positionX, positionY, infoPath) {
  var infoPath = File(infoPath);
  open(infoPath);
  var width = points(width) - points(0.2)
  var height = points(height) - points(0.2)
  var positionX = points(positionX) + points(0.1)
  var positionY = points(positionY) - points(0.1)

  var accDoc = app.activeDocument;

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

  newFile(qtyPerSheet, sheetsNeeded, dimensions.artWidth, dimensions.artHeight, space, maxDocWidth, printFilePath, infoFilePath, destination, columns, rows)
}


// doTheMath(quantity, extraPrints, dimensions.artWidth, dimensions.artHeight, space, maxDocWidth, printFilePath, infoFilePath)
// InfoCut(dimensions.artWidth, dimensions.artHeight, 0, dimensions.artHeight, infoFilePath)
