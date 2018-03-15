import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear } from '../../ducks/reducer';
import NavBar from '../NavBar/NavBar';
import '../../App.css';


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            daysOfMonth: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
            monthsOfYear: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            userInfo: {
                firstName: this.props.user.firstname,
                lastName: '',
                gender: '',
                hairColor: '',
                eyeColor: '',
                hobby: '',
                birthDay: '',
                birthMonth: '',
                birthYear: ''
            },
            currentDate: 0
        }
        this.updateThatShit = this.updateThatShit.bind(this);
    }


    componentDidMount() {
        if (!this.props.user) {
            this.props.history.push('/');
        };
        var date = new Date().getFullYear();
        this.setState({
            currentDate: date
        });
    }

    //------USER INFO UPDATING METHODS------//
    firstNameChange(firstName) {
        this.props.updateFirstName(firstName)
    }

    lastNameChange(lastName) {
        this.props.updateLastName(lastName);
    }

    genderChange(gender) {
        this.props.updateGender(gender);
    }

    hairColorChange(hairColor) {
        this.props.updateHairColor(hairColor);
    }

    eyeColorChange(eyeColor) {
        this.props.updateEyeColor(eyeColor);
    }

    hobbyChange(hobby) {
        this.props.updateHobby(hobby);
    }

    birthDayChange(birthDay) {
        this.props.updateBirthDay(birthDay);
    }

    birthMonthChange(birthMonth) {
        this.props.updateBirthMonth(birthMonth);
    }

    birthYearChange(birthYear) {
        this.props.updateBirthYear(birthYear);
    }

    updateThatShit(){
        let user = {
            firstName: this.props.firstName,
            lastName: this.props.lastName,
            hairColor: this.props.hairColor,
            eyeColor: this.props.eyeColor,
            gender: this.props.gender,
            hobby: this.props.hobby,
            birthDay: this.props.birthDay,
            birthMonth: this.props.birthMonth,
            birthYear: this.props.birthYear
        }
        axios.patch(`/api/user/patch/${this.props.user.id}`, user).then(res => {
            this.props.history.push('/home');
        })
    }

    render() {
        console.log(this.props.user)

        let dayOptions = this.state.daysOfMonth.map((val, i) => {
            return <option value={val} key={i}>{val}</option>
        })

        let monthOptions = this.state.monthsOfYear.map((val, i) => {
            return <option value={val} key={i} >{val}</option>
        })

        let year = parseInt(this.state.currentDate+1);
        let yearOptions = this.state.daysOfMonth.map((val, i) => {
            year--;

            return <option value={year} key={i}>{year}</option>
        })

        return (
            <div className="Home">
                <NavBar />
                <div className="middleHomeContainer">
                    <div className="topContainer">
                        <div className="profilePageAvatarContainer">
                            <img className="profilePageAvatar" src={this.props.user.profilepic} />
                            <h4 className="profilePageUserName">{`${this.props.user.firstname} ${this.props.user.lastname}`}</h4>
                        </div>
                        <div className="profilePageButtonContainer">
                            <button className="updateButton" onClick={ () => this.updateThatShit()}>Update</button>
                            <Link to="/home"><button className="cancelButton">Cancel</button></Link>
                        </div>
                    </div>
                    <div className="profileBottomContainer">
                        <div>
                            <h4 className="profileInfoTitles">First Name</h4>
                            <input onChange={(e) => this.firstNameChange(e.target.value)}></input>
                            <h4 className="profileInfoTitles">Last Name</h4>
                            <input onChange={(e) => this.lastNameChange(e.target.value)} ></input>
                            <h4 className="profileInfoTitles">Gender</h4>
                            <select onChange={(e) => this.genderChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            <h4 className="profileInfoTitles">Hair Color</h4>
                            <select onChange={(e) => this.hairColorChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value="Blonde">Blonde</option>
                                <option value="Brunette">Brunette</option>
                                <option value="Red">Red</option>
                                <option value="Black">Black</option>
                                <option value="Other">Other</option>
                            </select>
                            <h4 className="profileInfoTitles">Eye Color</h4>
                            <select onChange={(e) => this.eyeColorChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value="Brown">Brown</option>
                                <option value="Blue">Blue</option>
                                <option value="Green">Green</option>
                                <option value="Hazel">Hazel</option>
                                <option value="Grey">Grey</option>
                            </select>
                        </div>
                        <div>
                            <h4 className="profileInfoTitles">Hobby</h4>
                            <select onChange={(e) => this.hobbyChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                <option value="Video Games">Video Games</option>
                                <option value="Weight Lifting">Weight Lifting</option>
                                <option value="Playing Sports">Playing Sports</option>
                                <option value="Sleeping">Sleeping</option>
                                <option value="Eating">Eating</option>
                            </select>
                            <h4 className="profileInfoTitles">Birthday Day</h4>
                            <select onChange={(e) => this.birthDayChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {dayOptions}
                            </select>
                            <h4 className="profileInfoTitles">Birthday Month</h4>
                            <select onChange={(e) => this.birthMonthChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {monthOptions}
                            </select>
                            <h4 className="profileInfoTitles">Birthday Year</h4>
                            <select onChange={(e) => this.birthYearChange(e.target.value)}>
                                <option selected>--SELECT--</option>
                                {yearOptions}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    let { user, firstName, lastName, gender, hairColor, eyeColor, hobby, birthDay, birthMonth, birthYear } = state;
    return {
        user,
        firstName,
        lastName,
        gender,
        hairColor,
        eyeColor,
        hobby,
        birthDay,
        birthMonth,
        birthYear
    }
}
export default connect(mapStateToProps, { getUser, updateFirstName, updateLastName, updateGender, updateHairColor, updateEyeColor, updateHobby, updateBirthDay, updateBirthMonth, updateBirthYear })(Profile);