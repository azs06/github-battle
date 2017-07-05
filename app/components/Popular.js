const React = require("react");
const PropTypes = require("prop-types");
const api = require("../utils/api");
const Loading = require('./Loading');

function SelectLanguage(props) {
  const languages = ["All", "JavaScript", "Java", "Python", "Ruby", "PHP"];
  return (
    <ul className="languages">
      {languages.map(lang => {
        return (
          <li
            style={
              lang === props.selectedLanguage ? { color: "#d0021b" } : null
            }
            onClick={() => props.onSelect(lang)}
            key={lang}
          >
            {lang}
          </li>
        );
      })}
    </ul>
  );
}

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {props.repos.map((repo, index)=> {
        return (
          <Repo 
          repo={repo} 
          index={index} 
          key={repo.name}
          />
        );
      })}
    </ul>
  );
}
function Repo(props){
    return(
  <li className="popular-item">
            <div className="popular-rank">#{props.index + 1}</div>
            <ul className="space-list-items">
              <li>
                <a className="avatar-block" href={props.repo.html_url}>  
                <img
                  className="avatar"
                  src={props.repo.owner.avatar_url}
                  alt={`Avatat for ${props.repo.owner.login}`}
                />
                </a>
              </li>
              <li>
                <a href={props.repo.html_url}>
                  {props.repo.name}
                </a>
              </li>
              <li>@{props.repo.owner.login}</li>
              <li>{props.repo.stargazers_count} stars</li>
            </ul>
          </li>        
    )
}
RepoGrid.PropTypes = {
    repos: PropTypes.array.isRequired
}
Repo.PropTypes = {
    repo: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
}
SelectLanguage.PropTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

class Popular extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: "All",
      repos: null
    };
    this.updateLanguage = this.updateLanguage.bind(this);
  }
  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }
  updateLanguage(lang) {
    this.setState(function() {
      return {
        selectedLanguage: lang,
        repos: null
      };
    });
    api.fetchPopularRepos(lang).then(repos => {
      this.setState(() => {
        return {
          repos: repos
        };
      });
    });
  }
  render() {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selectedLanguage}
          onSelect={this.updateLanguage}
        />
        {!this.state.repos ? 
        <Loading /> : 
        <RepoGrid repos={this.state.repos} />
        }
      </div>
    );
  }
}

module.exports = Popular;
