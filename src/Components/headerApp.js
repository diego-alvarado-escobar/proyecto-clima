import React, {Component} from "react";
import logo from '../assets/images/logo.png';

class HeaderApp extends Component{
    render(){
        return (
			<div className="site-header">
				<div className="container">
                    <a className="branding" href="#">
                        <img src={logo} alt="" className="logo" />
                        <div className="logo-type">
                            <h1 className="site-title">Web Analytics Developer</h1>
                            <small className="site-description">Diego Alvarado Escobar</small>
                        </div>
                    </a>

					<div className="main-navigation">
						<button type="button" className="menu-toggle"><i className="fa fa-bars"></i></button>
						<ul className="menu">
							<li className="menu-item current-menu-item"><a href="#">Home</a></li>
							<li className="menu-item"><a href="#">News</a></li>
							<li className="menu-item"><a href="#">Live cameras</a></li>
							<li className="menu-item"><a href="#">Photos</a></li>
							<li className="menu-item"><a href="#">Contact</a></li>
						</ul>
					</div>

					<div className="mobile-navigation"></div>
				</div>
			</div>

        );
    }
}

export default HeaderApp;