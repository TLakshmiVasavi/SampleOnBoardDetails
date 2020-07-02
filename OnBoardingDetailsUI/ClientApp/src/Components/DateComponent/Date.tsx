import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Date.css";
import { timeStamp } from "console";

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp =
  Date.now() -
  (Date.now() % oneDay) +
  new Date().getTimezoneOffset() * 1000 * 60;
let inputRef = React.createRef<HTMLInputElement>();

interface IState {
  inputValue: Date;
  date: Date;
  year: number;
  month: number;
  selectedDay: number;
  showDatePicker: boolean;
  monthDetails: {
    date: number;
    day: number;
    month: number;
    timestamp: number;
    dayString: string;
  }[];
}

export default class MyDatePicker extends Component<{}, IState> {
  constructor(props: any) {
    super(props);
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth();
    this.state = {
      inputValue: date,
      showDatePicker: false,
      date,
      year,
      month,
      selectedDay: todayTimestamp,
      monthDetails: this.getMonthDetails(year, month),
    };

    this.hideDatePicker = this.hideDatePicker.bind(this);
    this.addBackDrop = this.addBackDrop.bind(this);
    this.showDatePicker = this.showDatePicker.bind(this);
    this.getDayDetails = this.getDayDetails.bind(this);
    this.getNumberOfDays = this.getNumberOfDays.bind(this);
    this.getMonthDetails = this.getMonthDetails.bind(this);
    this.setMonth = this.setMonth.bind(this);
    this.setYear = this.setYear.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.setDateToInput = this.setDateToInput.bind(this);
    this.updateDateFromInput = this.updateDateFromInput.bind(this);
    this.setDate = this.setDate.bind(this);
    this.getDateStringFromTimestamp = this.getDateStringFromTimestamp.bind(
      this
    );
    this.getMonthStr = this.getMonthStr.bind(this);
    this.getDateFromDateString = this.getDateFromDateString.bind(this);
    this.isSelectedDay = this.isSelectedDay.bind(this);
    this.isCurrentDay = this.isCurrentDay.bind(this);
  }

