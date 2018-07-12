'use babel';

export default class CppToolkitView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('cpp-toolkit');


    // Create message element
    /**
    const message = document.createElement('div');
    message.textContent = 'The CppToolkit package is Alive! It\'s ALIVE!';
    message.classList.add('message');
    this.element.appendChild(message);
    */
    form = document.createElement('div');
    label = document.createElement('label');
    label.textContent = 'ClassName';
    form.appendChild( label );
    textField = document.createElement('input');
    form.appendChild( textField );

    btn = document.createElement('button');
    btn.classList.add('btn');
    btn.onclick = (event,element) => {
        console.log("text");
    };
    form.appendChild( btn );
    this.element.appendChild( form );
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

}
