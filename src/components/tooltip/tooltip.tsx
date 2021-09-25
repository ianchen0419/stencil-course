import { Component, Prop, State } from "@stencil/core";

@Component({
  tag: 'uc-tooltip',
  styleUrl: './tooltip.css',
  shadow: true,
})
export class Tooltip {
  @State() tooltipVisible = false;
  @Prop() text: string;

  onToogleTooltip() {
    this.tooltipVisible = !this.tooltipVisible;
  }

  render() {
    let tooltip = null;
    if(this.tooltipVisible) {
      tooltip = <div id="tooltip-text">{this.text}</div>;
    }
    return [
      <slot></slot>,
      <span id="tooltip-icon" onClick={this.onToogleTooltip.bind(this)}>?</span>,
      tooltip
    ];
  }
}
