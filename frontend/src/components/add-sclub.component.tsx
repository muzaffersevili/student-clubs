import { Component, ChangeEvent } from "react";
import SclubDataService from "../services/sclub.service";
import ISclubData from '../types/sclub.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = ISclubData & {
  submitted: boolean
  adminAccess: boolean
};

export default class AddTutorial extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveSclub = this.saveSclub.bind(this);
    this.newSclub = this.newSclub.bind(this);

    this.state = {
      id: null,
      name: "",
      description: "",
      isActive: true,
      submitted: false,
      adminAccess: false
    };
  }
  async componentDidMount(){
    this.setState({
      adminAccess: await AdminControl()
    });
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    this.setState({
      description: e.target.value
    });
  }

  saveSclub() {
    const data: ISclubData = {
      name: this.state.name,
      description: this.state.description
    };

    SclubDataService.create(data)
      .then((response: any) => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          description: response.data.description,
          isActive: response.data.isActive,
          submitted: true
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  newSclub() {
    this.setState({
      id: null,
      name: "",
      description: "",
      isActive: true,
      submitted: false
    });
  }

  render() {
    if (!this.state.adminAccess) {
      return (
        <div className="container">
          <header className="jumbotron">
            <h3>{"Require Admin Role!"}</h3>
          </header>
        </div>
      );
    }
    else {
      const { submitted, name, description } = this.state;

      return (
        <div className="submit-form">
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newSclub}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  required
                  value={name}
                  onChange={this.onChangeName}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  required
                  value={description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <button onClick={this.saveSclub} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      );
    }
  }

}
