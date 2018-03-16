import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUser, getAllUsers } from '../../ducks/reducer';
import '../../App.css';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendedUsers: []
        }
    }

    componentDidMount() {
        axios.all([axios.get('/api/auth/authenticated'), axios.get('/api/recommended')]).then(res => {
            console.log(res.data)
            this.props.getUser(res[0].data);
            this.props.getAllUsers(res[1].data);
        })
    }




    render() {
        const { getUser } = this.props; //this ONLY WORKS INSIDE THE METHOD
        console.log(this.props.allUsers)

        let userCards = this.props.allUsers.map((val, i) => {
            return <div key={i} className="recommendedFriend">
                <div className="imageAndNameContainer">
                    <img src={val.profilepic} className="recommendedFriendPic" />
                    <div className="nameContainer">
                        <h3 value={val.firstname}className="recommendedFriendName">{val.firstname}</h3>
                        <h3 value={val.lastname} className="recommendedFriendName">{val.lastname}</h3>
                    </div>
                </div>
                <button className="addFriendButton">Add Friend</button>
            </div>
        })

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
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="gender">Gender</option>
                                    <option value="hobby">Hobby</option>
                                    <option value="hairColor">Hair Color</option>
                                    <option value="eyeColor">Eye Color</option>
                                    <option value="birthDay">Birthday</option>
                                </select>
                            </div>
                        </div>
                        <div className="recommendedFriendsContainer">
                            {/* <div className="recommendedFriend">
                                <div className="imageAndNameContainer">
                                    <img className="recommendedFriendPic" />
                                    <div className="nameContainer">
                                        <h3 className="recommendedFriendName">Townes</h3>
                                        <h3 className="recommendedFriendName">Falcon</h3>
                                    </div>
                                </div>
                                <button className="addFriendButton">Add Friend</button>
                            </div> */}
                            {userCards}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state) {
    const { user, allUsers } = state;

    return {
        user,
        allUsers
    }
}
export default connect(mapStateToProps, { getUser, getAllUsers })(Home);