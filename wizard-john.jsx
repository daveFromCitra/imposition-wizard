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
//

//(just making some changes for git purposes no i'm not)
// JSF 6/17/21 05:03PM PST
// - Finished sheet now crops down to artwork bounds
// - Added var "dimensions" for runtime access to artwork bounds
// - Added details to file output name
// - Created variables to use when implementing InfoTech data
// - If/when we make a GUI for this, I'd love for most of the init variables to be changeable by the operator. Stuff like quantity, spacing, extra prints, etc should have some flexibility for changing workflows and media.

var printFilePath = "C:/Users/jfuchs/Documents/JOHN/Scripts/John_ImpositionTesting/5x5_sticker1.pdf"
var infoFilePath = "C:/Users/jfuchs/Documents/JOHN/Scripts/John_ImpositionTesting/5x5_ticket1.pdf"
var destination = "C:/Users/jfuchs/Documents/JOHN/Scripts/John_ImpositionTesting/Output/"
var quantity = 100
var space = 0.125
var maxDocHeight = 48
var maxDocWidth = 50
var extraPrints = 4
var orderNumber = '12345' //placeholder
var SKU = '67891' //placeholder
var dimensions = {}
var rows = 1
var columns = 1
var qtyPerSheet = quantity
var RemainingPrintQTY = quantity

function saveAndClose(doc, dest) {


      var finalDestination = (dest + orderNumber + "_" + SKU + "_" + dimensions.artWidth + "x" + dimensions.artHeight + "_qty" + quantity + "_sheet" + sheetsNeeded + ".pdf") //Create detailed file name
      sheetsNeeded = (sheetsNeeded - 1)
      RemainingPrintQTY = (RemainingPrintQTY - qtyPerSheet)
      var saveName = new File(finalDestination);
      saveOpts = new PDFSaveOptions();
      saveOpts.compatibility = PDFCompatibility.ACROBAT5;
      saveOpts.generateThumbnails = true;
      saveOpts.preserveEditability = true;
      doc.saveAs(saveName, saveOpts);
      // doc.close()
     
  }

//   var finalDestination = (dest + orderNumber + "_" + SKU + "_" + dimensions.artWidth + "x" + dimensions.artHeight + "_qty" + quantity + ".pdf") //Create detailed file name
//   var saveName = new File(finalDestination);
//   saveOpts = new PDFSaveOptions();
//   saveOpts.compatibility = PDFCompatibility.ACROBAT5;
//   saveOpts.generateThumbnails = true;
//   saveOpts.preserveEditability = true;
//   doc.saveAs(saveName, saveOpts);
//   doc.close()
// }


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
  var docHeight = Math.ceil(printQuantity / columns) * points(dimensions.artHeight + space);
  qtyPerSheet = (rows * columns)
  sheetsNeeded = Math.ceil(quantity / qtyPerSheet)
  activeDocument.close();

  // var filePath = File(printFilePath);
  // var infoPath = File(infoFilePath);

  return dimensions, sheetsNeeded, rows, docWidth, docHeight, columns, qtyPerSheet, filePath, infoPath
  }

function newFile(quantity, sheetCount, width, height, space, canvasWidth, filePath, infoPath, dest, columns, rows) {
 
  var filePath = File(printFilePath);
  var infoPath = File(infoFilePath);
  var sheetCount = sheetsNeeded

  for (var i = 0; i < sheetCount; i++) {
    if (i == 0) {

  var printQuantity = qtyPerSheet;
  var columns = Math.floor(points(canvasWidth) / (points(width) + points(space)));
  var docWidth = (columns * points(width + space))

  if (printQuantity >= RemainingPrintQTY) {
  var docHeight = (rows) * points(height + space);
  }
  else {
    var docHeight = Math.ceil(columns / RemainingPrintQTY) * ((points(height) + points(space)))
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

doTheMath(quantity, extraPrints, dimensions.artWidth, dimensions.artHeight, space, maxDocWidth, printFilePath, infoFilePath)
InfoCut(dimensions.artWidth, dimensions.artHeight, 0, dimensions.artWidth, infoFilePath)
