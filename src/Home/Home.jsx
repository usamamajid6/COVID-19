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
import { Map, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
const locateIcon = new L.Icon({
  iconUrl:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=",
  iconSize: [25, 41],
  iconAnchor: [12.5, 41],
  popupAnchor: [0, -41]
});
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
    rows: [],
    tableOrMap: false,
    tableOrMapLoader: true,
    locations: [],
    center: { lat: 21.3891, lng: 39.8579 },
    zoom: 2
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
    // console.log(rows);

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

  displayMarkers = () => {
    // console.log(this.state.locations);
    return this.state.rows.map((row, index) => {
      const position = [row.countryInfo.lat, row.countryInfo.long];
      return (
        <Marker key={index} position={position} icon={locateIcon}>
          <Popup>
            Name:
            {row.country}
            <br />
          </Popup>
          {/* {console.log(row.countryInfo.lat)} */}
        </Marker>
      );
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
      );
    } else {
      const position = [this.state.center.lat, this.state.center.lng];
      return (
        <Map className="map" center={position} zoom={this.state.zoom}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {this.displayMarkers()}
        </Map>
      );
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
        <div className="switch">
          Map{" "}
          <Switch
            checked={this.state.tableOrMap}
            onChange={() => {
              this.setState({ tableOrMapLoader: true });
              this.setState({ tableOrMap: !this.state.tableOrMap });
              this.setState({ tableOrMapLoader: false });
            }}
            color="primary"
            name="checkedB"
            inputProps={{ "aria-label": "primary checkbox" }}
          />{" "}
          Table
        </div>
        <div>
          <Loader
            type="Rings"
            color="#00BFFF"
            className="loader"
            visible={this.state.tableOrMapLoader}
          />
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
