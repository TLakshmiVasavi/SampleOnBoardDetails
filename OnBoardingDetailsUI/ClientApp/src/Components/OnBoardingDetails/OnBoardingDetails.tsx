import React from "react";
import { Model } from "../Models";
import { AppState } from "../Redux/rootReducer";
import { connect } from "react-redux";
import { getOnBoardingDetails } from "../Redux/Actions";
import logo from "./Images/LastLogo.png";
import pic from "./Images/download (3).jpg";
import "./Loading.css";
import { start } from "repl";
import "./OnBoardingDetails.css";

class OnBoardingDetails extends React.Component<IProps, Model.IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      showIndex: -1,
      isSearching: false,
      sortBy: "reqId",
      sortDirection: "DESC",
      searchCondition: "",
      searchRes: [],
      numVisibleItems: 20,
      start: 0,
      end: 20,
      containerStyle: {
        height: 0,
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.resetSearchBox = this.resetSearchBox.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(i: number) {
    this.setState({ showIndex: i });
  }

  closeModal() {
    this.setState({
      showIndex: -1,
    });
  }

  onSort(data: Model.EmpData[], sortKey: string) {
    var x = [];
    x.push(...data);
    if (this.state.sortDirection == "DESC") {
      x.sort((a: any, b: any) => (a[sortKey] < b[sortKey] ? 1 : -1));
    } else {
      x.sort((a: any, b: any) => (a[sortKey] > b[sortKey] ? 1 : -1));
    }
    return x;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (this.props.data !== prevProps.data) {
      var containerStyle = {
        height:
          this.props.data.length == 0
            ? this.props.itemheight + 10
            : (this.props.data.length + 1) * this.props.itemheight,
      };

      this.setState({ ["containerStyle"]: containerStyle });
    }
  }

  handleChange(e: any) {
    let cond = e.target.value;
    this.setState({ searchCondition: e.target.value });
    if (this.props.data !== []) {
      if (e.target.value !== "") {
        var res = this.props.data.filter(
          (y: any) =>
            y.userName.toLowerCase().includes(cond.toLowerCase()) ||
            y.empId.toLowerCase().includes(cond.toLowerCase()) ||
            y.location.toLowerCase().includes(cond.toLowerCase())
        );

        this.setState({ isSearching: true });
        this.setState({ searchRes: res });
        this.setState({ start: 0 });
        this.setState({ end: this.state.numVisibleItems });
        this.setState({
          containerStyle: {
            height:
              (res.length == 0 ? 1 : res.length) * this.props.itemheight + 10,
            // (res.length == 0 ? 2 : res.length + 1) * this.props.itemheight,
          },
        });
      } else {
        this.setState({ isSearching: false });
        this.setState({
          containerStyle: {
            height:
              // (this.props.data.length == 0 ? 2 : this.props.data.length + 1) *
              (this.props.data.length == 0 ? 1 : this.props.data.length) *
                this.props.itemheight +
              10,
          },
        });
      }
    }
  }

  resetSearchBox() {
    this.setState({ isSearching: false });
    this.setState({ searchCondition: "" });
    this.setState({
      containerStyle: {
        height: (this.props.data.length + 1) * this.props.itemheight + 10,
      },
    });
  }

  handleScroll = (e: any) => {
    var length = 0;
    if (this.state.isSearching) {
      length = this.state.searchRes.length;
    } else {
      length = this.props.data.length;
    }
    let currentIndx = e.target.scrollTop / this.props.itemheight;

    currentIndx =
      currentIndx - this.state.numVisibleItems >= length
        ? currentIndx - this.state.numVisibleItems
        : currentIndx;
    if (currentIndx !== this.state.start) {
      this.setState({ start: currentIndx });
      this.setState({
        end:
          currentIndx + this.state.numVisibleItems >= length
            ? length - 1
            : currentIndx + this.state.numVisibleItems,
      });
    }
    let element = e.target;
  };

  setSortBy(val: string) {
    if (this.state.sortBy == val) {
      this.setState({
        sortDirection: this.state.sortDirection == "ASC" ? "DESC" : "ASC",
      });
    } else {
      this.setState({ sortBy: val });
      this.setState({ sortDirection: "DESC" });
    }
  }

  render() {
    var displayData: Model.EmpData[] = this.onSort(
      this.state.isSearching
        ? this.state.searchRes
        : this.props.data == null
        ? []
        : this.props.data,
      this.state.sortBy
    );

    var displayData = displayData.slice(
      Math.trunc(this.state.start),
      Math.trunc(this.state.end) + 1
    );

    return (
      <div>
        <div className="header">
          <div className="flex-center">
            <img src={logo} className="logo" />
          </div>
          <div className="heading">Biz Integrator</div>
          <div className="flex-center">
            <img src={pic} className="pic" />
            <div className="rt-space">UserName</div>
          </div>
        </div>
        <div className="bg-aliceblue">
          <div className="searchBox input-icon">
            <div className="group">
              <input
                placeholder="Search by #, Employee Id,UserName,Location"
                value={this.state.searchCondition}
                type="text"
                className=" input"
                onChange={this.handleChange}
              />
              <span className="CrossIcon" onClick={this.resetSearchBox}>
                {this.state.searchCondition !== "" ? "X" : ""}
              </span>
            </div>
          </div>
        </div>
        <div>
          {this.props.isLoading ? (
            <div className="loader">Loading...</div>
          ) : (
            <div className="flex-center">
              <table>
                <thead>
                  <tr className="fixed">
                    <th
                      // className="reqType"
                      onClick={() => this.setSortBy("reqId")}
                    >
                      Req Id
                    </th>
                    <th
                      // className="reqType"
                      onClick={() => this.setSortBy("reqType")}
                    >
                      Req Type
                    </th>
                    <th onClick={() => this.setSortBy("empId")}>Employee Id</th>
                    <th onClick={() => this.setSortBy("userName")}>UserName</th>
                    <th onClick={() => this.setSortBy("firstName")}>
                      FirstName
                    </th>
                    <th onClick={() => this.setSortBy("lastName")}>LastName</th>
                    <th onClick={() => this.setSortBy("startDate")}>
                      Start Date
                    </th>
                    <th onClick={() => this.setSortBy("dateCreated")}>
                      Date Created
                    </th>
                    <th onClick={() => this.setSortBy("location")}>Location</th>
                    <th className="reqType">Actions</th>
                  </tr>
                </thead>
                <tbody
                  className="itemContainer"
                  style={this.state.containerStyle}
                  onScroll={this.handleScroll}
                >
                  {displayData.length == 0 ? (
                    <tr
                      className="item"
                      style={{ width: "1463px", top: "0px", height: "30px" }}
                    >
                      <td style={{ minWidth: "1463px", height: "30px" }}>
                        No Data Available
                      </td>
                    </tr>
                  ) : (
                    displayData.map((item: any, i: any) => (
                      <tr
                        className="item"
                        style={{
                          top: (i + this.state.start) * this.props.itemheight,
                          height: this.props.itemheight,
                        }}
                      >
                        <td> {item.reqId}</td>
                        <td>{item.reqType}</td>
                        <td> {item.empId}</td>
                        <td>{item.userName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.startDate.split("T")[0]}</td>
                        <td>{item.dateCreated.split("T")[0]}</td>
                        <td>{item.location}</td>
                        <td
                          tabIndex={0}
                          onClick={() => this.openModal(i)}
                          onBlur={this.closeModal}
                          className="cursor reqType"
                        >
                          <i
                            className="ms-Icon ms-Icon--MoreVertical"
                            aria-hidden="true"
                          ></i>
                          {this.state.showIndex == i ? (
                            <div className="action-container">
                              <div className="modal-container">
                                <div className="hightlight">Edit</div>
                                <div className="hightlight">Process</div>
                                <div className="hightlight">Skip</div>
                                <div className="hightlight">View</div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                  <tr
                    className="item hidden"
                    style={{
                      top: this.state.containerStyle.height - 10,
                      height: 0,
                      visibility: "hidden",
                    }}
                  >
                    <td className="hidden">hidden</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  isLoading: state.employee.isLoading,
  data: getOnBoardingDetails(state.employee.isLoading, state.employee.isLoaded),
  itemheight: 30,
  isLoaded: state.employee.isLoaded,
});

type IProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps, {})(OnBoardingDetails);
