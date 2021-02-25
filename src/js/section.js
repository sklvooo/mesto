export class Section {
    constructor(items, renderer, place) {
        this.items = items;
        this.renderer = renderer;
        this.place = place;
    }

    render() {
        this.items.forEach((item) => this.renderer(item, this.place, true))
    }

    addItem(item) {
        this.renderer(item, this.place)
    }
}
