import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import '../../App.css';


export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            user: []
        }
    }

    componentDidMount() {
        axios.get('/api/auth/authenticated').then(res => {
            console.log(res);
            this.setState({
                user: res.data
            })
        })
    }

    render() {
        return (
            <div className="Home">
                <NavBar />
                <div className="middleHomeContainer">
                    <div className="topTwoContainers">
                        <div className="homeNameAndImageContainer">
                            <div className="homeProfileAvatar">
                                <img className="avatarImage" src={this.state.user.profilepic} />
                            </div>
                            <div className="homeProfileIcons">
                                <h4>{this.state.user.firstname + '' + this.state.user.lastname}</h4>
                                <button className="homeEditProfileButton">Edit Profile</button>
                            </div>
                        </div>
                        <div>
                            <p></p>
                        </div>
                    </div>
                    <div className="homeBottomContainer">
                        <div className="homeTitleAndSelect">
                            <h3 className="recommendedFriends">Recommended Friends</h3>
                            <div className="sortedBy">
                                <h4 >Sorted By</h4>
                                <select className="sortingDropdown">
                                    <option>First Name</option>
                                    <option>Last Name</option>
                                    <option>Gender</option>
                                    <option>Hobby</option>
                                    <option>Hair Color</option>
                                    <option>Eye Color</option>
                                    <option>Birthday</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}