// PDF List to show: Here you insert your paths to access the PDF files ✔
const pdfUrls = [
    'examplepdf.pdf',
    'examplepdf.pdf',
    'examplepdf.pdf'
];

// Get the container for all pdfs: [Style]
const pdfList = document.getElementById('pdf-list');


/*
::: PROCESS :::
Creates HTML elements dynamically to avoid code duplication, 
uses Canvas to render the image on the 1st page, all of this is added to the main container.
*/
function createComponentPreviewViewPDF(url, index) {
    // Container for a pdf
    const container = document.createElement('div');
    container.classList.add('pdf-container');
    
    // Canvas to render PDF first page. Generate a ID for component
    const canvas = document.createElement('canvas');
    canvas.id = `pdf-preview-${index}`;
    canvas.classList.add('pdf-preview');
    container.appendChild(canvas);
    
    // Link to show PDF: In other tab
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.textContent = "View PDF";
    container.appendChild(link);

    pdfList.appendChild(container);

    // Render first page of PDF in canvas
    const context = canvas.getContext('2d');
    pdfjsLib.getDocument(url).promise.then(function(pdf) {
        pdf.getPage(1).then(function(page) {
            const scale = 1.5;  // For rendering
            const viewport = page.getViewport({ scale: scale });

            // Adjust the size of the canvas to the size of the first page of the PDF
            canvas.width = viewport.width;
            canvas.height = viewport.height;

            // RENDER ON PAGE
            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };
            page.render(renderContext);
        });
    });
}

// RUN ON THE PDF LIST --- Making components... 
pdfUrls.forEach((pdfUrl, index) => {
    createComponentPreviewViewPDF(pdfUrl, index);
});

/*
// FOR API PROJECT 😉
    fetch('https://api.com/pdfs')
.then(response => response.json())
.then(data => {
    const pdfUrls = data.urls;  // Return list of URLs
    pdfUrls.forEach((pdfUrl, index) => {
        createComponentPreviewViewPDF(pdfUrl, index);
    });
});

*/