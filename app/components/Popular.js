var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage(props){
    const languages = ['All','JavaScript','Java','Python','Ruby','PHP'];
    return(
        <ul className="languages">
            {languages.map((lang=>{
                return(
                    <li
                    style={lang === props.selectedLanguage ? {color: '#d0021b'}: null}
                    onClick={()=>props.onSelect(lang)} 
                    key={lang}>
                        {lang}
                    </li>   
                )
            }))}
        </ul>
    )    
}
SelectLanguage.PropTypes = {
    selectedLanguage : PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}
class Popular extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedLanguage: 'All'
        }
        this.updateLanguage = this.updateLanguage.bind(this);
    }
    updateLanguage(lang){
        this.setState(function(){
            return {
                selectedLanguage: lang
            }
        })
    }
    render(){
        return(
         <div>
            <SelectLanguage
            selectedLanguage={this.state.selectedLanguage} 
            onSelect={this.updateLanguage} 
            />        
         </div>   
        )
    }
}

module.exports = Popular;