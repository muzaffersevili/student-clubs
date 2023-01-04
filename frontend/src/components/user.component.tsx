import React, { Component, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import UserDataService from "../services/user.data.service";
import IUser from "../types/user.type";

import AdminControl from '../services/admin-control';

type Props = { id: string; navigation: any }

type State = {
  currentUser: IUser;
  currentRoles: Array<string>;
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

class User extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSurname = this.onChangeSurname.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePersonalEmail = this.onChangePersonalEmail.bind(this);

    this.getUser = this.getUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.state = {
      currentUser: {
        id: null,
        name: "",
        surname: "",
        phone: "",
        email: "",
        personalEmail: ""
      },
      currentRoles: [],
      message: "",
      adminAccess: false
    };
  }

  async componentDidMount() {// may cause a problem
    const adminAccess = await AdminControl();
    this.setState({ adminAccess });
    if (adminAccess) {
      let id: string;

      id = this.props.id;
      console.log(id);
      if (id) {
        this.getUser(id);
      }
    }
  }
  retrieveRoles(id: string) {
    UserDataService.getRoles(id)
      .then((response: any) => {
        this.setState({
          currentRoles: response
        });
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  getUser(idProp: any) {
    UserDataService.get(idProp.id)
      .then((response: any) => {
        this.setState({
          currentUser: response.data,
        });

        this.retrieveRoles(idProp.id);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  }
  onChangeName(e: ChangeEvent<HTMLInputElement>) {
    const name = e.target.value;

    this.setState(function (prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          name: name,
        },
      };
    });
  }
  onChangeSurname(e: ChangeEvent<HTMLInputElement>) {
    const surname = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        surname: surname,
      },
    }));
  }
  onChangePhone(e: ChangeEvent<HTMLInputElement>) {
    const phone = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        phone: phone,
      },
    }));
  }

  onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
    const email = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        email: email,
      },
    }));
  }
  onChangePersonalEmail(e: ChangeEvent<HTMLInputElement>) {
    const personalEmail = e.target.value;

    this.setState((prevState) => ({
      currentUser: {
        ...prevState.currentUser,
        personalEmail: personalEmail,
      },
    }));
  }
  async updateUser() {
    try {
      await UserDataService.update(
        this.state.currentUser,
        this.state.currentUser.id
      );
      await UserDataService.updateRoles(
        this.state.currentUser.id,
        this.state.currentRoles
      );
      this.setState({
        message: "The user was updated successfully!"
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  deleteUser() {
    if (!this.state.currentRoles.includes("admin")) {
      UserDataService.delete(this.state.currentUser.id)
        .then((response: any) => {
          console.log(response.data);
          this.props.navigation("/users");
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }

  handleCheckboxChange = (event: any) => {
    // Get the role name from the event target's value attribute
    const roleName = event.target.value;

    // Create a new array with the updated roles
    let newRoles = [...this.state.currentRoles];
    if (newRoles.includes(roleName)) {
      // If the role is already in the array, remove it
      newRoles = newRoles.filter(role => role !== roleName);
    } else {
      // Otherwise, add the role to the array
      newRoles.push(roleName);
    }

    // Update the currentUser state with the new user object
    this.setState({ currentRoles: newRoles });
  };

  handleDefaultCheck = (value: string) => {
    if (this.state.currentUser && this.state.currentRoles) {
      return this.state.currentRoles.includes(value);
    }
    return false;
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
      const { currentUser } = this.state;

      return (
        <div>
          {currentUser ? (
            <div className="edit-form">
              <h4>User</h4>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={currentUser.name}
                    onChange={this.onChangeName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="surname">Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    id="surname"
                    value={currentUser.surname}
                    onChange={this.onChangeSurname}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    value={currentUser.phone}
                    onChange={this.onChangePhone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={currentUser.email}
                    onChange={this.onChangeEmail}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="personalEmail">Personal Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="personalEmail"
                    value={currentUser.personalEmail}
                    onChange={this.onChangePersonalEmail}
                  />
                </div>

                <div className="custom-control custom-checkbox ">
                  <label htmlFor="roles">Roles</label>

                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="student"
                    value="student"
                    checked={this.handleDefaultCheck('student')}
                    onChange={this.handleCheckboxChange}
                  />
                  <label className="custom-control-label" htmlFor="student">
                    Student
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="chairperson"
                    value="chairperson"
                    checked={this.handleDefaultCheck('chairperson')}
                    onChange={this.handleCheckboxChange}
                  />
                  <label className="custom-control-label" htmlFor="chairperson">
                    Chairperson
                  </label>
                </div>
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="counselor"
                    value="counselor"
                    checked={this.handleDefaultCheck('counselor')}
                    onChange={this.handleCheckboxChange}
                  />
                  <label className="custom-control-label" htmlFor="counselor">
                    Counselor
                  </label>
                </div>
              </form>

              {!this.state.currentRoles?.includes('admin') && (
                <button
                  className="badge badge-danger mr-2"
                  onClick={this.deleteUser}
                >
                  Delete
                </button>
              )}

              <button
                type="submit"
                className="badge badge-success"
                onClick={this.updateUser}
              >
                Update
              </button>
              <p>{this.state.message}</p>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a User...</p>
            </div>
          )}
        </div>
      );
    }

  }
}

export default withParams(User);