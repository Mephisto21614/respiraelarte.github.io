const fileInput = document.getElementById('fileInput');
        const uploadButton = document.getElementById('uploadButton');
    
        uploadButton.addEventListener('click', () => {
          fileInput.click();
        });
    
        fileInput.addEventListener('change', (event) => {
          const selectedFile = event.target.files[0];
          if (selectedFile) {
          
            console.log('Archivo seleccionado:', selectedFile.name);
          }
        });