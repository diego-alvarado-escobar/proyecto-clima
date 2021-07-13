import logo from './assets/images/logo.svg';
import './assets/css/style.css';
import './assets/fonts/font-awesome.min.css'
import PropTypes from 'prop-types'

//Importar componente de informacion general
import HeaderApp from './Components/headerApp';
import BannerApp from './Components/bannerApp';
import InfoGeneral from './Components/InfoGeneral';
import LineChart from './Components/LineChart';


function App() {
  return (
    <div className="site-content">
        <HeaderApp />
        <BannerApp  />
        <InfoGeneral handleSearch = {BannerApp.propTypes.handleSearch}/>
        <LineChart />
       </div>
  );
}
BannerApp.propTypes = {
  handleSearch: PropTypes.func.isRequired
}
export default App;
