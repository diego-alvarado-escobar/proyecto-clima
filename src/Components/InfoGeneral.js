import React, {Component} from "react";
import moment from 'moment';
import axios from "axios";
import TagManager from 'react-gtm-module'
import iconwind from "../assets/images/icon-wind.png"
import iconhumidity from "../assets/images/humidity.png"
import iconpressure from "../assets/images/icon-pressure.png"

const tagManagerArgs = {
      gtmId: 'GTM-WDHR2ZQ'
    }
TagManager.initialize(tagManagerArgs)


class InfoGeneral extends Component{
    state = {
        infoTotal: [],
        infoPrincipal: [],
        infoClima: [],
        infoViento: [],
        infoSys: []
    }
    
    componentDidMount(){
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=Medellin&lang=sp&units=metric&appid=f0e5a162320155ed3912e1cbaa66d4b2')
        .then((response)=>{
            this.setState({infoTotal: response.data})
            this.setState({infoPrincipal: response.data.main})
            this.setState({infoClima: response.data.weather[0]})
            this.setState({infoViento: response.data.wind})
            this.setState({infoSys: response.data.sys})
            window.dataLayer.push({
                'event': "temperatura_actual",
                'ciudad': "Medellin",
                'temperatura': this.state.infoPrincipal.temp
                });
        })
        .catch((error) => {
            console.log(error);
        })
    }


    render(){
        const {handleSearch} = this.props;
        console.log('==========infogeneral==========================');
        console.log(handleSearch);
        console.log('====================================');
        moment.defineLocale('fakeLocale', {parentLocale:'es-mx'});
        var urlClimaActual = "https://openweathermap.org/img/wn/"+this.state.infoClima.icon+"@2x.png";
        return (
            <div className="forecast-table">
            <div className="container">
                <div className="forecast-container">
                    <div className="today forecast">
                        <div className="forecast-header">
                            <div className="day">{moment().format('dddd')}</div>
                            <div className="date">{moment().format("DD/MMM/YY h:mm:ss a")}</div>
                        </div> 
                        <div className="forecast-content">
                            <div className="location">Medellin</div>
                            <span>{this.state.infoClima.description}</span>	
                            <div className="degree">
                                <div className="num">{this.state.infoPrincipal.temp}<sup>o</sup>C</div>
                            </div>
                            <div className="degree">Máx: {this.state.infoPrincipal.temp_max}<sup>o</sup>C</div>
                            <div className="small"><small>Min: {this.state.infoPrincipal.temp_min}<sup>o</sup>C</small></div>
                        </div>
                    </div>
                    <div className="forecast">
                        <div className="forecast-header">
                            <div className="day">Hoy</div>
                        </div> 
                        <div className="forecast-content">
                            <div className="forecast-icon">
                                <img src={urlClimaActual} alt="" width={90} />
                            </div>
                            <div className="degree">{this.state.infoPrincipal.temp_max}<sup>o</sup>C</div>
                            <div><small>{this.state.infoPrincipal.temp_min}<sup>o</sup>C</small></div>
                        </div>
                    </div>
                    <div className="forecast">
                        <div className="forecast-header">
                            <div className="day">Más Detalles</div>
                        </div> 
                        <div className="forecast-content">
                            <span><img src={iconwind} alt="" style={{'marginRight': '10px'}} />Viento: {this.state.infoViento.speed} Km/h</span>
                            <br /><br />
                            <span><img src={iconhumidity} alt="" width={30} height={18} style={{'marginRight': '10px'}} />Humedad: {this.state.infoPrincipal.humidity} %</span>
                            <br /><br />
                            <span><img src={iconpressure} alt="" style={{'marginRight': '10px'}} />Presión: {this.state.infoPrincipal.pressure} mbar</span>
                            <br /><br />
                            <span><img src="" alt="" style={{'marginRight': '10px'}} />Hora del amanecer: {moment.unix(this.state.infoSys.sunrise).format("h:mm:ss")} a.m</span>
                            <br /><br />
                            <span><img src="" alt="" style={{'marginRight': '10px'}} />Puesta del sol: {moment.unix(this.state.infoSys.sunset).format("h:mm:ss")} p.m</span>
                            
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        );
    }
}

export default InfoGeneral;