  componentDidMount() {
    window.addEventListener("click", this.addBackDrop);
    this.setDateToInput(this.state.selectedDay);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.addBackDrop);
  }

  addBackDrop(e: any) {
    if (
      this.state.showDatePicker &&
      !ReactDOM.findDOMNode(this)?.contains(e.target)
    ) {
      this.hideDatePicker();
    }
  }

  showDatePicker(showDatePicker = true) {
    this.setState({ showDatePicker: true });
  }

  daysMap = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  monthMap = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  getDayDetails(args: any) {
    let date = args.index - args.firstDay;
    let day = args.index % 7;
    let prevMonth = args.month - 1;
    let prevYear = args.year;
    if (prevMonth < 0) {
      prevMonth = 11;
      prevYear--;
    }
    let prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
    let _date =
      (date < 0 ? prevMonthNumberOfDays + date : date % args.numberOfDays) + 1;
    let month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
    let timestamp = new Date(args.year, args.month, _date).getTime();
    return {
      date: _date,
      day,
      month,
      timestamp,
      dayString: this.daysMap[day],
    };
  }

  getNumberOfDays(year: number, month: number) {
    return 40 - new Date(year, month, 40).getDate();
  }

  getMonthDetails(year: number, month: number) {
    let firstDay = new Date(year, month).getDay();
    let numberOfDays = this.getNumberOfDays(year, month);
    let monthArray = [];
    let rows = 6;
    let currentDay = null;
    let index = 0;
    let cols = 7;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        currentDay = this.getDayDetails({
          index,
          numberOfDays,
          firstDay,
          year,
          month,
        });
        monthArray.push(currentDay);
        index++;
      }
    }
    return monthArray;
  }

  isCurrentDay(day: any) {
    return day.timestamp === todayTimestamp;
  }

  isSelectedDay(day: any) {
    return day.timestamp === this.state.selectedDay;
  }

  getDateFromDateString(dateValue: any) {
    let dateData = dateValue.split("-").map((d: any) => parseInt(d, 10));
    if (dateData.length < 3) return null;

    let year = dateData[0];
    let month = dateData[1];
    let date = dateData[2];
    return { year, month, date };
  }

  getMonthStr(month: number) {
    return this.monthMap[Math.max(Math.min(11, month), 0)] || "Month";
  }

  getDateStringFromTimestamp(timestamp: number) {
    let dateObject = new Date(timestamp);
    let month = dateObject.getMonth() + 1;
    let date = dateObject.getDate();
    return (
      dateObject.getFullYear() +
      "-" +
      (month < 10 ? "0" + month : month) +
      "-" +
      (date < 10 ? "0" + date : date)
    );
  }

  setDate(dateData: any) {
    let selectedDay = new Date(
      dateData.year,
      dateData.month - 1,
      dateData.date
    );
    this.setState({ selectedDay: selectedDay.getTime() });
    this.setState({ inputValue: selectedDay });
  }

  updateDateFromInput() {
    let dateValue = inputRef.current?.value;
    let dateData = this.getDateFromDateString(dateValue);
    if (dateData !== null) {
      this.setDate(dateData);
      this.setState({
        year: dateData.year,
        month: dateData.month - 1,
        monthDetails: this.getMonthDetails(dateData.year, dateData.month - 1),
      });
    }
  }

  setDateToInput(timestamp: number) {
    let dateString = this.getDateStringFromTimestamp(timestamp);

    if (inputRef.current !== null) {
      inputRef.current.value =
        dateString.substring(5, 7) +
        "/" +
        dateString.substring(8, 10) +
        "/" +
        dateString.substring(0, 4);
    }
  }

  onDateClick(day: any) {
    var x = day.month;

    var date = new Date(parseInt(day.timestamp));

    date.setMonth(date.getMonth() + x);

    if (date.getDate() !== day.date) {
      date.setMonth(date.getMonth() - 1);

      date.setDate(parseInt(day.date));
    }

    this.setState({ selectedDay: date.getTime() }, () =>
      this.setDateToInput(date.getTime())
    );
  }

  setYear(offset: number) {
    let year = this.state.year + offset;
    let month = this.state.month;
    this.setState({
      year,
      monthDetails: this.getMonthDetails(year, month),
    });
  }

  setMonth(offset: number) {
    let year = this.state.year;
    let month = this.state.month + offset;
    if (month === -1) {
      month = 11;
      year--;
    } else if (month === 12) {
      month = 0;
      year++;
    }
    this.setState({
      year,
      month,
      monthDetails: this.getMonthDetails(year, month),
    });
  }

  renderCalendar() {
    let days = this.state.monthDetails.map((day: any, index: any) => {
      return (
        <div
          className={
            "c-day-container " +
            (day.month !== 0 ? " disabled" : "") +
            (this.isCurrentDay(day) ? " highlight" : "") +
            (this.isSelectedDay(day) ? " highlight-green" : "")
          }
          key={index}
        >
          <div className="cdc-day">
            <span
              onClick={() => {
                if (day.month !== 0) {
                  this.setMonth(day.month);
                }
                this.onDateClick(day);
              }}
            >
              {day.date}
            </span>
          </div>
        </div>
      );
    });

    return (
      <div className="c-container">
        <div className="cc-head">
          {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
            <div key={i} className="cch-name">
              {d}
            </div>
          ))}
        </div>
        <div className="cc-body">{days}</div>
      </div>
    );
  }

  hideDatePicker() {
    this.setState({ showDatePicker: false });
  }

  render() {
    return (
      <>
        <div className="MyDatePicker">
          <div className="mdp-input" onClick={() => this.showDatePicker(true)}>
            <input
              disabled
              type="text"
              onChange={this.updateDateFromInput}
              ref={inputRef}
            />
          </div>
          {this.state.showDatePicker ? (
            <div className="mdp-container">
              <div className="mdpc-head">
                <div className="mdpch-container">
                  <div className="mdpchc-year">
                    {this.getMonthStr(this.state.month)} {this.state.year}
                  </div>
                </div>
                <div className="mdpch-button">
                  <div
                    className="mdpchb-inner"
                    onClick={() => this.setMonth(-1)}
                  >
                    <span className="mdpchbi-left-arrow"></span>
                  </div>
                </div>

                <div className="mdpch-button">
                  <div
                    className="mdpchb-inner"
                    onClick={() => this.setMonth(1)}
                  >
                    <span className="mdpchbi-right-arrow"></span>
                  </div>
                </div>
              </div>
              <div className="mdpc-body">{this.renderCalendar()}</div>
            </div>
          ) : (
            ""
          )}
        </div>
      </>
    );
  }
}
