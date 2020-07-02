import React from "react";
import "./Select.css";
const options = [
  { value: "first", text: "111 - 111" },
  { value: "2", text: "222 - 222" },
  { value: "3", text: "333 - 333" },
  { value: "4", text: "444 - 444" },
  { value: "5", text: "555 - 555" },
  { value: "6", text: "666 - 666" },
  { value: "7", text: "777 - 777" },
  { value: "8", text: "888 - 888" },
];
interface IState {
  selectedValue: string;
  inputValue: string;
  listId: string;
  containerId: string;
  inputId: string;
  active: boolean;
  filterRes: { text: string; value: string }[];
}

interface IProps {
  options: { value: string; text: string }[];
}

class DataList extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedValue: "",
      inputValue: "",
      active: false,
      filterRes: options,
      listId: "datalist-ul",
      containerId: "datalist",
      inputId: "datalist-input",
    };
    this.filter = this.filter.bind(this);
    this.containerListener = this.containerListener.bind(this);
    this.inputListener = this.inputListener.bind(this);
    this.ListListener = this.ListListener.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  filter(filter = "") {
    const filterOptions = options.filter(
      (d) => filter === "" || d.text.includes(filter)
    );

    if (filterOptions.length === 0) {
      this.setState({ active: false });
    } else {
      this.setState({ active: true });
    }
    this.setState({ filterRes: filterOptions });
  }

  containerListener(e: any) {
    this.setState({ active: !this.state.active });
  }

  inputListener(e: any) {
    if (!this.state.active) {
      this.setState({ active: true });
    }
    this.setState({ inputValue: e.target.value });
    this.setState({ selectedValue: e.target.value });
    this.filter(e.target.value);
  }

  ListListener(e: any) {
    if (e.button == 0) {
      this.setState({ inputValue: e.target.innerText });
      this.setState({ selectedValue: e.target.value });
    }
  }

  handleBlur(e: any) {
    var len = options.filter((x) => x.text == this.state.inputValue).length;
    if (len == 0) {
      this.setState({ inputValue: "" });
      this.setState({ selectedValue: "" });
      this.setState({ filterRes: options });
    }
    this.setState({ active: false });
  }

  render() {
    return (
      <div id="datalist" className={this.state.active ? "active" : ""}>
        <input
          id="datalist-input"
          type="text"
          placeholder="Project Type"
          onClick={this.containerListener}
          onChange={this.inputListener}
          value={this.state.inputValue}
          onBlur={this.handleBlur}
        />
        <i className="ms-Icon ms-Icon--ChevronDown icon" aria-hidden="true"></i>
        <ul id="datalist-ul">
          {this.state.filterRes.map((item) => (
            <li
              id={item.value}
              key={item.value}
              onMouseDown={this.ListListener}
              value={item.value}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default DataList;
