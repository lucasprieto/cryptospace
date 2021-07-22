import { useLocation } from 'react-router-dom'

function NotFoundView() {
    let location = useLocation();
    return (
        <h3>
            {'404 - '}
            <code>{location.pathname}</code>`
            {' not found.'}
        </h3>
    )
}

export default NotFoundView