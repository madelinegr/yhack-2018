import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
      <header id='home'>
      <div className="home-wrapper">
				<div className="row">

          <div className="col-md-10 col-md-offset-1">
            <div className="home-content">
              <h1 className='white-text'>Talk, Connect, and Be Heard</h1>
              <button className='white-btn'>
                  <Link to="/createaccount" style={{textDecoration: 'none', fontSize: '30px', color: '#0f738b'}}>Join the Calmunity Now!</Link>
              </button>
            </div>
          </div>

				</div>
		</div>
    </header>
    );
};

export default Home;
