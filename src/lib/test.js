const say = function (name) {
    //document.write("<style> body {background-color: blue;}</style><div class=\"container\" id=\"div_cc\">\n" +
    //    "    <h3>Меняющийся фон</h3>\n" +
    //    "    <h4>Кажется, я потихоньку разбираюсь</h4>\n" +
    //    "</div>")
    let d = document.createElement("div");
    let textNode = document.createTextNode("Hello from js!");
    d.style.backgroundColor = "green";
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