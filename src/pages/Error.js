import { Link } from "react-router-dom";

const Error = () => {

  return <div className="errorPage">

    <h1> This page doesn't exist!</h1>
    <div className='backButtonContainer'>
      <Link to={`/`} className='backButton'>Go back</Link>
    </div>

  </div>

}

export default Error;