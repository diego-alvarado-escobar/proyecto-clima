import React, {Component} from "react";
import Ciudades from "./ciudades";
import PropTypes from 'prop-types'


class BannerApp extends Component{
	
	handleSearch = (e) =>{
		console.log('====================================');
		console.log(e);
		console.log('====================================');
	}
	
    render(){
        return (
			<div className="hero">
				<div className="container">					
					<form action="#" className="find-location">
						<input type="text" placeholder="Find your location..." />
						<input type="submit" value="Find" />
					</form>
				</div>
			</div>
        );
    }
}
Ciudades.propTypes = {
    handleSearch: PropTypes.func.isRequired
  }

export default BannerApp;