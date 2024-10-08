# Image to PDF Conversion API

This API allows you to upload an image and convert it into a PDF file. The converted PDF can then be downloaded directly from the API. It is built using Node.js with Express and utilizes the `multer` library for handling file uploads and `pdfkit` for generating PDF files.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Example Request](#example-request)
- [Folder Structure](#folder-structure)


## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

  ```bash
  git clone https://github.com/yourusername/image-to-pdf-api.git
  cd image-to-pdf-api

2. Install dependencies:

  ``` bash
  npm install
  ``` 

3. Start the server:

  ```  bash
  npm start
  ``` 

By default, the server will start on port 4321. You can change the port by setting the PORT environment variable.

## Usage
Once the server is running, you can start sending requests to the API.

### API Endpoints

- **GET/:**  A simple endpoint to check if the API is running. It returns a "Hello World!" message.

- **POST /api/images:** This endpoint accepts a single image file, converts it into a PDF, and returns the PDF file as a downloadable response.

## Example Request
To test the API, you can use tools like Postman, cURL, or even a simple HTML form.

Using cURL:
```  bash
curl -X POST http://localhost:4321/api/images
-F "image=@/path/to/your/image.png"
``` 

Using an HTML form:
```  html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Image to PDF</title>
</head>
<body>
  <form action="http://localhost:4321/api/images" method="POST" enctype="multipart/form-data">
    <input type="file" name="image" accept="image/*" required>
    <button type="submit">Convert to PDF</button>
  </form>
</body>
</html>
``` 
After selecting an image and submitting the form, the browser should start downloading the generated PDF file.

## Folder Structure
The project follows a simple MVC (Model-View-Controller) architecture:

``` 
├── controllers
│ └── images.js # Contains the logic for converting images to PDF
├── middleware
│ └── cors.js # CORS middleware setup
├── routes
│ └── image.js # Defines routes related to image uploads
├── uploads # Directory where uploaded images and PDFs are temporarily stored
├── index.js # Main entry point for the API server
└── package.json # Project metadata and dependencies
``` 



