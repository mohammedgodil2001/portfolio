// TextSplitter class to handle text splitting using SplitType
export class TextSplitter {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      resizeCallback: options.resizeCallback || null,
      splitTypeTypes: options.splitTypeTypes || 'words, chars'
    };
    
    // Split the text
    this.split();
    
    // Handle resize
    if (this.options.resizeCallback) {
      window.addEventListener('resize', () => {
        this.split();
        this.options.resizeCallback();
      });
    }
  }
  
  split() {
    // Use SplitType to split text
    this.splitText = new SplitType(this.element, {
      types: this.options.splitTypeTypes
    });
  }
  
  getChars() {
    return this.splitText.chars;
  }
  
  getWords() {
    return this.splitText.words;
  }
  
  getLines() {
    return this.splitText.lines;
  }
}
