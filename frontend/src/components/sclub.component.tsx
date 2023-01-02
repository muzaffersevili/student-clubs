import { Component, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import SclubDataService from "../services/sclub.service";
import ISclubData from "../types/sclub.type";


type Props = {}

type State = {
  currentSclub: ISclubData;
  message: string;
}

export default class Tutorial extends Component<Props, State> {
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
        isActive: false,
      },
      message: "",
    };
  }

  componentDidMount() {// may cause a problem
    const { id } = useParams();
    if(id){
        this.getSclub(id);
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

  getSclub(id: string) {
    SclubDataService.get(id)
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
        let navigate = useNavigate();
        navigate("/sclubs");
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }

  render() {
    const { currentSclub } = this.state;

    return (
      <div>
        {currentSclub ? (
          <div className="edit-form">
            <h4>Student Club</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentSclub.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentSclub.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {currentSclub.isActive ? "Active" : "Inactive"}
              </div>
            </form>

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

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteSclub}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateSclub}
            >
              Update
            </button>
            <p>{this.state.message}</p>
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