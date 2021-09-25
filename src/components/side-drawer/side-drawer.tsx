import { Component, Method, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})

export class SideDrawer {
  //@State() can listen the change by inside
  @State() showContactInfo = false;

  //@Props() is default immutable, means that can changed by outside but not by inside
  @Prop({ reflectToAttr: true }) title: string; //@Prop() to watch sth
  @Prop({ reflectToAttr: true, mutable: true }) opened: boolean;


  onCloseDrawer() {
    this.opened = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }

  @Method()
  open() {
    this.opened = true;
  }

  render() {
    let mainContent = <slot />;
    if(this.showContactInfo) {


    mainContent = (
      <div id="contact-information">
        <h2>Contact Information</h2>
        <p>You can reach us via phone or email.</p>
        <ul>
          <li>Phone: 4908123412</li>
          <li>E-Mail: <a href="mailto:something@something.com">mailto:something@something.com</a></li>
        </ul>
      </div>
      )
    }
    return [
      <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>×</button>
        </header>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          { mainContent}
        </main>
      </aside>
    ];

  }
}
