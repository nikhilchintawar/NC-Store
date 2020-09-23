import React from 'react';

import './userdashboard.styles.scss';
import { isAuthenticated } from '../../auth/helper';
import CustomButton from '../../components/custom-button/CustomButton';
import { withRouter } from 'react-router-dom';


const UserDashboard = ({history}) => {
    const {user: {name, email, phone, gender}} = isAuthenticated()

    return (
        <div className="userDashboard">
            <div className="user-info">
                <div>
                    <div className="userName">
                        Name: {name}
                    </div>
                    <div className="userEmail">
                        Email: {email}
                    </div>
                    <div className="userPhone">
                        Phone No.: {phone}
                    </div>
                    <div className="userPhone">
                        Gender: {gender}
                    </div>
                </div>
                <CustomButton onClick={() => history.push('/user/profile')}>
                    EDIT
                </CustomButton>
            </div>
            <div className="history">
                <h2>History</h2>
            </div>
        </div>
    );
};

export default withRouter(UserDashboard);