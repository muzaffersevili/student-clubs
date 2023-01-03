import React, { Component, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import SclubDataService from "../services/sclub.service";
import ISclubData from "../types/sclub.type";

import AdminControl from '../services/admin-control';

type Props = { id: string; navigation: any }

type State = {
  currentSclub: ISclubData;
  message: string;
  adminAccess: boolean
}


function withParams(Component: any) {
  return (props: any) => {
    const navigation = useNavigate();
    const params = useParams();
    return <Component {...props} id={params} navigation={navigation} />;
  }
}

class Sclub extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getSclub = this.getSclub.bind(this);
    this.updateActive = this.updateActive.bind(this);
    this.updateSclub = this.updateSclub.bind(this);
    this.deleteSclub = this.deleteSclub.bind(this);

    this.state = {
      currentSclub: {
        id: null,
        name: "",
        description: "",
        isActive: false
      },
      message: "",
      adminAccess: false
    };
  }

  async componentDidMount() {// may cause a problem
    const adminAccess = await AdminControl();
    this.setState({adminAccess});
    if(adminAccess){
      let id: string;

      id = this.props.id;
      console.log(id);
      if (id) {
        this.getSclub(id);
      }
    }
  }

  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentSclub: {
          ...prevState.currentSclub,
          name: name,
        },
      };
    });
  }

  onChangeDescription(e: ChangeEvent<HTMLInputElement>) {
    const description = e.target.value;

    this.setState((prevState) => ({
      currentSclub: {
        ...prevState.currentSclub,
        description: description,
      },
    }));
  }

  getSclub(idProp: any) {
    SclubDataService.get(idProp.id)
      .then((response: any) => {
        this.setState({
          currentSclub: response.data,
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateActive(status: boolean) {
    const data: ISclubData = {
      id: this.state.currentSclub.id,
      name: this.state.currentSclub.name,
      description: this.state.currentSclub.description,
      isActive: status,
    };

    SclubDataService.update(data, this.state.currentSclub.id)
      .then((response: any) => {
        this.setState((prevState) => ({
          currentSclub: {
            ...prevState.currentSclub,
            isActive: status,
          },
          message: "The status was updated successfully!"
        }));
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  updateSclub() {
    SclubDataService.update(
      this.state.currentSclub,
      this.state.currentSclub.id
    )
      .then((response: any) => {
        console.log(response.data);
        this.setState({
          message: "The tutorial was updated successfully!",
        });
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  deleteSclub() {
    SclubDataService.delete(this.state.currentSclub.id)
      .then((response: any) => {
        console.log(response.data);
        this.props.navigation("/sclubs");
      })
      .catch((e: Error) => {
        console.log(e);
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
      const { currentSclub } = this.state;

      return (
        <div>
          {currentSclub ? (
            <div className="edit-form">
              <h3><strong>Student Club</strong></h3>
              <form>
                <div className="form-group">
                <h4>
                  <label htmlFor="name">Name</label>
                  </h4>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="name"
                    value={currentSclub.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                <h4>
                  <label htmlFor="description">Description</label>
                  </h4>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="description"
                    value={currentSclub.description}
                    onChange={this.onChangeDescription}
                  />
                </div>

                <div className="form-group">
                  <h4>
                    <strong>Status: </strong>
                  {currentSclub.isActive ? "Active" : "Inactive"}
                  </h4>
                </div>
              </form>

              <h3>
              {currentSclub.isActive ? (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateActive(false)}
                >
                  Inactivate
                </button>
              ) : (
                <button
                  className="badge badge-primary mr-2"
                  onClick={() => this.updateActive(true)}
                >
                  Activate
                </button>
              )}
              </h3>

              <h3>
              <button
                className="badge badge-danger mr-2"
                onClick={this.deleteSclub}
              >
                Delete
              </button>
              </h3>

              <h3>
              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateSclub}
              >
                Update
              </button>
              <p>{this.state.message}</p>
              </h3>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Student Club...</p>
            </div>
          )}
        </div>
      );
    }

  }
}

export default withParams(Sclub);