import React, {Component} from "react";
import axios from "axios";
import Select from 'react-select';
import PropTypes from 'prop-types'


class Ciudades extends Component{
    state ={
        ciudades: [],
        selectedOption : 0
    }

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, () =>{
          console.log(`Option selected:`, this.state.selectedOption)
          console.log(`Option selected:`, this.state.selectedOption.name)
          console.log(`Option selected:`, this.state.selectedOption.id)
        }
        );
      };
    componentDidMount(){
        axios.get('https://raw.githubusercontent.com/diego-alvarado-escobar/proyectoclima/main/ciudadescolombia.json')
        .then((response)=>{
            this.setState({ciudades: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        const { selectedOption } = this.state.ciudades;
        const {handleSearch} = this.props;
        const customStyles = {
            option: (provided, state) => ({
              ...provided,
              border: '1px dotted pink',
              color: state.isSelected ? 'red' : 'blue',
              padding: 10,
            }),
            control: css => ({ 
                width:"200px", 
                paddingLeft: '1rem',
                color: 'green  !important' }),
            singleValue: (provided, state) => {
              const opacity = state.isDisabled ? 0.5 : 1;
              const transition = 'opacity 300ms';
          
              return { ...provided, opacity, transition };
            }
          }
        return (
            <div className="ciudades">
                <div className="">
                <Select
                    id="selectCiudades"
                    styles={customStyles}
                    value={selectedOption}
                    menuColor='red'
                    onChange={handleSearch}
                    options={this.state.ciudades}
                />
                </div>
            </div>

        );
    }
}

Ciudades.propTypes = {
    handleSearch: PropTypes.func.isRequired
  }
export default Ciudades;