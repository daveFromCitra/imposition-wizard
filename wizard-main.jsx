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
// Dave Blois, John(Sam) Fuchs
// June 16 2021
var printFilePath = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_PRINT.pdf"
var infoFilePath = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_INFO.pdf"
var destination = "/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_IMPO.pdf"
var quantity = 50
var space = 0.25
var artWidth = 4
var artHeight = 4
var canvasWidth = 50
var canvasHeight = 25

function saveAndClose(doc, dest) {
  var saveName = new File(dest);
  saveOpts = new PDFSaveOptions();
  saveOpts.compatibility = PDFCompatibility.ACROBAT5;
  saveOpts.generateThumbnails = true;
  saveOpts.preserveEditability = true;
  doc.saveAs(saveName, saveOpts);
  doc.close()
}

// This damn thing insists that we use points instead of inches or centimeters. Well. I'm not gonna do that.
// Hence, there's a little converter here.
function points(inches) {
  return inches * 72;
}

function newFile(quantity, width, height, space, canvasWidth, canvasHeight, filePath, infoPath, dest) {
  var printQuantity = quantity + 6;
  var filePath = File(filePath);
  var infoPath = File(infoPath);
  var docWidth = points(canvasWidth);
  var docHeight = points(canvasHeight);
  var doc = app.documents.add(
    DocumentColorSpace.CMYK,
    docWidth,
    docHeight,
    1
  );
  var columns = Math.floor( docWidth / ( points(width) + points(space) ) )

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

}

function InfoCut(width, height, positionX, positionY, infoPath) {
  var infoPath = File(infoPath);
  open(infoPath);
  var width = points(width) - points(0.2)
  var height = points(height) - points(0.2)
  var positionX = points(positionX) + points(0.1)
  var positionY = points(positionY) - points(0.1)

  var accDoc = app.activeDocument;
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
}


InfoCut(artWidth, artHeight, 0, artWidth, infoFilePath)
newFile(quantity, artWidth, artHeight, space, canvasWidth, canvasHeight, printFilePath, infoFilePath, destination)
