export class Section {
    constructor(renderer, place) {
        this.renderer = renderer;
        this.place = place;
    }

    render(items) {
        items.forEach((item) => this.renderer(item, this.place, true))
    }

    addItem(item) {
        this.renderer(item, this.place)
    }
}
