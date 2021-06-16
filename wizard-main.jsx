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




// just a test to make sure that it works
alert("Hold onto your butts")

function saveFileToPDF (dest) {
  var doc = app.activeDocument
  if ( app.documents.length > 0 ) {
    var saveName = new File ( dest );
    saveOpts = new PDFSaveOptions();
    saveOpts.compatibility = PDFCompatibility.ACROBAT5;
    saveOpts.generateThumbnails = true;
    saveOpts.preserveEditability = true;
    doc.saveAs( saveName, saveOpts );
  }
}

// This damn thing insists that we use points instead of inches or centimeters. Well. I'm not gonna do that.
// Hence, there's a little converter here.
function inchConverter(inches) {
  return inches * 72;
}

function newFile(quantity, width, space) {
  var filePath = File("/Users/grogtag/Downloads/fortyfour.pdf")
  var doc = app.documents.add(
    DocumentColorSpace.CMYK,
    inchConverter(50),
    inchConverter(20),
    1
  );
  var xPosition = 0;

  for (var i = 0; i < quantity; i++) {
    var thePDF = doc.groupItems.createFromFile(filePath);
    thePDF.position = [xPosition, 1120]
    xPosition = xPosition + inchConverter(width) + inchConverter(space);
  }
  rectangleTest(400, 400, 0 , 0, doc)
}

function rectangleTest(width, height, positionX, positionY, doc) {
  var newRect = doc.pathItems.rectangle(positionY, positionX, width, height)
}


newFile(10, 2.5, 0.25)
