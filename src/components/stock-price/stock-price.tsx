import { Component, State, Element, Prop } from "@stencil/core";
import { AV_API_KET } from "../../global/global";

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true,
})
export class StockPrice {
  stockInput: HTMLInputElement;
  initialStockSymbol: string;

  @Element() el: HTMLElement;

  @State() fetchedPrice: number;
  @State() stockUserInput: string;
  @State() stcokInputValid = false;
  @State() error: string;

  @Prop() stockSymbol: string;

  onUserInput(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement ).value;
    if (this.stockUserInput.trim() !== '') {
      this.stcokInputValid = true;
    } else {
      this.stcokInputValid = false;
    }
  }

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    // const stockSymbol = (this.el.shadowRoot .querySelector('#stock-symbol') as HTMLInputElement ).value;
    const stockSymbol = this.stockInput.value;
    // axios
    this.fetchStockPrice(stockSymbol);
  }

  componentWillLoad() {
    console.log('ComonentWillLoad');
    console.log(this.stockSymbol);
  }

  componentDidLoad() {
    console.log('ComonentDidLoad');
    if (this.stockSymbol) {
      this.initialStockSymbol = this.stockSymbol;
      this.stockUserInput = this.stockSymbol;
      this.stcokInputValid = true;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentWillUpdate() {
    console.log('componentWillUpdate');
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    if (this.stockSymbol !== this.initialStockSymbol) {
      this.initialStockSymbol = this.stockSymbol;
      this.fetchStockPrice(this.stockSymbol);
    }
  }

  componentDidUnload() {
    console.log('componentDidUpload');
  }

  fetchStockPrice(stockSymbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KET}`)
      .then(res => {
        if (res.status != 200) {
          throw new Error('Invalid');
        }
        return res.json();
      })
      .then(parsedRes => {
        if(!parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid symbol!');
        }
        this.error = null;
        this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => {
        // console.log(err);
        this.error = err.message;
      });
  }

  render() {
    let dataContent = <p>Please enter a symbol</p>;
    if(this.error) {
      dataContent = <p>{this.error}</p>;
    }
    if(this.fetchedPrice) {
      dataContent = <p>Price: ${this.fetchedPrice}</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => this.stockInput = el} value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
        <button type="submit" disabled={!this.stcokInputValid}>Fetch</button>
      </form>,
      <div>{dataContent}</div>
    ];
  }

}
