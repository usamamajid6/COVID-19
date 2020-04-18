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
import Switch from "@material-ui/core/Switch";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import geoJSON from "../Assets/geoJSON.json";
import Map from "./Map";

class Home extends React.Component {
  state = {
    totalCases: 0,
    totalDeaths: 0,
    totalRecovered: 0,
    activeCases: 0,
    rows: [],
    tableOrMap: true,
    tableOrMapLoader: true,
    locations: [],
    geoJSON,
  };

  componentDidMount = async () => {
    let result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/v2/all`,
      headers: {
        "content-type": "application/json",
      },
    });
    this.setState({
      totalCases: result.data.cases,
      totalDeaths: result.data.deaths,
      totalRecovered: result.data.recovered,
      activeCases:
        result.data.cases - result.data.deaths - result.data.recovered,
    });
    result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/v2/countries`,
      headers: {
        "content-type": "application/json",
      },
    });

    // const rows = JSON.stringify(result.data);
    const rows = result.data;
    rows.sort((a, b) => {
      return b.cases - a.cases;
    });
    // console.log(rows);

    this.setState({
      rows,
    });

    // rows.sort((a, b) => {
    //   return a.country.localeCompare(b.country);
    // });
    for (let i = 0; i < geoJSON.features.length; i++) {
      const geo = geoJSON.features[i];

      for (let j = 0; j < rows.length; j++) {
        const row = rows[j];
        if (row.countryInfo.iso3 === geo.id) {
        
            geo.properties.cases = row.cases;
            geo.properties.deaths = row.deaths;
            geo.properties.active = row.active;
            geo.properties.recovered = row.recovered;
          
        }
      }
    }
    this.setState({
      geoJSON,
    });
  };

  componentDidUpdate = () => {};

  sortResult = (result) => {
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
      totalRecovered,
    });
  };

  tableOrMap = () => {
    if (this.state.tableOrMap) {
      return (
        <TableContainer className="tableStyle" component={Paper}>
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell align="center">#</TableCell>
                <TableCell align="left">Country Name</TableCell>
                <TableCell align="left">Cases</TableCell>
                <TableCell align="left">Today Cases</TableCell>
                <TableCell align="left">Deaths</TableCell>
                <TableCell align="left">Today Deaths</TableCell>
                <TableCell align="left">Recovered</TableCell>
                <TableCell align="left">Active</TableCell>
                <TableCell align="left">Critical</TableCell>
                <TableCell align="left">CP1M</TableCell>
                <TableCell align="left">DP1M</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell align="center" component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell align="left" component="th" scope="row">
                    <img className="flag" src={row.countryInfo.flag} alt="" />{" "}
                    &nbsp;
                    {row.country}
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.cases}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.todayCases}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.deaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.todayDeaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.recovered}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.active}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.critical}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.casesPerOneMillion}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.deathsPerOneMillion}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={(value) => <div>{value}</div>}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      );
    } else {
      return <Map geoJSON={this.state.geoJSON} />;
    }
  };

  render() {
    // const classes = this.useStyles();
    return (
      <div>
        <div className="mainHead">CORONA VIRUS (COVID-19) STATUS</div>
        <div className="mainFigures" style={{ color: "darkblue" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.totalCases}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={(value) => <div>{value}</div>}
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
              renderText={(value) => <div>{value}</div>}
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
              renderText={(value) => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">RECOVERED</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.totalRecovered)})
          </div>
        </div>
        <div className="mainFigures" style={{ color: "grey" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.activeCases}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={(value) => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">ACTIVE CASES</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.activeCases)})
          </div>
        </div>
        <div className="switch">
          Map{" "}
          <Switch
          
            checked={this.state.tableOrMap}
            onChange={() => {
              this.setState({ tableOrMap: !this.state.tableOrMap });
             
            }}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />{" "}
          Table
        </div>

        <div>
          {/* <LinearProgress variant="buffer" value={completed} valueBuffer={buffer} /> */}
        </div>
        {this.tableOrMap()}
      </div>
    );
  }
}

export default Home;
