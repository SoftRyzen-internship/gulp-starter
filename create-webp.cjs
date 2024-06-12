const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const directoryPath = path.join(__dirname, 'src/assets/images');

function processDirectory(directory) {
  // Check if directory is provided
  if (!directory) {
    throw new Error('Directory is required');
  }

  // Read the directory
  fs.readdir(directory, { withFileTypes: true }, (error, files) => {
    // Handle directory read error
    if (error) {
      throw new Error(`Unable to scan directory: ${error}`);
    }

    // Process each file in the directory
    files.forEach(file => {
      const fullPath = path.join(directory, file.name);

      // Recursively process subdirectories
      if (file.isDirectory()) {
        processDirectory(fullPath);
      } else {
        const ext = path.extname(file.name);
        const supportedExtensions = ['.jpg', '.jpeg', '.png'];

        // Convert supported image files to WebP format
        if (supportedExtensions.includes(ext)) {
          const outputPath = path.join(directory, `${path.basename(file.name, ext)}.webp`);

          sharp(fullPath)
            .webp({ quality: 75 })
            .toFile(outputPath)
            .catch(error => {
              throw new Error(`Sharp convert error: ${error}`);
            });
        }
      }
    });
  });
}

processDirectory(directoryPath);
