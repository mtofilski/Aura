class GiverNotFoundException {
  constructor(id) {
    this.message = `Giver ${id} not found in giver_view`;
  }
}
export {
  GiverNotFoundException as default,
};
