import React from "react";
import axios from "axios";
import "./Home.css";
import NumberFormat from "react-number-format";
import NumberToWord from "number-to-words";

class Home extends React.Component {
  state = {
    totalCases: 0,
    totalDeaths: 0,
    totalRecovered: 0
  };
  componentDidMount = async () => {
    const result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/all`,
      headers: {
        "content-type": "application/json"
      }
    });
    
    this.setState({
        totalCases:result.data.cases,
        totalDeaths:result.data.deaths,
        totalRecovered:result.data.recovered
    })
    // this.sortResult(result.data.data);
  };

  sortResult = result => {
    let totalCases = 0;
    let totalDeaths = 0;
    let totalRecovered = 0;
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      if (!isNaN(element.total_cases)) {
        totalCases += parseInt(element.total_cases);
      }
      if (element.total_death !== "") {
        totalDeaths += parseInt(element.total_death);
      }
      if (element.total_recovered !== "") {
        totalRecovered += parseInt(element.total_recovered);
      }
    }
    console.log(totalCases, totalDeaths, totalRecovered);
    this.setState({
      totalCases,
      totalDeaths,
      totalRecovered
    });
  };
  render() {
    return (
      <div>
        <div className="mainHead">CORONA VIRUS(COVID-19) STATUS</div>
        <div className="mainFigures" style={{ color: "cyan" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.totalCases}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={value => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">CASES</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.totalCases)})
          </div>
        </div>
        <div className="mainFigures" style={{ color: "red" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.totalDeaths}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={value => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">DEATHS</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.totalDeaths)})
          </div>
        </div>
        <div className="mainFigures" style={{ color: "lightgreen" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.totalRecovered}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={value => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">RECOVERED</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.totalRecovered)})
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
