import { useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router-dom'
import { RootState } from '../store'
import { Colors } from '../constants'


const ProtectedRoute = () => {
   const { userToken } = useSelector((state: RootState) => state.auth)

   if (!userToken) {
       return (
           <div className='unauthorized vw-100'>
               <h1>Unauthorized:</h1>
               <p>You need to log in to access this page!</p>
               <span>
                   <NavLink to='/login' style={{ textDecoration: 'none', color: Colors.secondary, fontWeight: 'bold' }}>LOGIN</NavLink>
               </span>
           </div>
       )
   }

   return <Outlet />
}
export default ProtectedRoute