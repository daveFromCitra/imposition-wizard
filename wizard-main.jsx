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
}


newFile(10, 2.5, 0.25)

