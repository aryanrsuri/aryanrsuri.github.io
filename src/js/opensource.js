"use strict";
//@ts-ignore
// let Cite = require('citation-js');
var Table = document.getElementById("rf-tb-tb");
var Input = document.getElementById("rf-input");
function create() {
    store();
    render();
}
function build() {
    var Data = new Cite(Input.value);
    var Object = JSON.parse(Data.format('data'))[0];
    var Id;
    if (Object.author) {
        Id = "" + Object.author[0].family + Object.issued["date-parts"][0];
    }
    else {
        Id = Object.id;
    }
    return [Object, Id];
}
function store() {
    var Items = localStorage.getItem("items");
    var _a = build(), Reference = _a[0], Id = _a[1];
    if (Items) {
        if (!Items.hasOwnProperty(Id)) {
            Items = JSON.parse(Items);
        }
        else {
            return;
        }
    }
    else {
        Items = {};
    }
    Items[Id] = Reference;
    localStorage.setItem("items", JSON.stringify(Items));
}
function render() {
    Table.innerHTML = "";
    var Items = localStorage.getItem("items");
    Items = JSON.parse(Items);
    if (Items) {
        var key = void 0;
        var i = 1;
        for (key in Items) {
            var Data = new Cite(Items[key]);
            var Html = Data.get({
                format: 'string',
                type: 'html',
                style: 'citation-apa'
            });
            var Tr = document.createElement("tr");
            Tr.innerHTML += "<th>" + i + "</th><td>" + Html + "</td>";
            Table === null || Table === void 0 ? void 0 : Table.appendChild(Tr);
            i++;
        }
    }
}
function downloadReference(output) {
    var Storage = localStorage.getItem("items");
    Storage = JSON.parse(Storage);
    if (Storage) {
        var key = void 0;
        var data = void 0;
        var json = void 0;
        var file_data = "";
        for (key in Storage) {
            json = Storage[key];
            data = new Cite(json);
            var out = void 0;
            switch (output) {
                case "ris":
                    out = data.format('ris', {
                        lang: 'en-US'
                    });
                    file_data += "\n\n" + out + " ";
                    break;
                case "bib":
                    out = data.format('bibtex', {
                        lang: 'en-US'
                    });
                    file_data += "\n\n" + out + " ";
                    break;
                case "json":
                    out = data.format('data', {
                        lang: 'en-US'
                    });
                    file_data += "\n\n," + out + " ";
                    break;
                default:
                    out = data.format('bibliography', {
                        template: 'apa'
                    });
                    file_data += "\n" + out + "\n";
            }
        }
        var filename = "exportedreference." + output;
        var file = new Blob([file_data], { type: 'text/plain' });
        if (window.navigator.msSaveOrOpenBlob)
            window.navigator.msSaveOrOpenBlob(file, filename);
        else {
            var tempa_1 = document.createElement("a"), url = URL.createObjectURL(file);
            tempa_1.href = url;
            tempa_1.download = filename;
            document.body.appendChild(tempa_1);
            tempa_1.click();
            setTimeout(function () {
                document.body.removeChild(tempa_1);
            }, 0);
        }
    }
    else {
        return;
    }
}
window.addEventListener("load", render);
