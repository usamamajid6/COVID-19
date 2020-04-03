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

const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

const getComparator = (order, orderBy) => {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
};

class Home extends React.Component {
  state = {
    totalCases: 0,
    totalDeaths: 0,
    totalRecovered: 0,
    activeCases: 0,
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
      totalRecovered: result.data.recovered,
      activeCases:
        result.data.cases - result.data.deaths - result.data.recovered
    });
    result = await axios({
      method: "get",
      url: `https://corona.lmao.ninja/countries`,
      headers: {
        "content-type": "application/json"
      }
    });

    // const rows = JSON.stringify(result.data);
    const rows = result.data;
    rows.sort((a, b) => {
      return b.cases - a.cases;
    });
    console.log(rows);

    this.setState({
      rows
    });
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
        <div className="mainFigures" style={{ color: "darkblue" }}>
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
        <div className="mainFigures" style={{ color: "grey" }}>
          <div className="mainFiguresFigure">
            <NumberFormat
              value={this.state.activeCases}
              displayType={"text"}
              thousandSeparator={true}
              thousandsGroupStyle="lakh"
              renderText={value => <div>{value}</div>}
            />
          </div>
          <div className="mainFiguresTitle">ACTIVE CASES</div>
          <div className="mainFiguresInWords">
            ({NumberToWord.toWords(this.state.activeCases)})
          </div>
        </div>
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
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.todayCases}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.deaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.todayDeaths}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.recovered}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.active}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.critical}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.casesPerOneMillion}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
                  </TableCell>
                  <TableCell align="left">
                    <NumberFormat
                      value={row.deathsPerOneMillion}
                      displayType={"text"}
                      thousandSeparator={true}
                      thousandsGroupStyle="lakh"
                      renderText={value => <div>{value}</div>}
                    />
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
