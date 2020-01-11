class ReceiverNotFoundException {
  constructor(id) {
    this.message = `Receiver ${id} not found in receiver_view`;
  }
}
export {
  ReceiverNotFoundException as default,
};
