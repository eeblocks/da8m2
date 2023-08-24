import {Link} from 'react-router-dom';

function NotFound() {
  return (
    <div className="not-found">
        <Link class="link" to='/'>NOT FOUND</Link>
    </div>
  )
}

export default NotFound;