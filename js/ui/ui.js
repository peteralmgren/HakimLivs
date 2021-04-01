export default class UI {
    constructor(appendTo) {
        if(this.constructor === UI) throw new Error("This class is meant to be abstract!");
        //this._container = document.getElementsByTagName(appendTo)[0];
        //console.log(this.container);

        if(appendTo.match("/\./g")) this._container = document.querySelectorAll(appendTo);
        else this._container = document.querySelectorAll(appendTo)[0];
        if(!this._container) throw new Error ("Target container was not found!");

    }

    get container() {
        return this._container;
    }

    set container(value) {
        this._container = value;
    }

    get test() {
        return this._test;
    }

    set test(value) {
        this._test = value;
    }

}