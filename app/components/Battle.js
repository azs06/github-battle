var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview(props){
    console.log(props.avatar);
    return(
        <div>
         <div className="column">
             <img
               className="avatar" 
               src={props.avatar}
               alt={'Avatar For' + props.username}           
             />
         </div>
         <h2 className="username">@{props.username}</h2>
         <button
            className="reset"
            onClick={props.onReset.bind(null, props.id)}>
             Reset
            </button>    
        </div>    
    )
}

PlayerPreview.PropTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
}

class PlayerInput extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        var value = event.target.value;
        this.setState(function(){
            return {
                username: value
            }
        });
    }
    handleSubmit(event){
        event.preventDefault();
        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    render(){
        return(
            <div>
               <form className="column" onSubmit={this.handleSubmit}>
                   <label className="header" htmlFor="username">
                       {this.props.label}
                   </label>
                   <input
                     id="username"
                     placeholder="github usernane"
                     type="text"
                     autoComplete="off"
                     value={this.state.username}
                     onChange={this.handleChange}   
                    />
                    <button
                      className="button"
                      type="submit"
                      disabled={!this.state.username}   
                    >
                     Submit   
                    </button>
                </form>    
            </div>    
        )
    }
}

PlayerInput.PropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

class Battle extends React.Component{
    constructor(props){
        super(props);
        
        this.state = {
            playerOneName: '',
            playerOneImage: null,
            playerTwoName: '',
            playerTwoImage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username){
        this.setState(function(){
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'
            return newState;
        });
    }
    handleReset(id){
        this.setState(function(){
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null
            return newState;            
        });

    }
    render(){
        var match = this.props.match;
        var path = match.url + '/results';
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;
        var searchParam = `?playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`;
        return(
        <div>
            <div className="row">
                {!playerOneName 
                && <PlayerInput
                    id='playerOne'
                    label='Player One'
                    onSubmit={this.handleSubmit}
                 />}
                 {playerOneImage !== null &&
                    <PlayerPreview 
                        avatar={playerOneImage}
                        username={playerOneName}
                        onReset={this.handleReset}
                        id='playerOne'
                    />
                 }
                {!playerTwoName &&
                <PlayerInput
                  id='playerTwo'
                  label='Player Two'
                  onSubmit={this.handleSubmit}   
                />}
                  {playerTwoImage !== null &&
                    <PlayerPreview 
                        avatar={playerTwoImage}
                        username={playerTwoName}
                        onReset={this.handleReset}
                        id='playerTwo'
                    />
                 }
            </div>
               {playerOneImage && playerTwoImage &&
                 <Link
                    className="button"
                    to={{
                        pathname: path,
                        search: searchParam
                    }}
                 >
                 Battle
                 </Link>
                 }
        </div>
        )
    }
}

module.exports = Battle;