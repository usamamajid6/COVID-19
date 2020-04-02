import React from "react";
import axios from "axios";
import "./Home.css";
import NumberFormat from "react-number-format";
import NumberToWord from "number-to-words";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

class Home extends React.Component {
  state = {
    totalCases: 0,
    totalDeaths: 0,
    totalRecovered: 0,
    rows: []
  };
  componentDidMount = async () => {
    let result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/all`,
      headers: {
        "content-type": "application/json"
      }
    });
    this.setState({
      totalCases: result.data.cases,
      totalDeaths: result.data.deaths,
      totalRecovered: result.data.recovered
    });
    result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/countries`,
      headers: {
        "content-type": "application/json"
      }
    });
    this.setState({
      rows: result.data
    });
    console.log(this.state.rows);
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
    // const classes = this.useStyles();
    return (
      <div>
        <div className="mainHead">CORONA VIRUS(COVID-19) STATUS</div>
        <div className="mainFigures" style={{ color: "blue" }}>
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
        <div className="mainFigures" style={{ color: "green" }}>
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
        <TableContainer className="tableStyle" component={Paper}>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Country Name</TableCell>
                <TableCell align="center">Cases</TableCell>
                <TableCell align="center">Today Cases</TableCell>
                <TableCell align="center">Deaths</TableCell>
                <TableCell align="center">Today Deaths</TableCell>
                <TableCell align="center">Recovered</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Critical</TableCell>
                <TableCell align="center">CP1M</TableCell>
                <TableCell align="center">DP1M</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center" component="th" scope="row">
                    {row.country}
                  </TableCell>
                  <TableCell align="center">{row.cases}</TableCell>
                  <TableCell align="center">{row.todayCases}</TableCell>
                  <TableCell align="center">{row.deaths}</TableCell>
                  <TableCell align="center">{row.todayDeaths}</TableCell>
                  <TableCell align="center">{row.recovered}</TableCell>
                  <TableCell align="center">{row.active}</TableCell>
                  <TableCell align="center">{row.critical}</TableCell>
                  <TableCell align="center">
                    {row.casesPerOneMillion}
                  </TableCell>
                  <TableCell align="center">
                    {row.deathsPerOneMillion}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  }
}

export default Home;
