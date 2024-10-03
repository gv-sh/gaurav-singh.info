document.querySelectorAll('p, li').forEach(element => {
    const em = element.querySelector('em');
    
    // Check if the element has text content outside of the <em> tag
    const hasTextNodes = Array.from(element.childNodes).some(node => {
      return node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0;
    });
    
    // Case 1: <em> is the only content
    if (em && !hasTextNodes) {
      em.style.display = 'inline-block';
      em.style.lineHeight = '1.3';
    }
    
    // Case 2: <em> is part of a larger text
    if (em && hasTextNodes) {
      em.style.display = 'inline';
    }
});