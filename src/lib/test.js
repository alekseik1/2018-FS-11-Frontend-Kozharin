const say = () => {
    const d = document.createElement('div');
    const textNode = document.createTextNode('Hello from js!');
    d.setAttribute('class', 'myCustomDiv');
    d.appendChild(textNode);
    document.body.appendChild(d);

    d.onclick = () => {
        if (this.style.backgroundColor === 'green') {
            this.style.backgroundColor = 'red';
        } else {
            this.style.backgroundColor = 'green';
        }
    };
};

export default say;
