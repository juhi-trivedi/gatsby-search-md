import React, { Component } from "react"
import { Index } from "elasticlunr"
import { Link } from "gatsby"

// Search component
export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      query: ``,
      results: [],
    }
  }

  render() {
    return (
      <div className="searchbox" style={{ width: "100%", textAlign: "center", padding: "30px 0 0", }}>
        <input type="text" value={this.state.query} onChange={this.search} placeholder="Search blogs" style={{ width: "380px", padding: 10,  fontFamily: 'Oswald' }} />
        <ul style={{width: 404, listStyleType: "none", margin: "0px auto 10px", padding: 0, background: "#653299", color: "#fff", }}>
          {this.state.results.map(page => (
            <li key={page.id}>
              <Link to={"/" + page.slug} style={{ color: "#fff", padding: "10px 15px", display: "inline-block", textDecoration: "none" }}>{page.title}</Link>
              {/* {": " + page.tags.join(`,`)} */}
            </li>
          ))}
        </ul>
      </div>
    )
  }
  getOrCreateIndex = () =>
    this.index
      ? this.index
      : // Create an elastic lunr index and hydrate with graphql query results
        Index.load(this.props.searchIndex)

  search = evt => {
    const query = evt.target.value
    this.index = this.getOrCreateIndex()
    this.setState({
      query,
      // Query the index with search string to get an [] of IDs
      results: this.index
        .search(query, {})
        // Map over each ID and return the full document
        .map(({ ref }) => this.index.documentStore.getDoc(ref)),
    })
  }
}