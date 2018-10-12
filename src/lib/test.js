const say = function (name) {
    let d = document.createElement("div");
    let textNode = document.createTextNode("Hello from js!");
    d.setAttribute("class", "myCustomDiv");
    d.appendChild(textNode);
    document.body.appendChild(d);

    d.onclick = function() {
        if (this.style.backgroundColor === 'green') {
            this.style.backgroundColor = 'red';
        } else {
            this.style.backgroundColor = 'green';
        }
    }
};

export default say;