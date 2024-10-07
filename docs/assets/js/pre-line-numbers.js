document.addEventListener('DOMContentLoaded', function() {
    const preElements = document.querySelectorAll('pre');

    preElements.forEach(pre => {
        // Store unsplitted code
        let unsplittedCode = '';

        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
        copyButton.className = 'copy-button';
        copyButton.style.position = 'absolute';
        copyButton.style.top = '5px';
        copyButton.style.right = '5px';
        copyButton.style.background = 'transparent';
        copyButton.style.border = 'none';
        copyButton.style.cursor = 'pointer';
        copyButton.style.opacity = '0';
        copyButton.style.transition = 'opacity 0.3s ease';
        
        // Add copy functionality
        copyButton.addEventListener('click', function() {
            if (unsplittedCode) {
                navigator.clipboard.writeText(unsplittedCode.trim()).then(() => {
                    copyButton.innerHTML = '<i class="fas fa-check"></i>';
                    setTimeout(() => {
                        copyButton.innerHTML = '<i class="fa-regular fa-copy"></i>';
                    }, 2000);
                });
            }
        });

        // Set pre to relative positioning for absolute positioning of button
        pre.style.position = 'relative';
        
        // Add button to pre element
        pre.appendChild(copyButton);

        // Show copy button on hover
        pre.addEventListener('mouseenter', () => {
            copyButton.style.opacity = '1';
        });

        pre.addEventListener('mouseleave', () => {
            copyButton.style.opacity = '0';
        });

        const code = pre.querySelector('code');
        if (code) {
            // Store unsplitted code
            unsplittedCode = code.textContent;

            const lines = code.innerHTML.split('\n');
            let numberedLines = '';
            let lineNumber = 1;

            lines.forEach((line, index) => {
                if (line.trim() !== '') {  // Only process non-empty lines
                    if (line.length > 50) {
                        const splitLines = line.match(/.{1,50}/g) || [];
                        splitLines.forEach((splitLine, splitIndex) => {
                            numberedLines += `<span class="line-number">${lineNumber}</span>${splitLine}${splitIndex < splitLines.length - 1 ? '\\\n' : (index < lines.length - 1 ? '\n' : '')}`;
                            lineNumber++;
                        });
                    } else {
                        numberedLines += `<span class="line-number">${lineNumber}</span>${line}${index < lines.length - 1 ? '\n' : ''}`;
                        lineNumber++;
                    }
                }
            });

            code.innerHTML = numberedLines.trim();  // Trim to remove any leading/trailing whitespace
        }
    });
});
