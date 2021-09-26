import logo from './logo.svg';
import HomeNavigation from './components/HomeNavigation';
import Wrapper from './components/Wrapper';
import HomeCard from './components/HomeCard';
import Divider from './components/Divider';
import Dropdown from './components/Dropdown';
import './App.css';

function App() {
  const mainStyle = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };
  return (
    
    <div style={mainStyle} >
      <HomeNavigation />
      <Divider text={"I want to"} />
      <Wrapper>
        <HomeCard position={"left"} text={"Find Help"} />
        <HomeCard position={"right"} text={"Offer Help"} />
      </Wrapper>
      <Divider text={"at"} />
      <Dropdown />
    </div>
  );
}

export default App;
