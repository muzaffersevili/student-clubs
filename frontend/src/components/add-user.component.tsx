import { Component, ChangeEvent } from "react";
import UserDataService from "../services/user.data.service";
import IUser from '../types/user.type';
import AdminControl from '../services/admin-control';

type Props = {};

type State = IUser & {
    submitted: boolean
    adminAccess: boolean
};

export default class AddUser extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeSurname = this.onChangeSurname.bind(this);
        this.onChangePhone = this.onChangePhone.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePersonalEmail = this.onChangePersonalEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.saveUser = this.saveUser.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            id: null,
            name: "",
            surname: "",
            phone: "",
            email: "",
            personalEmail: "",
            password: "",
            roles: [],
            submitted: false,
            adminAccess: false
        };
    }
    async componentDidMount() {
        this.setState({
            adminAccess: await AdminControl()
        });
    }

    onChangeName(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            name: e.target.value
        });
    }
    onChangeSurname(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            surname: e.target.value
        });
    }
    onChangePhone(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            phone: e.target.value
        });
    }
    onChangeEmail(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            email: e.target.value
        });
    }
    onChangePersonalEmail(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            personalEmail: e.target.value
        });
    }
    onChangePassword(e: ChangeEvent<HTMLInputElement>) {
        this.setState({
            password: e.target.value
        });
    }
    handleCheckboxChange = (event: any) => {
        if (this.state.roles) {
            let newArray = [...this.state.roles, event.target.id];
            if (this.state.roles.includes(event.target.id)) {
                newArray = newArray.filter(day => day !== event.target.id);
            }
            this.setState({ roles: newArray });

        }
    };

    handleDefaultCheck = (value: string) => {
        if (this.state && this.state.roles) {
            return this.state.roles.includes(value);
        }
        return false;
    }

    saveUser() {
        const data: IUser = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            personalEmail: this.state.personalEmail,
            phone: this.state.phone,
            password: this.state.password,
            roles: this.state.roles,
        };

        UserDataService.create(data)
            .then((response: any) => {
                this.setState({
                    name: response.state.name,
                    surname: response.state.surname,
                    email: response.state.email,
                    personalEmail: response.state.personalEmail,
                    phone: response.state.phone,
                    password: response.state.password,
                    roles: response.state.roles,
                    submitted: true
                });
                console.log(response.data);
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    newUser() {
        this.setState({
            id: null,
            name: "",
            surname: "",
            phone: "",
            email: "",
            personalEmail: "",
            password: "",
            roles: [],
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
            const { submitted, name, surname, phone, email, personalEmail, password, roles } = this.state;

            return (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success btn-lg" onClick={this.newUser}>
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
                                <label htmlFor="surname">Surname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="surname"
                                    required
                                    value={surname}
                                    onChange={this.onChangeSurname}
                                    name="surname"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="phone"
                                    required
                                    value={phone}
                                    onChange={this.onChangePhone}
                                    name="phone"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="email"
                                    required
                                    value={email}
                                    onChange={this.onChangeEmail}
                                    name="email"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="personalEmail">Personal Email</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="personalEmail"
                                    required
                                    value={personalEmail}
                                    onChange={this.onChangePersonalEmail}
                                    name="personalEmail"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="password"
                                    required
                                    value={password}
                                    onChange={this.onChangePassword}
                                    name="password"
                                />
                            </div>

                            <div className="custom-control custom-checkbox ">
                                <label htmlFor="roles">Roles</label>

                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="student"
                                    value="student"
                                    defaultChecked={this.handleDefaultCheck('student')}
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
                                    defaultChecked={this.handleDefaultCheck('chairperson')}
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
                                    defaultChecked={this.handleDefaultCheck('counselor')}
                                    onChange={this.handleCheckboxChange}
                                />
                                <label className="custom-control-label" htmlFor="counselor">
                                    Counselor
                                </label>
                            </div>


                            <button onClick={this.saveUser} className="btn btn-success btn-lg">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            );
        }
    }

}