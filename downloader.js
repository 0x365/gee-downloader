// Define Area of Interest (AOI)
var aoi = ee.Geometry.Rectangle([72.5, 18.5, 73.0, 19.0]);

// Load Sentinel-2 Image Collection
var image = ee.ImageCollection("COPERNICUS/S2")
    .filterBounds(aoi)
    .filterDate("2023-01-01", "2023-01-31")  // Adjust date range
    .sort("CLOUDY_PIXEL_PERCENTAGE")  // Sort by least cloudy
    .first();  // Select first (least cloudy) image

// Select Bands (RGB)
var bands = ["B4", "B3", "B2"];
var imageRGB = image.select(bands);

// Display Image on Map (Not necceserally required)
Map.centerObject(aoi, 10);
Map.addLayer(imageRGB, {min: 0, max: 3000, bands: bands}, "Sentinel-2 RGB");

// Export Image to Google Drive (This is expensive task to wait until you have the correct data on the map before using this)
Export.image.toDrive({
  image: imageRGB,
  description: "Sentinel2_Export",
  folder: "GEE_Exports",
  fileNamePrefix: "sentinel2_image",
  region: aoi,
  scale: 10,
  maxPixels: 1e13
});
