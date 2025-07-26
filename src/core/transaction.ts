class Transaction {
  type: string;
  from: string;
  to: string;
  amount: number;
  messages: string;

  constructor(
    type: string,
    from: any,
    to: any,
    amount: number,
    messages: string
  ) {
    this.type = type;
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.messages = messages;
  }
}

export default Transaction;
