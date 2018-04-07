import MagiHeader from './MagiHeader';
import MagiFooter from './MagiFooter';
import React, { Component } from 'react';
import {
  HashRouter,
  Route,
  Link, NavLink, Switch
} from 'react-router-dom'
import './App.css';
import BookStore from './BookStore';



/* Company component */
function Company() {
  return (
    <div>
      <h2>Company</h2>

    </div>);

}


class AddBook extends Component {

  constructor(props) {
    super(props);
    this.state = { title: "", info: "" }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleTitleChange(evt) {
    this.setState({ title: evt.target.value });
  }

  handleInfoChange(evt) {
    this.setState({ info: evt.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    alert('A Book Was added  : ' + this.state.title + " " + this.state.info);
    var book = { title: this.state.title, info: this.state.info }
    BookStore.addBook(book)
  }

  render() {
    return (
      <div>
        <h2>Add Book</h2>
        <form onSubmit={this.handleSubmit}>
          <table>
            <tr>

              <input type="text" name="title" defaultValue="Title" onChange={this.handleTitleChange} />

            </tr><tr>

              <input type="text" name="info" defaultValue="info" onChange={this.handleInfoChange} />
            </tr>
          </table>
          <input type="submit" value="Submit" onSubmit={this.handleSubmit} />

        </form>


      </div>
    );
  }
}

function Details(props) {
console.log(props)
  let id = props.match.params.id;
  let defualt = "“Book details for selected book will go here”"
  const book = BookStore.findBook(id-1);
  let element = { "Detailed info for the title": book.title, "ID": book.id, "Info": book.info }

  if (props.counter===0) {
    return (
      <div>{defualt}</div>
    )
  }
  else {
    return (
      <form>
      <table>
        
        <tr><td>Detailed info for the title: {book.title}</td></tr>
        <tr><td>ID:   {book.id}</td></tr>
        <tr><td>Info: {book.info}</td></tr>
        <tr><td> <input type="submit" value="Delete" onClick={DeleteBook}{...book}/></td></tr>
        
       </table>
</form>
    )
  }
}
// delete funktionen virker ikke så godt 
function DeleteBook(props){
  BookStore.deleteBook(props)
  alert("you deleted book with id: "+props.id)
  Product

}

//Embarrasing solution only works once
var counter=0;
/* Products component */

const Product = ({ data }) => {

  const bookList = data.map(book => {

    return (

      <ul key={data.id}>
        <li> {book.title}   <Link to={`/product/${book.id}`} >details</Link></li>
      </ul>

    )

  })

  return (
    <div>
      <h2>Products View</h2>

      {bookList}
      <Route path={`/product/:id`} render={(props) => {
        return (<Details {...props} bookStore={data.bookStore} counter={ counter++} />)

      }} />     
      </div>
  );

}



/* Header component */
function Header() {

  return (
    <div>

      <ul className="header">

        <li><NavLink exact activeClassName="active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="active" to="/product">Products</NavLink></li>
        <li><NavLink activeClassName="active" to="/addbook">AddBook</NavLink></li>
        <li><NavLink activeClassName="active" to="/company">Company</NavLink></li>

      </ul></div>
  )

}
function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>);
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      bookList: this.bookStore
    }


  }

  render() {

    var allBooks = this.props.bookStore.books;

    return (

      <div>
        <MagiHeader></MagiHeader>

        <Header />
        <HashRouter>

          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/product" render={(props) => <Product data={allBooks} {...props} />} />
            <Route path="/addbook" render={() => <AddBook />} />
            <Route path="/company" render={() => <Company />} />
            {/* <Route path="/:id" render={() => (<p> Nothing to show yet</p>)} /> */}

          </Switch>
        </HashRouter>
        <MagiFooter></MagiFooter>
      </div>


    );
  }
}

export default App;
// https://github.com/BenedikteEva/ReactRouter2.git