import { Component } from "@stencil/core";
import { AV_API_KET } from "../../global/global";

@Component({
  tag: 'uc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true,
})
export class StockFinder {

  stockNameInput: HTMLInputElement;

  onFindStocks(event: Event) {
    event.preventDefault();
    const stockName = this.stockNameInput.value;
    fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KET}`)
      .then(res => res.json())
      .then(parsedRes => {
        console.log(parsedRes);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return [
      <form onSubmit={this.onFindStocks.bind(this)}>
        <input id="stock-symbol" ref={el => this.stockNameInput = el} />
        <button type="submit">Find!</button>
      </form>
    ]
  };
}
