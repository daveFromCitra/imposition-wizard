var infoPath = File("/Users/grogtag/Desktop/WizardScripts/TestFiles-copy/TS_4x4 - Batch 12345-SoftTouchLamMatte Vinyl qty-10_INFO.pdf")

function points(inches) {
  return inches * 72;
}

function InfoCut(width, height, positionX, positionY, infoPath) {
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

InfoCut(4, 4, 0, 4, infoPath)
