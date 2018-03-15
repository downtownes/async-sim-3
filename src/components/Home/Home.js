import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser } from '../../ducks/reducer';
import '../../App.css';


class Home extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        axios.get('/api/auth/authenticated').then(res => {
            console.log(res.data)
            this.props.getUser(res.data);
        })
    }




    render() {
        const { getUser } = this.props; //this ONLY WORKS INSIDE THE METHOD
        console.log(this.props.user)
        return (
            <div className="Home">
                <NavBar />
                <div className="middleHomeContainer">
                    <div className="topTwoContainers">
                        <div className="homeNameAndImageContainer">
                            <div className="homeProfileAvatar">
                                <img className="avatarImage" src={this.props.user.profilepic} />
                            </div>
                            <div className="homeProfileIcons">
                                <h4>{this.props.user.firstname + '' + this.props.user.lastname}</h4>
                                <Link to="/profile"><button className="homeEditProfileButton">Edit Profile</button></Link>
                            </div>
                        </div>
                        <div className="welcomeToHelo">
                            <p>Welcome to Helo! Find recommended friends based on your similarities, and even search for them by name. The more you update your profile, the better recommendations we can make!</p>
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
                        <div className="recommendedFriendsContainer">
                            <div className="recommendedFriend">
                                <div className="imageAndNameContainer">
                                    <img className="recommendedFriendPic" />
                                    <div className="nameContainer">
                                        <h3 className="recommendedFriendName">Townes</h3>
                                        <h3 className="recommendedFriendName">Falcon</h3>
                                    </div>
                                </div>
                                <button className="addFriendButton">Add Friend</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user } = state;

    return {
        user
    }
}
export default connect(mapStateToProps, { getUser })(Home);